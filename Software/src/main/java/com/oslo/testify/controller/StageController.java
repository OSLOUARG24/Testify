package com.oslo.testify.controller;

import com.oslo.testify.entity.Stage;
import com.oslo.testify.service.StageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<Stage> copyStage(@RequestBody Map<String, Object> request) {
    Long id = ((Number) request.get("id")).longValue();
    return ResponseEntity.ok(stageService.copyStage(id));
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
  public ResponseEntity<List<Stage>> getStagesByProjectId(@PathVariable(value = "id", required = false) final Long projectId) {
    List<Stage> stages = stageService.getStagesByProjectId(projectId);
    return ResponseEntity.ok(stages);
  }
}
