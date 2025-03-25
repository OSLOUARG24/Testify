package com.oslo.testify.service;

import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.kernel.font.PdfFontFactory.EmbeddingStrategy;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.VerticalAlignment;
import com.oslo.testify.entity.*;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.ChartUtils;
import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.stereotype.Service;

import java.io.InputStream;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class PDFReportService {

  private final ProjectService projectService;
  private final StageService stageService;
  private final IterationService iterationService;
  private final IterationStatusService iterationStatusService;
  private final CategoryStatusService categoryStatusService;
  private final UserService userService;

  public PDFReportService(ProjectService projectService, StageService stageService, IterationService iterationService
  , IterationStatusService iterationStatusService
  , CategoryStatusService categoryStatusService
  , UserService userService) {
    this.projectService = projectService;
    this.stageService = stageService;
    this.iterationService = iterationService;
    this.iterationStatusService = iterationStatusService;
    this.categoryStatusService = categoryStatusService;
    this.userService = userService;
  }

  public byte[] generateProjectReport(Long projectId, boolean includeStatus, boolean includeStageDetail) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter writer = new PdfWriter(outputStream);
    PdfDocument pdfDoc = new PdfDocument(writer);
    Document document = new Document(pdfDoc);

    float topMargin = 90; // Margen superior más grande para el encabezado
    float rightMargin = 36;
    float bottomMargin = 36;
    float leftMargin = 36;

    document.setMargins(topMargin, rightMargin, bottomMargin, leftMargin);

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    DateTimeFormatter formatterVersion = DateTimeFormatter.ofPattern("yyyy.MM.dd.HHmmss");

    // Fuentes
    InputStream fontStream = getClass().getResourceAsStream("/fonts/arial.ttf");

    if (fontStream == null) {
      throw new IOException("No se pudo encontrar la fuente Arial.ttf en /fonts/");
    }
    FontProgram fontProgram = FontProgramFactory.createFont(fontStream.readAllBytes());

    PdfFont normalFont = PdfFontFactory.createFont(fontProgram,PdfEncodings.IDENTITY_H, EmbeddingStrategy.FORCE_EMBEDDED);
    //PdfFont normalFont = PdfFontFactory.createFont("Courier");

    InputStream imageStream = getClass().getClassLoader().getResourceAsStream("logo_unpa.png");
    if (imageStream == null) {
      throw new IllegalArgumentException("Archivo no encontrado: logo_unpa.png");
    }
    ImageData imageData = ImageDataFactory.create(imageStream.readAllBytes());
    Image image1 = new Image(imageData);
    image1.scaleToFit(200, 100); // Escala la imagen para que quepa en un área de 200x100 puntos

    

    imageStream = getClass().getClassLoader().getResourceAsStream("logo.png");
    if (imageStream == null) {
      throw new IllegalArgumentException("Archivo no encontrado: logo.png");
    }
    imageData = ImageDataFactory.create(imageStream.readAllBytes());
    Image image2 = new Image(imageData);
    image2.scaleToFit(200, 100); // Escala la imagen para que quepa en un área de 200x100 puntos

    Project project = projectService.getProjectById(projectId);

    pdfDoc.addEventHandler(PdfDocumentEvent.START_PAGE, new HeaderFooterEventHandler(normalFont, image1, image2,project.getName()));

    Paragraph title = new Paragraph("DOCUMENTACIÓN DE ESCENARIOS DE PRUEBAS")
      .setFont(normalFont)
      .setFontSize(46)
      .setTextAlignment(TextAlignment.LEFT);
    document.add(title);

    document.add(new Paragraph("\n"));
    document.add(new Paragraph("\n"));

    title = new Paragraph("Proyecto: " + project.getName())
      .setFont(normalFont)
      .setFontSize(36)
      .setTextAlignment(TextAlignment.LEFT);
    document.add(title);

    LocalDateTime lt = LocalDateTime.now();

    document.add(new Paragraph("\n"));
    document.add(new Paragraph("\n"));
    document.add(new Paragraph("\n"));

    //Integrantes
    List<User> integrantes = userService.getUsersByProjectId(projectId);

    document.add(new Paragraph("Integrantes: ")
      .setFont(normalFont)
      .setFontSize(18)
      .setBold()
      .setTextAlignment(TextAlignment.LEFT));

    document.add(new Paragraph("\n"));

    for (User user : integrantes) {

      document.add(new Paragraph("*  " + user.getName())
        .setTextAlignment(TextAlignment.LEFT));

    }

    document.add(new Paragraph("\n"));

    //Datos de la version
    document.add(new Paragraph("Versión Documento: " + lt.format(formatterVersion))
      .setTextAlignment(TextAlignment.LEFT));

    document.add(new Paragraph("Fecha Documento: " + lt.format(formatter))
      .setTextAlignment(TextAlignment.LEFT));

    Table table = new Table(2);

    table.addCell(new Cell().add(image1).setBorder(Border.NO_BORDER));
    table.addCell(new Cell().add(image2).setBorder(Border.NO_BORDER));

    document.add(table);

    document.add(new com.itextpdf.layout.element.AreaBreak());

    //document.add(new Paragraph("Impreso con Testify")
      //.setTextAlignment(TextAlignment.LEFT));

    // Obtener las iteraciones del proyecto
    List<Iteration> iterations = iterationService.getIterationsByProjectId(projectId);
    for (Iteration iteration : iterations) {


      // Título de la iteración centrado
      Paragraph iterationTitle = new Paragraph("Iteración")
        .setFont(normalFont)
        //.setBold()
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
        .setFont(normalFont)
        .setFontSize(14)
        .setTextAlignment(TextAlignment.LEFT));


      document.add(new Paragraph("Fecha Fin: " + iteration.getEndDate().format(formatter))
        .setFont(normalFont)
        .setFontSize(14)
        .setTextAlignment(TextAlignment.LEFT));

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

          document.add(new Paragraph("\n"));

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
              ? (ch.getStatus() ? "V" : "X")
              : "";
            checklistTable.addCell(estado).setTextAlignment(TextAlignment.CENTER); // Columna Estado
            checklistTable.addCell(ch.getDescription() != null ? ch.getDescription() : "").setTextAlignment(TextAlignment.LEFT);
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
  if (stage.getGotResult() != null) {
    document.add(new Paragraph(stage.getGotResult()));
  }

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
    DateTimeFormatter formatterVersion = DateTimeFormatter.ofPattern("yyyy.MM.dd.HHmmss");

    // Fuentes
    InputStream fontStream = getClass().getResourceAsStream("/fonts/arial.ttf");

    if (fontStream == null) {
      throw new IOException("No se pudo encontrar la fuente Arial.ttf en /fonts/");
    }
    FontProgram fontProgram = FontProgramFactory.createFont(fontStream.readAllBytes());

    PdfFont normalFont = PdfFontFactory.createFont(fontProgram,PdfEncodings.IDENTITY_H, EmbeddingStrategy.FORCE_EMBEDDED);
    //PdfFont normalFont = PdfFontFactory.createFont("Courier");

    InputStream imageStream = getClass().getClassLoader().getResourceAsStream("logo_unpa.png");
    if (imageStream == null) {
      throw new IllegalArgumentException("Archivo no encontrado: logo_unpa.png");
    }
    ImageData imageData = ImageDataFactory.create(imageStream.readAllBytes());
    Image image1 = new Image(imageData);
    image1.scaleToFit(200, 100); // Escala la imagen para que quepa en un área de 200x100 puntos

    

    imageStream = getClass().getClassLoader().getResourceAsStream("logo.png");
    if (imageStream == null) {
      throw new IllegalArgumentException("Archivo no encontrado: logo.png");
    }
    imageData = ImageDataFactory.create(imageStream.readAllBytes());
    Image image2 = new Image(imageData);
    image2.scaleToFit(200, 100); // Escala la imagen para que quepa en un área de 200x100 puntos

    Optional<Stage> stageOpt = stageService.getStageById(stageId);

    if (stageOpt.isPresent()) {

      Stage stage = stageOpt.get();

      pdfDoc.addEventHandler(PdfDocumentEvent.START_PAGE, new HeaderFooterEventHandler(normalFont, image1, image2,stage.getIteration().getProject().getName()));

      Paragraph title = new Paragraph("DOCUMENTACIÓN DE ESCENARIOS DE PRUEBAS")
        .setFont(normalFont)
        .setFontSize(46)
        .setTextAlignment(TextAlignment.LEFT);
      document.add(title);

      document.add(new Paragraph("\n"));
      document.add(new Paragraph("\n"));

      title = new Paragraph("Proyecto: " + stage.getIteration().getProject().getName())
        .setFont(normalFont)
        .setFontSize(36)
        .setTextAlignment(TextAlignment.LEFT);
      document.add(title);

      LocalDateTime lt = LocalDateTime.now();

      document.add(new Paragraph("\n"));
      document.add(new Paragraph("\n"));
      document.add(new Paragraph("\n"));

      //Integrantes
      List<User> integrantes = userService.getUsersByProjectId(stage.getIteration().getProject().getId());

      document.add(new Paragraph("Integrantes: ")
        .setFont(normalFont)
        .setFontSize(18)
        .setBold()
        .setTextAlignment(TextAlignment.LEFT));

      document.add(new Paragraph("\n"));

      for (User user : integrantes) {

        document.add(new Paragraph("*  " + user.getName())
          .setTextAlignment(TextAlignment.LEFT));

      }

      document.add(new Paragraph("\n"));

      //Datos de la version
      document.add(new Paragraph("Versión Documento: " + lt.format(formatterVersion))
        .setTextAlignment(TextAlignment.LEFT));

      document.add(new Paragraph("Fecha Documento: " + lt.format(formatter))
        .setTextAlignment(TextAlignment.LEFT));

        Table table = new Table(2);

        table.addCell(new Cell().add(image1).setBorder(Border.NO_BORDER));
        table.addCell(new Cell().add(image2).setBorder(Border.NO_BORDER));
    
        document.add(table);

      document.add(new com.itextpdf.layout.element.AreaBreak());

      // Título del escenario
      Paragraph stageTitle = new Paragraph("Escenario de Prueba: " + stage.getName())
        .setFont(normalFont)
        .setBold()
        .setFontSize(18)
        .setTextAlignment(TextAlignment.LEFT);
      document.add(stageTitle);

      document.add(new Paragraph("\n"));

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
          ? (ch.getStatus() ? "V" : "X")
          : "";
        checklistTable.addCell(estado).setTextAlignment(TextAlignment.CENTER); // Columna Estado
        checklistTable.addCell(ch.getDescription() != null ? ch.getDescription() : "").setTextAlignment(TextAlignment.LEFT);
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
      if (stage.getGotResult() != null) {
        document.add(new Paragraph(stage.getGotResult()));
      }

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
    private final PdfFont font;
    private final Image logo1;
    private final Image logo2;
    private final String projectName;

    public HeaderFooterEventHandler(PdfFont font, Image logo1, Image logo2, String projectName) {
      this.font = font;
      this.logo1 = logo1;
      this.logo2 = logo2;
      this.projectName = projectName;
  }

    @Override
    public void handleEvent(Event event) {
      PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
      PdfDocument pdfDoc = docEvent.getDocument();
      PdfPage page = docEvent.getPage();
      PdfCanvas canvas = new PdfCanvas(page.newContentStreamBefore(), page.getResources(), pdfDoc);
      
      PdfFont font;

      try {

        font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        
        float x = pdfDoc.getDefaultPageSize().getLeft() + 36;
        float y = pdfDoc.getDefaultPageSize().getTop() - 20;

        float footerY = pdfDoc.getDefaultPageSize().getBottom() + 20;


        //Table table = new Table(new float[]{1, 1, 4});
        Table table = new Table(new float[]{0.5f, 8, 0.5f});
        table.setWidth(pdfDoc.getDefaultPageSize().getWidth() - 72);
        table.setFixedLayout();

        Cell leftBar = new Cell()
                .setBackgroundColor(new DeviceRgb(255, 153, 102)) // Color naranja
                .setBorder(Border.NO_BORDER); // Sin bordes
        table.addCell(leftBar);

        Table contentTable = new Table(new float[]{1, 3, 1}); 
        contentTable.setWidth(pdfDoc.getDefaultPageSize().getWidth() - 92);

        Cell leftLogoCell = new Cell()
        .add(logo1.scaleToFit(50, 50))
        .setBorder(Border.NO_BORDER)
        .setTextAlignment(TextAlignment.LEFT)
        .setVerticalAlignment(VerticalAlignment.MIDDLE);
        contentTable.addCell(leftLogoCell);

        Cell textCell = new Cell()
        .add(new Paragraph("DOCUMENTACIÓN DE ESCENARIOS DE PRUEBAS\nProyecto: " + projectName)
                .setFont(font)
                .setFontSize(10)
                .setTextAlignment(TextAlignment.LEFT))
        .setBorder(Border.NO_BORDER)
        .setVerticalAlignment(VerticalAlignment.MIDDLE);
        contentTable.addCell(textCell);

        Cell rightLogoCell = new Cell()
                .add(logo2.scaleToFit(50, 50))
                .setBorder(Border.NO_BORDER)
                .setTextAlignment(TextAlignment.RIGHT)
                .setVerticalAlignment(VerticalAlignment.MIDDLE);
        contentTable.addCell(rightLogoCell);

        Cell contentCell = new Cell().add(contentTable)
                .setBorder(Border.NO_BORDER);
        table.addCell(contentCell);

        Cell rightBar = new Cell()
                .setBackgroundColor(new DeviceRgb(255, 153, 102)) // Color naranja
                .setBorder(Border.NO_BORDER);
        table.addCell(rightBar);


            new com.itextpdf.layout.Canvas(canvas, new Rectangle(x, y - 60, pdfDoc.getDefaultPageSize().getWidth() - 72, 60))
                    .add(table)
                    .close();

            canvas.beginText()
              .setFontAndSize(font, 10)
              .moveText(36, footerY) // Posición X e Y
              .showText("Creado con Testify")
              .endText();


            canvas.beginText()
                  .setFontAndSize(font, 10)
                  .moveText(pdfDoc.getDefaultPageSize().getWidth() -100, footerY)
                  .showText("Página " + pdfDoc.getPageNumber(page))
                  .endText();

                  canvas.release();

      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
}
