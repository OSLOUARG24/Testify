package com.oslo.testify.repository;

import com.oslo.testify.entity.Stage;
import com.oslo.testify.entity.Iteration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {

    List<Stage> findByIterationId(Long id);

    List<Stage> findByPreviousStageIsNullAndIterationId(Long id);

    List<Stage> findByTesterId(Long id);

    boolean existsByNameAndIteration(String name, Iteration iteration);

    @Query("SELECT s FROM Stage s WHERE s.iteration.project.id = :projectId")
    List<Stage> findAllByProjectId(@Param("projectId") Long projectId);

    List<Stage> findByIteration_Project_Id(Long projectId);

    Optional<Stage> findByPreviousStage(Stage stage);
}
