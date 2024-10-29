package com.oslo.testify.repository;

import com.oslo.testify.entity.Stage;
import com.oslo.testify.entity.Iteration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {

    List<Stage> findByPreviousStageIsNullAndIterationId(Long id);

    List<Stage> findByTesterId(Long id);

    boolean existsByNameAndIteration(String name, Iteration iteration);
}
