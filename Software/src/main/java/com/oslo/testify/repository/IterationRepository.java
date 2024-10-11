package com.oslo.testify.repository;

import com.oslo.testify.entity.Iteration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IterationRepository extends JpaRepository<Iteration, Long> {
  List<Iteration> findAllByProjectId(Long id);
}
