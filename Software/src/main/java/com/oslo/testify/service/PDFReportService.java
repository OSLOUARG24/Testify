package com.oslo.testify.service;

import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.properties.HorizontalAlignment;
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
  private final IterationStatusService iterationStatusService;
  private final CategoryStatusService categoryStatusService;

  public PDFReportService(ProjectService projectService, StageService stageService, IterationService iterationService
  , IterationStatusService iterationStatusService
  , CategoryStatusService categoryStatusService) {
    this.projectService = projectService;
    this.stageService = stageService;
    this.iterationService = iterationService;
    this.iterationStatusService = iterationStatusService;
    this.categoryStatusService = categoryStatusService;
  }

  public byte[] generateProjectReport(Long projectId, boolean includeStatus, boolean includeStageDetail) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter writer = new PdfWriter(outputStream);
    PdfDocument pdfDoc = new PdfDocument(writer);
    Document document = new Document(pdfDoc);

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    // Fuentes
    PdfFont normalFont = PdfFontFactory.createFont("Times-Roman");

    //pdfDoc.addEventHandler(PdfDocumentEvent.START_PAGE, new HeaderFooterEventHandler(headerColor, normalFont));

    Project project = projectService.getProjectById(projectId);

    // Calcular el espacio restante en la página para centrar la tabla
    float pageHeight = pdfDoc.getDefaultPageSize().getHeight();
    float tableHeight = 100; // Aproximar el tamaño de la tabla en píxeles
    float topMargin = (pageHeight - tableHeight) / 2;

    // Agregar espacio superior
    document.setMargins(topMargin, 36, 36, 36); // Márgenes dinámicos: superior, derecho, inferior, izquierdo


    Paragraph title = new Paragraph("Proyecto")
      .setFont(normalFont)
      .setBold()
      .setFontSize(46)
      .setTextAlignment(TextAlignment.LEFT);
    document.add(title);

    title = new Paragraph(project.getName())
      .setFont(normalFont)
      .setFontSize(36)
      .setTextAlignment(TextAlignment.LEFT);
    document.add(title);

    // Obtener las iteraciones del proyecto
    List<Iteration> iterations = iterationService.getIterationsByProjectId(projectId);
    for (Iteration iteration : iterations) {

      // Calcular el espacio restante en la página para centrar la tabla
      pageHeight = pdfDoc.getDefaultPageSize().getHeight();
      topMargin = (pageHeight - tableHeight) / 2;

      // Agregar espacio superior
      document.setMargins(topMargin, 36, 36, 36); // Márgenes dinámicos: superior, derecho, inferior, izquierdo

      document.add(new com.itextpdf.layout.element.AreaBreak());

      // Título de la iteración centrado
      Paragraph iterationTitle = new Paragraph("Iteración:")
        .setFont(normalFont)
        .setBold()
        .setFontSize(46)
        .setTextAlignment(TextAlignment.LEFT);
      document.add(iterationTitle);

      iterationTitle = new Paragraph(iteration.getName())
        .setFont(normalFont)
        .setFontSize(36)
        .setTextAlignment(TextAlignment.LEFT);
      document.add(iterationTitle);

      document.add(new Paragraph("\n"));

      document.add(new Paragraph("Fecha Inicio: " + iteration.getStartDate().format(formatter))
        .setTextAlignment(TextAlignment.LEFT));

      document.add(new Paragraph("\n"));

      document.add(new Paragraph("Fecha Fin: " + iteration.getEndDate().format(formatter))
        .setTextAlignment(TextAlignment.LEFT));

      document.setMargins(36, 36, 36, 36);

      // Incluir gráfico de barras si se especifica
      if (includeStatus) {

        document.add(new com.itextpdf.layout.element.AreaBreak());

        Paragraph iterationStatusTitle = new Paragraph("Estados por Iteración").setBold()
          .setFont(normalFont)
          .setFontSize(30)
          .setTextAlignment(TextAlignment.LEFT);
        document.add(iterationStatusTitle);

        document.add(new Paragraph("\n"));

        List<IterationStatus> iterationStatuses = iterationStatusService.getIterationsByProjectId(projectId);

        Table iterationStatusTable = new Table(4).setHorizontalAlignment(HorizontalAlignment.CENTER);
        iterationStatusTable.addHeaderCell(new Cell().add(new Paragraph("Iteración"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());
        iterationStatusTable.addHeaderCell(new Cell().add(new Paragraph("Pendientes"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());
        iterationStatusTable.addHeaderCell(new Cell().add(new Paragraph("En Error"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());
        iterationStatusTable.addHeaderCell(new Cell().add(new Paragraph("Aprobadas"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());

        for (IterationStatus iterationStatus : iterationStatuses) {
          iterationStatusTable.addCell(new Cell().add(new Paragraph(iterationStatus.getIterationName()))
            .setTextAlignment(TextAlignment.CENTER));
          iterationStatusTable.addCell(new Cell().add(new Paragraph(iterationStatus.getPendingQuantity().toString()))
            .setTextAlignment(TextAlignment.CENTER));
          iterationStatusTable.addCell(new Cell().add(new Paragraph(iterationStatus.getErrorQuantity().toString()))
            .setTextAlignment(TextAlignment.CENTER));
          iterationStatusTable.addCell(new Cell().add(new Paragraph(iterationStatus.getApprovedQuantity().toString()))
            .setTextAlignment(TextAlignment.CENTER));
        }
        document.add(iterationStatusTable);

        document.add(new Paragraph("\n"));

        Paragraph categoryStatusTitle = new Paragraph("Estados por Categoría").setBold()
          .setFont(normalFont)
          .setFontSize(30)
          .setTextAlignment(TextAlignment.LEFT);
        document.add(categoryStatusTitle);

        document.add(new Paragraph("\n"));

        List<CategoryStatus> categoryStatuses = categoryStatusService.getCategoriesByProjectId(projectId);

        Table categoryStatusTable = new Table(4).setHorizontalAlignment(HorizontalAlignment.CENTER);

        categoryStatusTable.addHeaderCell(new Cell().add(new Paragraph("Categoría"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());
        categoryStatusTable.addHeaderCell(new Cell().add(new Paragraph("Pendientes"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());
        categoryStatusTable.addHeaderCell(new Cell().add(new Paragraph("En Error"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());
        categoryStatusTable.addHeaderCell(new Cell().add(new Paragraph("Aprobadas"))
          .setTextAlignment(TextAlignment.CENTER)
          .setBackgroundColor(new DeviceRgb(173, 216, 230))
          .setBold());

        for (CategoryStatus categoryStatus : categoryStatuses) {
          categoryStatusTable.addCell(new Cell().add(new Paragraph(categoryStatus.getCategoryName()))
            .setTextAlignment(TextAlignment.CENTER));
          categoryStatusTable.addCell(new Cell().add(new Paragraph(categoryStatus.getPendingQuantity().toString()))
            .setTextAlignment(TextAlignment.CENTER));
          categoryStatusTable.addCell(new Cell().add(new Paragraph(categoryStatus.getErrorQuantity().toString()))
            .setTextAlignment(TextAlignment.CENTER));
          categoryStatusTable.addCell(new Cell().add(new Paragraph(categoryStatus.getApprovedQuantity().toString()))
            .setTextAlignment(TextAlignment.CENTER));

        }
        document.add(iterationStatusTable);

        //document.add(new Paragraph("\n"));
        document.add(new com.itextpdf.layout.element.AreaBreak());

        JFreeChart barChart = createStatusBarChart(stageService.getAllByIterationId(iteration.getId()));
        ByteArrayOutputStream chartOutputStream = new ByteArrayOutputStream();
        ChartUtils.writeChartAsPNG(chartOutputStream, barChart, 500, 300);
        Image chartImage = new Image(ImageDataFactory.create(chartOutputStream.toByteArray()));
        document.add(new Paragraph("Estado Escenarios").setTextAlignment(TextAlignment.CENTER));
        document.add(chartImage);

        //document.add(new Paragraph("\n"));
      }

      if (includeStageDetail) {
        List<Stage> stages = stageService.getAllByIterationId(iteration.getId());

        for (Stage stage : stages) {

          document.add(new com.itextpdf.layout.element.AreaBreak());
          // Título del escenario
          Paragraph stageTitle = new Paragraph("Escenario de Prueba: " + stage.getName())
            .setFont(normalFont)
            .setBold()
            .setFontSize(18)
            .setTextAlignment(TextAlignment.LEFT);
          document.add(stageTitle);


          // Tabla para los datos del escenario
          Table stageTable = new Table(2); // Dos columnas: etiqueta y valor

            stageTable.addCell(new Cell().add(new Paragraph("Número:"))
              .setTextAlignment(TextAlignment.LEFT)
              .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(String.valueOf(stage.getNumber())))
            .setTextAlignment(TextAlignment.LEFT));

            stageTable.addCell(new Cell().add(new Paragraph("Categoría:"))
              .setTextAlignment(TextAlignment.LEFT)
              .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(stage.getCategory().getName())))
            .setTextAlignment(TextAlignment.LEFT);

            stageTable.addCell(new Cell().add(new Paragraph("Tipo:"))
              .setTextAlignment(TextAlignment.LEFT)
              .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(stage.getType().getName())))
            .setTextAlignment(TextAlignment.LEFT);

          stageTable.addCell(new Cell().add(new Paragraph("Tester:"))
              .setTextAlignment(TextAlignment.LEFT)
              .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(stage.getTester().getName())))
            .setTextAlignment(TextAlignment.LEFT);


          stageTable.addCell(new Cell().add(new Paragraph("Prioridad:"))
              .setTextAlignment(TextAlignment.LEFT)
              .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(stage.getPriority().getDescription());

          stageTable.addCell(new Cell().add(new Paragraph("Tester:"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(stage.getTester().getName())))
            .setTextAlignment(TextAlignment.LEFT);

          stageTable.addCell(new Cell().add(new Paragraph("Fecha Requerida:"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(stage.getDateRequired().format(formatter))))
            .setTextAlignment(TextAlignment.LEFT);

          stageTable.addCell(new Cell().add(new Paragraph("Estado:"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stageTable.addCell(new Cell().add(new Paragraph(stage.getStatus().getDescription())))
            .setTextAlignment(TextAlignment.LEFT);

          document.add(stageTable);

          Paragraph checklistTitle = new Paragraph("\nChecklists:").setBold();
          document.add(checklistTitle);

          Table checklistTable = new Table(2); // Cuatro columnas: Orden, Descripción, Estado, Comentario

          checklistTable.addCell(new Cell().add(new Paragraph("Estado"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          checklistTable.addCell(new Cell().add(new Paragraph("Descripción"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));


          for (CheckList ch : stage.getCheckLists()) {
            String estado = ch.getStatus() != null
              ? (ch.getStatus() ? "Si" : "No")
              : "";
            checklistTable.addCell(estado).setTextAlignment(TextAlignment.CENTER); // Columna Estado
            checklistTable.addCell(ch.getDescription() != null ? ch.getDescription() : "");
          }
          document.add(checklistTable);

          // Detalle de los pasos del escenario
          Paragraph stepsTitle = new Paragraph("\nPasos del Escenario:").setBold();
          document.add(stepsTitle);

          Table stepsTable = new Table(4); // Cuatro columnas: Orden, Descripción, Estado, Comentario

          stepsTable.addCell(new Cell().add(new Paragraph("Orden"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stepsTable.addCell(new Cell().add(new Paragraph("Descripción"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stepsTable.addCell(new Cell().add(new Paragraph("Estado"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          stepsTable.addCell(new Cell().add(new Paragraph("Comentario"))
            .setTextAlignment(TextAlignment.LEFT)
            .setBackgroundColor(new DeviceRgb(173, 216, 230)));

          for (Step step : stage.getSteps()) {
            stepsTable.addCell(step.getOrden() != null ? step.getOrden().toString() : "");
            stepsTable.addCell(step.getDescription() != null ? step.getDescription() : "");
            stepsTable.addCell(step.getStatus() != null ? step.getStatus().getDescription() : "");
            stepsTable.addCell(step.getComment() != null ? step.getComment() : "");
          }
          document.add(stepsTable);

          document.add(new Paragraph("\n")); // Espaciado después de cada escenario

          if (stage.getTestedFrom() != null){
            document.add(new Paragraph().add("Fecha de Inicio de Pruebas: ").setBold()
              .add(new Text(stage.getTestedFrom().format(formatterTime)))
              .setTextAlignment(TextAlignment.LEFT));
          }
          else {
            document.add(new Paragraph("Fecha de Inicio de Pruebas: ").setBold());
          }

          if (stage.getTestedTo() != null) {
            document.add(new Paragraph()
              .add("Fecha de Finalización de Pruebas: ").setBold()
              .add( new Text (stage.getTestedTo().format(formatterTime)))
              .setTextAlignment(TextAlignment.LEFT));
          }
          else {
            document.add(new Paragraph("Fecha de Finalización de Pruebas: ").setBold());
          }

          // Resultados Esperados vs Obtenidos
          document.add(new Paragraph("\nResultados Esperado").setBold());
          document.add(new Paragraph(stage.getExpectedResult()));

          document.add(new Paragraph("\nResultados Obtenido").setBold());
          document.add(new Paragraph(stage.getGotResult()));

          document.add(new Paragraph("\n")); // Espaciado después de cada escenario

        }
      }
    }

    document.close();
    return outputStream.toByteArray();
  }

  public byte[] generateStageReport(Long stageId) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter writer = new PdfWriter(outputStream);
    PdfDocument pdfDoc = new PdfDocument(writer);
    Document document = new Document(pdfDoc);


    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    // Fuentes
    PdfFont normalFont = PdfFontFactory.createFont("Times-Roman");

    Optional<Stage> stageOpt = stageService.getStageById(stageId);

    if (stageOpt.isPresent()) {
      Stage stage = stageOpt.get();

        document.add(new com.itextpdf.layout.element.AreaBreak());
        // Título del escenario
        Paragraph stageTitle = new Paragraph("Escenario de Prueba: " + stage.getName())
          .setFont(normalFont)
          .setBold()
          .setFontSize(18)
          .setTextAlignment(TextAlignment.LEFT);
        document.add(stageTitle);


        // Tabla para los datos del escenario
        Table stageTable = new Table(2); // Dos columnas: etiqueta y valor

        stageTable.addCell(new Cell().add(new Paragraph("Número:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(String.valueOf(stage.getNumber())))
          .setTextAlignment(TextAlignment.LEFT));

        stageTable.addCell(new Cell().add(new Paragraph("Categoría:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(stage.getCategory().getName())))
          .setTextAlignment(TextAlignment.LEFT);

        stageTable.addCell(new Cell().add(new Paragraph("Tipo:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(stage.getType().getName())))
          .setTextAlignment(TextAlignment.LEFT);

        stageTable.addCell(new Cell().add(new Paragraph("Tester:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(stage.getTester().getName())))
          .setTextAlignment(TextAlignment.LEFT);


        stageTable.addCell(new Cell().add(new Paragraph("Prioridad:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(stage.getPriority().getDescription());

        stageTable.addCell(new Cell().add(new Paragraph("Tester:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(stage.getTester().getName())))
          .setTextAlignment(TextAlignment.LEFT);

        stageTable.addCell(new Cell().add(new Paragraph("Fecha Requerida:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(stage.getDateRequired().format(formatter))))
          .setTextAlignment(TextAlignment.LEFT);

        stageTable.addCell(new Cell().add(new Paragraph("Estado:"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stageTable.addCell(new Cell().add(new Paragraph(stage.getStatus().getDescription())))
          .setTextAlignment(TextAlignment.LEFT);

        document.add(stageTable);

        Paragraph checklistTitle = new Paragraph("\nChecklists:").setBold();
        document.add(checklistTitle);

        Table checklistTable = new Table(2); // Cuatro columnas: Orden, Descripción, Estado, Comentario

        checklistTable.addCell(new Cell().add(new Paragraph("Estado"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        checklistTable.addCell(new Cell().add(new Paragraph("Descripción"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));


        for (CheckList ch : stage.getCheckLists()) {
          String estado = ch.getStatus() != null
            ? (ch.getStatus() ? "Si" : "No")
            : "";
          checklistTable.addCell(estado).setTextAlignment(TextAlignment.CENTER); // Columna Estado
          checklistTable.addCell(ch.getDescription() != null ? ch.getDescription() : "");
        }
        document.add(checklistTable);

        // Detalle de los pasos del escenario
        Paragraph stepsTitle = new Paragraph("\nPasos del Escenario:").setBold();
        document.add(stepsTitle);

        Table stepsTable = new Table(4); // Cuatro columnas: Orden, Descripción, Estado, Comentario

        stepsTable.addCell(new Cell().add(new Paragraph("Orden"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stepsTable.addCell(new Cell().add(new Paragraph("Descripción"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stepsTable.addCell(new Cell().add(new Paragraph("Estado"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        stepsTable.addCell(new Cell().add(new Paragraph("Comentario"))
          .setTextAlignment(TextAlignment.LEFT)
          .setBackgroundColor(new DeviceRgb(173, 216, 230)));

        for (Step step : stage.getSteps()) {
          stepsTable.addCell(step.getOrden() != null ? step.getOrden().toString() : "");
          stepsTable.addCell(step.getDescription() != null ? step.getDescription() : "");
          stepsTable.addCell(step.getStatus() != null ? step.getStatus().getDescription() : "");
          stepsTable.addCell(step.getComment() != null ? step.getComment() : "");
        }
        document.add(stepsTable);

        document.add(new Paragraph("\n")); // Espaciado después de cada escenario

        if (stage.getTestedFrom() != null){
          document.add(new Paragraph().add("Fecha de Inicio de Pruebas: ").setBold()
            .add(new Text(stage.getTestedFrom().format(formatterTime)))
            .setTextAlignment(TextAlignment.LEFT));
        }
        else {
          document.add(new Paragraph("Fecha de Inicio de Pruebas: ").setBold());
        }

        if (stage.getTestedTo() != null) {
          document.add(new Paragraph()
            .add("Fecha de Finalización de Pruebas: ").setBold()
            .add( new Text (stage.getTestedTo().format(formatterTime)))
            .setTextAlignment(TextAlignment.LEFT));
        }
        else {
          document.add(new Paragraph("Fecha de Finalización de Pruebas: ").setBold());
        }

        // Resultados Esperados vs Obtenidos
        document.add(new Paragraph("\nResultados Esperado").setBold());
        document.add(new Paragraph(stage.getExpectedResult()));

        document.add(new Paragraph("\nResultados Obtenido").setBold());
        document.add(new Paragraph(stage.getGotResult()));

        document.add(new Paragraph("\n")); // Espaciado después de cada escenario

      }

    document.close();
    return outputStream.toByteArray();
  }

  private JFreeChart createStatusBarChart(List<Stage> stages) {
    DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    stages.stream()
      .collect(Collectors.groupingBy(Stage::getStatus, Collectors.counting()))
      .forEach((status, count) -> dataset.addValue(count, "Escenarios", status.toString()));

     return ChartFactory.createBarChart(
      "Distribución Estados por Escenario",
      "Estado",
      "Cantidad",
      dataset
    );
  }

  class HeaderFooterEventHandler implements IEventHandler {
    private final DeviceRgb headerColor;
    private final PdfFont font;

    public HeaderFooterEventHandler(DeviceRgb headerColor, PdfFont font) {
      this.headerColor = headerColor;
      this.font = font;
    }

    @Override
    public void handleEvent(Event event) {
      PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
      PdfCanvas canvas = new PdfCanvas(docEvent.getPage());
      Rectangle pageSize = docEvent.getPage().getPageSize();

      DeviceRgb headerColor = new DeviceRgb(255, 102, 0); // Naranja
      //DeviceRgb tableHeaderColor = new DeviceRgb(255, 204, 153); // Naranja claro
      //SolidBorder tableBorder = new SolidBorder(1); // Borde sólido de 1px

      // Encabezado
      canvas.setFillColor(headerColor);
      canvas.rectangle(pageSize.getLeft(), pageSize.getTop() - 30, pageSize.getWidth(), 30);
      canvas.fill();

      canvas.beginText()
        .setFontAndSize(font, 12)
        .moveText(pageSize.getLeft() + 30, pageSize.getTop() - 20)
        .showText("Encabezado del Informe")
        .endText();

      // Pie de página
      canvas.beginText()
        .setFontAndSize(font, 10)
        .moveText(pageSize.getRight() - 50, pageSize.getBottom() + 20)
        .showText("Página " + docEvent.getDocument().getNumberOfPages())
        .endText();

      canvas.release();
    }
  }
}
