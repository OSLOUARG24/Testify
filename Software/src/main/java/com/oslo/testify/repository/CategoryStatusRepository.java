package com.oslo.testify.repository;

import com.oslo.testify.entity.CategoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryStatusRepository extends JpaRepository<CategoryStatus, Long> {
  List<CategoryStatus> findAllByProjectId(Long id);
}
