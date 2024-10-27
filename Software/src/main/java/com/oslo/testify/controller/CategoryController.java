package com.oslo.testify.controller;


import com.oslo.testify.entity.Category;
import com.oslo.testify.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class CategoryController {

    private final Logger log = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
      List<Category> categories = categoryService.getAllCategories();
      return categories;
    }

    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@RequestBody Category category) {
      try {
        categoryService.saveCategory(category);
        return ResponseEntity.ok(category);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }

    @GetMapping("/category/{id}")
    public Category getCategoryById(@PathVariable(value = "id", required = false) final  Long id) {
        return categoryService.getCategoryById(id);
    }

    @DeleteMapping("/category/{id}")
    public void deleteCategory(@PathVariable(value = "id", required = false) final  Long id) {
      categoryService.deleteCategory(id);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable(value = "id", required = false) final Long id, @RequestBody Category categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }
}
