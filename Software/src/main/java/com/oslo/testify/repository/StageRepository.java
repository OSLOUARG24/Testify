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

    @Query("SELECT s FROM Stage s WHERE s.iteration.project.id = :pId and s.tester.id = :sId")
    List<Stage> findByTesterIdAndProjectId(@Param("sId") Long sId, @Param("pId") Long pId);

    boolean existsByNameAndIteration(String name, Iteration iteration);

    @Query("SELECT s FROM Stage s WHERE s.iteration.project.id = :projectId")
    List<Stage> findAllByProjectId(@Param("projectId") Long projectId);

    List<Stage> findByIteration_Project_Id(Long projectId);

    Optional<Stage> findByPreviousStage(Stage stage);

    @Query(value = """
    SELECT pr.name AS project_name, it.name AS iteration_name, st.status AS status, COUNT(st.id) AS quantity
    FROM iterations it
    JOIN projects pr ON pr.id = it.project_id
    LEFT JOIN stages st ON st.iteration_id = it.id
    WHERE (st.previous_stage_id IS NULL OR (st.previous_stage_id IS NOT NULL AND st.status = 'APROBADO'))
    AND (:projectId IS NULL OR pr.id = :projectId)
    GROUP BY pr.name, it.name, st.status
    ORDER BY pr.name, it.name
    """, nativeQuery = true)
    List<Object[]> getStageStatusGroupedByIteration(@Param("projectId") Long projectId);
}
