package com.oslo.testify.repository;

import com.oslo.testify.entity.Category;
import com.oslo.testify.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  boolean existsByName(String name);
  
  boolean existsByNameAndIdNot(String name, Long id);
}
