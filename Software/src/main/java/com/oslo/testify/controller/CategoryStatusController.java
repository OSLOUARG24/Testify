package com.oslo.testify.controller;


import com.oslo.testify.entity.CategoryStatus;
import com.oslo.testify.service.CategoryStatusService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class CategoryStatusController {

    private final Logger log = LoggerFactory.getLogger(CategoryStatusController.class);

    @Autowired
    private CategoryStatusService categoryStatusService;

    @GetMapping("/category-status/{id}")
    public List<CategoryStatus> getAllCategoryStatus(@PathVariable(value = "id", required = false) final  Long id) {
      List<CategoryStatus> categories = new ArrayList<>();
      if (id != 0){
        categories = categoryStatusService.getCategoriesByProjectId(id);
      }else {
        categories = categoryStatusService.getAllCategoryStatus();
      }
      return categories;
    }

}
