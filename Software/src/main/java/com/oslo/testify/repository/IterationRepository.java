package com.oslo.testify.repository;

import com.oslo.testify.entity.Iteration;
import com.oslo.testify.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IterationRepository extends JpaRepository<Iteration, Long> {
  List<Iteration> findAllByProjectId(Long id);

  boolean existsByNameAndProject(String name, Project project);

  boolean existsByNameAndProjectAndIdNot(String name, Project project, Long id);

  @Query("SELECT COUNT(i) > 0 FROM Iteration i WHERE i.project.id = :projectId AND " +
    "((:startDate BETWEEN i.startDate AND i.endDate) OR (:endDate BETWEEN i.startDate AND i.endDate) OR " +
    "(i.startDate BETWEEN :startDate AND :endDate))")
  boolean existsOverlappingIterations(@Param("projectId") Long projectId,@Param("startDate")  LocalDate startDate,@Param("endDate") LocalDate endDate);

  @Query("SELECT COUNT(i) > 0 FROM Iteration i WHERE i.project.id = :projectId AND i.id != :id AND " +
    "((:startDate BETWEEN i.startDate AND i.endDate) OR (:endDate BETWEEN i.startDate AND i.endDate) OR " +
    "(i.startDate BETWEEN :startDate AND :endDate))")
  boolean existsOverlappingIterationsExcludingId(@Param("projectId") Long projectId,
                                                 @Param("startDate") LocalDate startDate,
                                                 @Param("endDate") LocalDate endDate,
                                                 @Param("id") Long id);

}
