package com.oslo.testify.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Image;
import com.itextpdf.io.image.ImageDataFactory;
import com.oslo.testify.entity.Project;
import com.oslo.testify.entity.Stage;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.ChartUtils;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PDFReportService {

  private final ProjectService projectService;
  private final StageService stageService;

  public PDFReportService(ProjectService projectService, StageService stageService) {
    this.projectService = projectService;
    this.stageService = stageService;
  }

  public byte[] generateProjectReport(Long projectId, boolean includeStatus, boolean includeStageDetail) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter writer = new PdfWriter(outputStream);
    PdfDocument pdfDoc = new PdfDocument(writer);
    Document document = new Document(pdfDoc);

    Project project = projectService.getProjectById(projectId);

    // Título del informe
    document.add(new Paragraph("Project Report: " + project.getName()));

    // Información básica del proyecto
    Table table = new Table(2);
    table.addCell("ID");
    table.addCell(String.valueOf(project.getId()));
    table.addCell("Name");
    table.addCell(project.getName());
    table.addCell("Status");
    table.addCell(String.valueOf(project.getStatus()));
    document.add(table);

    // Incluir detalles de stages si se especifica
    if (includeStageDetail) {
      List<Stage> stages = stageService.getStagesByProjectId(projectId);
      document.add(new Paragraph("\nStage Details"));
      Table stageTable = new Table(3);
      stageTable.addCell("Stage ID");
      stageTable.addCell("Stage Name");
      stageTable.addCell("Status");

      for (Stage stage : stages) {
        stageTable.addCell(String.valueOf(stage.getId()));
        stageTable.addCell(stage.getName());
        stageTable.addCell(String.valueOf(stage.getStatus()));
      }
      document.add(stageTable);
    }

    // Incluir gráfico de barras de estado de los stages si se especifica
    if (includeStatus) {
      JFreeChart barChart = createStatusBarChart(stageService.getStagesByProjectId(projectId));
      ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
      ChartUtils.writeChartAsPNG(chartOutputStream, barChart, 500, 300);
      Image chartImage = new Image(ImageDataFactory.create(chartOutputStream.toByteArray()));
      document.add(new Paragraph("\nStage Status Summary"));
      document.add(chartImage);
    }

    document.close();
    return outputStream.toByteArray();
  }

  private JFreeChart createStatusBarChart(List<Stage> stages) {
    DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    stages.stream()
      .collect(Collectors.groupingBy(Stage::getStatus, Collectors.counting()))
      .forEach((status, count) -> dataset.addValue(count, "Stages", status.toString()));

    return ChartFactory.createBarChart(
      "Stage Status Distribution",
      "Status",
      "Count",
      dataset
    );
  }
}
