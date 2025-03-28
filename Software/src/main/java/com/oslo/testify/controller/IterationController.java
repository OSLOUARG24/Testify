package com.oslo.testify.controller;


import com.oslo.testify.entity.Iteration;
import com.oslo.testify.service.IterationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class IterationController {

    private final Logger log = LoggerFactory.getLogger(IterationController.class);

    @Autowired
    private IterationService iterationService;

    @GetMapping("/iterations")
    public List<Iteration> getAllIterations() {
      List<Iteration> iterations = iterationService.getAllIterations();
      log.debug(iterations.toString());
      return iterations;
    }

    @GetMapping("/iterations/project/{id}")
    public List<Iteration> getAllByProjectId(@PathVariable(value = "id", required = false) final  Long id) {
      List<Iteration> iterations = iterationService.getIterationsByProjectId(id);
      return iterations;
    }

    @PostMapping(value = "/iteration", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createIteration(@RequestBody Iteration iteration) {
      try {
        iterationService.saveIteration(iteration);
        return ResponseEntity.ok(iteration);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }

    @GetMapping("/iteration/{id}")
    public Iteration getIterationById(@PathVariable(value = "id", required = false) final  Long id) {
        return iterationService.getIterationById(id);
    }

    @DeleteMapping("/iteration/{id}")
    public ResponseEntity<?> deleteIteration(@PathVariable(value = "id", required = false) final Long id) {
      try {
        iterationService.deleteIteration(id);
          return ResponseEntity.ok("Iteracion eliminada correctamente");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar la iteracion: " + ex.getMessage());
      }
    }

    @PutMapping("/iteration/{id}")
    public ResponseEntity<?> updateIteration(@PathVariable(value = "id", required = false) final Long id, @RequestBody Iteration iterationDetails) {
      try {
          Iteration updatedIteration = iterationService.updateIteration(id, iterationDetails);
          return ResponseEntity.ok(updatedIteration);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }

    }
}
