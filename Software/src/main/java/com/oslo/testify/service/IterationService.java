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
        throw new RuntimeException("Ya existe una iteracion con este nombre");
      }
      boolean isOverlapping = iterationRepository.existsOverlappingIterations(
        iteration.getProject().getId(),
        iteration.getStartDate(),
        iteration.getEndDate()
      );

      if (isOverlapping) {
        throw new RuntimeException("Las fechas de esta iteracion se superponen con las fechas de otra iteracion");
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
      Iteration iteration = existingIteration.get();

      // Actualizar los campos de la iteracion
      iteration.setName(iterationDetails.getName());

      iteration.setStartDate(iterationDetails.getStartDate());

      iteration.setEndDate(iterationDetails.getEndDate());

      //iteration.setProject(iterationDetails.getProject());

      // Guardar la iteracion actualizado
      return iterationRepository.save(iteration);
    } else {
      throw new ResourceNotFoundException("Iteration not found with id: " + id);
    }
  }

}

