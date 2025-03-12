package com.oslo.testify.controller;


import com.oslo.testify.entity.IterationStatus;
import com.oslo.testify.service.IterationStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class IterationStatusController {

    @Autowired
    private IterationStatusService iterationStatusService;

    @GetMapping("/iteration-status/{id}")
    public List<IterationStatus> getAllIterationStatus(@PathVariable(value = "id", required = false) final  Long id) {
      List<IterationStatus> iterations = new ArrayList<>();
      if (id != 0){
        iterations = iterationStatusService.getIterationsByProjectId(id);
      }else {
        iterations = iterationStatusService.getAllIterationStatus();
      }
      return iterations;
    }

}
