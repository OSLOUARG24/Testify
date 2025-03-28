package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.Iteration;
import com.oslo.testify.repository.IterationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class IterationService {

    @Autowired
    private IterationRepository iterationRepository;

    public List<Iteration> getAllIterations() {
        return iterationRepository.findAll();
    }

    public Iteration saveIteration(Iteration iteration) {
      if (iterationRepository.existsByNameAndProject(iteration.getName(),iteration.getProject())) {
        throw new RuntimeException("Ya existe una iteración con este nombre");
      }
      boolean isOverlapping = iterationRepository.existsOverlappingIterations(
        iteration.getProject().getId(),
        iteration.getStartDate(),
        iteration.getEndDate()
      );
      if (isOverlapping) {
        throw new RuntimeException("Las fechas de esta iteración se superponen con las fechas de otra iteración");
      }
      return iterationRepository.save(iteration);
    }

    public Iteration getIterationById(Long id) {
        return iterationRepository.findById(id).orElse(null);
    }

    public void deleteIteration(Long id) {
      iterationRepository.deleteById(id);
    }

    public List<Iteration> getIterationsByProjectId(Long id) {
        return iterationRepository.findAllByProjectId(id);
    }

  @Transactional
  public Iteration updateIteration(Long id, Iteration iterationDetails) {
    Optional<Iteration> existingIteration = iterationRepository.findById(id);

    if (existingIteration.isPresent()) {

      if (iterationRepository.existsByNameAndProjectAndIdNot(iterationDetails.getName(),iterationDetails.getProject(),id)) {
        throw new RuntimeException("Ya existe una iteración con este nombre");
      }
      boolean isOverlapping = iterationRepository.existsOverlappingIterationsExcludingId(
        iterationDetails.getProject().getId(),
        iterationDetails.getStartDate(),
        iterationDetails.getEndDate(),
        id
      );
      if (isOverlapping) {
        throw new RuntimeException("Las fechas de esta iteración se superponen con las fechas de otra iteración");
      }

      Iteration iteration = existingIteration.get();

      iteration.setName(iterationDetails.getName());

      iteration.setStartDate(iterationDetails.getStartDate());

      iteration.setEndDate(iterationDetails.getEndDate());

      return iterationRepository.save(iteration);
    } else {
      throw new ResourceNotFoundException("Iteración no encontrada con id: " + id);
    }
  }

}

