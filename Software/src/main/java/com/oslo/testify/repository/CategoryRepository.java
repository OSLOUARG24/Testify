package com.oslo.testify.repository;

import com.oslo.testify.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  boolean existsByName(String name);
  
  boolean existsByNameAndIdNot(String name, Long id);
}
