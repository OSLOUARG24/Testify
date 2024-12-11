package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.Category;
import com.oslo.testify.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category saveCategory(Category category) {
      if (categoryRepository.existsByName(category.getName())) {
        throw new RuntimeException("Ya existe una categoría con este nombre");
      }
      return categoryRepository.save(category);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public void deleteCategory(Long id) {
      categoryRepository.deleteById(id);
    }

  @Transactional
  public Category updateCategory(Long id, Category categoryDetails) {
    Optional<Category> existingCategory = categoryRepository.findById(id);

    if (existingCategory.isPresent()) {

      if (categoryRepository.existsByNameAndIdNot(categoryDetails.getName(),id)) {
        throw new RuntimeException("Ya existe una categoría con este nombre");
      }

      Category category = existingCategory.get();

      category.setName(categoryDetails.getName());

      return categoryRepository.save(category);
    } else {
      throw new ResourceNotFoundException("Categoría no encontrada con id: " + id);
    }
  }

}

