package com.oslo.testify.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Image;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.properties.TextAlignment;
import com.oslo.testify.entity.*;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.ChartUtils;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PDFReportService {

  private final ProjectService projectService;
  private final StageService stageService;
  private final IterationService iterationService;

  public PDFReportService(ProjectService projectService, StageService stageService, IterationService iterationService) {
    this.projectService = projectService;
    this.stageService = stageService;
  this.iterationService = iterationService;
  }

  public byte[] generateProjectReport(Long projectId, boolean includeStatus, boolean includeStageDetail) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter writer = new PdfWriter(outputStream);
    PdfDocument pdfDoc = new PdfDocument(writer);
    Document document = new Document(pdfDoc);

    Project project = projectService.getProjectById(projectId);

    Paragraph projectTitle = new Paragraph("Project Report: " + project.getName())
      .setBold()
      .setFontSize(20)
      .setTextAlignment(TextAlignment.CENTER);
    document.add(projectTitle);

    // Información básica del proyecto
    Table table = new Table(2);
    table.addCell("ID");
    table.addCell(String.valueOf(project.getId()));
    table.addCell("Name");
    table.addCell(project.getName());
    table.addCell("Status");
    table.addCell(String.valueOf(project.getStatus()));
    document.add(table);

    document.add(new Paragraph("\n"));
    document.add(new com.itextpdf.layout.element.AreaBreak());

    // Obtener las iteraciones del proyecto
    List<Iteration> iterations = iterationService.getIterationsByProjectId(projectId);
    for (Iteration iteration : iterations) {
      // Título de la Iteración en una Nueva Página
      Paragraph iterationTitle = new Paragraph("Iteration: " + iteration.getName())
        .setBold()
        .setFontSize(16)
        .setTextAlignment(TextAlignment.CENTER);
      document.add(iterationTitle);

      document.add(new com.itextpdf.layout.element.AreaBreak());


      // Incluir detalles de stages si se especifica..
      if (includeStageDetail) {
        List<Stage> stages = stageService.getStagesByProjectId(projectId);

        for (Stage stage : stages) {
          // Título del Escenario
          Paragraph stageTitle = new Paragraph("Scenario: " + stage.getName())
            .setBold()
            .setFontSize(14)
            .setTextAlignment(TextAlignment.LEFT);
          document.add(stageTitle);

          // Tabla con los detalles del escenario en formato de caso de uso
          Table stageDetailTable = new Table(2);
          stageDetailTable.addCell("Prioridad");
          stageDetailTable.addCell(stage.getPriority() != null ? stage.getPriority().toString() : "N/A");

          stageDetailTable.addCell("Fecha Requerida");
          stageDetailTable.addCell(stage.getDateRequired() != null ? stage.getDateRequired().toString() : "N/A");

          stageDetailTable.addCell("Fecha de Inicio de Pruebas");
          stageDetailTable.addCell(stage.getTestedFrom() != null ? stage.getTestedFrom().toString() : "N/A");

          stageDetailTable.addCell("Fecha de Finalización de Pruebas");
          stageDetailTable.addCell(stage.getTestedTo() != null ? stage.getTestedTo().toString() : "N/A");

          stageDetailTable.addCell("Estado");
          stageDetailTable.addCell(stage.getStatus() != null ? stage.getStatus().toString() : "N/A");

          document.add(stageDetailTable);

          // Resultados Esperados vs Obtenidos
          document.add(new Paragraph("\nResultados del Escenario").setBold().setFontSize(12));
          Table resultTable = new Table(2);
          resultTable.addCell("Resultado Esperado");
          resultTable.addCell(stage.getExpectedResult());
          resultTable.addCell("Resultado Obtenido");
          resultTable.addCell(stage.getGotResult());
          document.add(resultTable);

          // Salto de página después de cada escenario
          document.add(new com.itextpdf.layout.element.AreaBreak());
        }
      }
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

  public byte[] generateStageReport(Long stageId) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter writer = new PdfWriter(outputStream);
    PdfDocument pdfDoc = new PdfDocument(writer);
    Document document = new Document(pdfDoc);

    Optional<Stage> stageOpt = stageService.getStageById(stageId);

    if (stageOpt.isPresent()) {
      Stage stage = stageOpt.get();

      // Encabezado del informe
      document.add(new Paragraph("Escenario: " + stage.getName()).setBold().setFontSize(14));
      document.add(new Paragraph("Nro Escenario: " + stage.getNumber().toString()).setBold().setFontSize(14));

      document.add(new Paragraph("Iteracion: " + stage.getIteration().getName()));
      document.add(new Paragraph("Categoria: " + stage.getCategory().getName()));
      document.add(new Paragraph("Tipo: " + stage.getType().getName()));
      document.add(new Paragraph("Subtipo: " + stage.getSubType().getName()));
      document.add(new Paragraph("Tester: " + stage.getTester().getName()));

      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
      String formattedDateRequired = stage.getDateRequired().format(formatter);
      String formattedDateStart = stage.getTestedFrom().format(formatter);
      String formattedDateEnd = stage.getTestedTo().format(formatter);

      document.add(new Paragraph("Prioridad: " + stage.getPriority()));
      document.add(new Paragraph("Fecha Requerida: " + formattedDateRequired));
      document.add(new Paragraph("Fecha de Inicio de Pruebas: " + formattedDateStart));
      document.add(new Paragraph("Fecha de Finalización de Pruebas: " + formattedDateEnd));
      document.add(new Paragraph("Estado: " + stage.getStatus()));

      // Resultados Esperados vs Obtenidos
      document.add(new Paragraph("\nResultados del Escenario").setBold().setFontSize(12));
      Table resultTable = new Table(2);
      resultTable.addCell("Resultado Esperado");
      resultTable.addCell(stage.getExpectedResult());
      resultTable.addCell("Resultado Obtenido");
      resultTable.addCell(stage.getGotResult());
      document.add(resultTable);

      // Tabla de Pasos
      document.add(new Paragraph("\nDetalles de Pasos").setBold().setFontSize(12));
      Table stepsTable = new Table(4);
      stepsTable.addCell("Orden");
      stepsTable.addCell("Descripción");
      stepsTable.addCell("Comentario");
      stepsTable.addCell("Estado");

      for (Step step : stage.getSteps()) {
        // Verificar si el orden no es nulo antes de llamarlo
        stepsTable.addCell(step.getOrden() != null ? step.getOrden().toString() : "");
        stepsTable.addCell(step.getDescription() != null ? step.getDescription() : "N/A");
        stepsTable.addCell(step.getComment() != null ? step.getComment() : "N/A");
        stepsTable.addCell(step.getStatus() != null ? step.getStatus().toString() : "N/A");
      }
      document.add(stepsTable);

      // Tabla de Checklist
      document.add(new Paragraph("\nDetalles del Checklist").setBold().setFontSize(12));
      Table checklistTable = new Table(3);
      checklistTable.addCell("Orden");
      checklistTable.addCell("Descripción");
      checklistTable.addCell("Estado");

      for (CheckList check : stage.getCheckLists()) {
        checklistTable.addCell(check.getOrden() != null ? check.getOrden().toString() : "");

        checklistTable.addCell(check.getDescription());
        checklistTable.addCell(check.getStatus() ? "Completado" : "Pendiente");
      }
      document.add(checklistTable);

      // Gráfico del Estado de los Pasos y Checklist
      /*document.add(new Paragraph("\nGráficos de Estado").setBold().setFontSize(12));

      // Crear gráfico de barras para los estados de los pasos
      DefaultCategoryDataset stepsDataset = new DefaultCategoryDataset();
      stage.getSteps().forEach(step ->
        stepsDataset.addValue(1, step.getStatus().toString(), "Pasos")
      );

      JFreeChart stepsChart = ChartFactory.createBarChart("Estado de los Pasos", "Estado", "Cantidad", stepsDataset);
      ByteArrayOutputStream stepsChartOutput = new ByteArrayOutputStream();
      ChartUtils.writeChartAsPNG(stepsChartOutput, stepsChart, 500, 300);
      Image stepsChartImage = new Image(ImageDataFactory.create(stepsChartOutput.toByteArray()));
      document.add(stepsChartImage);

      // Crear gráfico de barras para el estado del checklist
      DefaultCategoryDataset checklistDataset = new DefaultCategoryDataset();
      stage.getCheckLists().forEach(check ->
        checklistDataset.addValue(1, check.getStatus() ? "Completado" : "Pendiente", "Checklist")
      );

      JFreeChart checklistChart = ChartFactory.createBarChart("Estado del Checklist", "Estado", "Cantidad", checklistDataset);
      ByteArrayOutputStream checklistChartOutput = new ByteArrayOutputStream();
      ChartUtils.writeChartAsPNG(checklistChartOutput, checklistChart, 500, 300);
      Image checklistChartImage = new Image(ImageDataFactory.create(checklistChartOutput.toByteArray()));
      document.add(checklistChartImage);*/
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
