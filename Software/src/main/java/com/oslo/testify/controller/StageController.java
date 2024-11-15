package com.oslo.testify.controller;

import com.oslo.testify.entity.Stage;
import com.oslo.testify.service.PDFReportService;
import com.oslo.testify.service.StageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class StageController {

  private final Logger log = LoggerFactory.getLogger(StageController.class);

  @Autowired
  private StageService stageService;

  @Autowired
  private PDFReportService pdfReportService;

  @GetMapping("/stages")
  public List<Stage> getAllStages() {
    List<Stage> stages = stageService.getAllStages();
    for (Stage st : stages){
      log.debug("Stage Status : ",st.getStatus());
    }
    return stages;
  }

  @GetMapping("/stages/no-previous/{id}")
  public List<Stage> getAllLastStages(@PathVariable(value = "id", required = false) final Long id) {
    return stageService.getAllLastStages(id);
  }

  @GetMapping("/stages/{id}")
  public List<Stage> getAllByIterationId(@PathVariable(value = "id", required = false) final Long id) {
    return stageService.getAllByIterationId(id);
  }

  @GetMapping("/stages/user/{id}")
  public List<Stage> getAllStagesByUserId(@PathVariable(value = "id", required = false) final Long id) {
    return stageService.getAllStagesByUserId(id);
  }

  @GetMapping("/stage/{id}")
  public ResponseEntity<Stage> getStageById(@PathVariable(value = "id", required = false) final Long id) {
    Optional<Stage> stage = stageService.getStageById(id);
    if (stage.isPresent()) {
      return ResponseEntity.ok(stage.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping("/stage")
  public ResponseEntity<?> createStage(@RequestBody Stage stage) {
    try {
      stageService.createStage(stage);
      return ResponseEntity.ok(stage);
    } catch (RuntimeException ex) {
      return ResponseEntity.badRequest().body(ex.getMessage());
    }
  }

  @PostMapping("/stage/copy")
  public ResponseEntity<Stage> copyStage(@RequestBody Map<String, Long> request) {
    Long stageId = request.get("id");
    Stage copiedStage = stageService.copyStage(stageId);
    return ResponseEntity.ok(copiedStage);
  }

  @PutMapping("/stage/{id}")
  public ResponseEntity<Stage> updateStage(@PathVariable(value = "id", required = false) final Long id, @RequestBody Stage stageDetails) {
    Stage updatedStage = stageService.updateStage(id, stageDetails);

    if (updatedStage != null) {
      return ResponseEntity.ok(updatedStage);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/stage/{id}")
  public ResponseEntity<Void> deleteStage(@PathVariable(value = "id", required = false) final Long id) {
    stageService.deleteStage(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/stages/project/{id}")
  public List<Stage> getStagesByProjectId(@PathVariable(value = "id", required = false) final Long projectId) {
    return stageService.getStagesByProjectId(projectId);
  }

  @PostMapping("/stage/export")
  public ResponseEntity<byte[]> generateStageReport(
    @RequestParam("stageId") Long stageId) {
    try {
      byte[] pdfContent = pdfReportService.generateStageReport(stageId);
      HttpHeaders headers = new HttpHeaders();
      headers.add("Content-Disposition", "inline; filename=stage_report.pdf");
      return ResponseEntity.ok().headers(headers).body(pdfContent);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}
