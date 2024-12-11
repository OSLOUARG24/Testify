package com.oslo.testify.repository;

import com.oslo.testify.entity.IterationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IterationStatusRepository extends JpaRepository<IterationStatus, Long> {
  List<IterationStatus> findAllByProjectId(Long id);
}
