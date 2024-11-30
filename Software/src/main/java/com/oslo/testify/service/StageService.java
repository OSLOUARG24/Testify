package com.oslo.testify.service;

import com.oslo.testify.entity.*;
import com.oslo.testify.repository.CheckListRepository;
import com.oslo.testify.repository.DocumentRepository;
import com.oslo.testify.repository.StageRepository;
import com.oslo.testify.repository.StepRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StageService {

  @Autowired
  private StageRepository stageRepository;

  @Autowired
  private CheckListRepository checkListRepository;

  @Autowired
  private StepRepository stepRepository;

  @Autowired
  private DocumentRepository documentRepository;

  public List<Stage> getAllStages() {
    return stageRepository.findAll();
  }

  public List<Stage> getAllLastStages(Long id) {
    return stageRepository.findByPreviousStageIsNullAndIterationId(id);
  }

  public List<Stage> getAllByIterationId(Long id) {
    return stageRepository.findByIterationId(id);
  }

  public List<Stage> getAllStagesByUserId(Long id) {
    return stageRepository.findByTesterId(id);
  }

  public Optional<Stage> getStageById(Long id) {
    return stageRepository.findById(id);
  }

  public Stage createStage(Stage stage) {
  	if (stageRepository.existsByNameAndIteration(stage.getName(),stage.getIteration())) {
      throw new RuntimeException("Ya existe un escenario con este nombre en esta iteración");
    }
    return stageRepository.save(stage);
  }

  @Transactional
  public Stage copyStage(Long stageId) {
    // Buscar el stage original
    Stage originalStage = stageRepository.findById(stageId)
      .orElseThrow(() -> new IllegalArgumentException("Stage no encontrado"));

    int stageCount = stageRepository.findAllByProjectId(originalStage.getIteration().getProject().getId()).size();
    int newNumber = stageCount + 1;

    // Crear una copia del stage sin steps, checklists ni documentos
    Stage copiedStage = new Stage();
    copiedStage.setName("Copia de Escenario Nro" + originalStage.getNumber());
    copiedStage.setNumber(newNumber);
    copiedStage.setIteration(originalStage.getIteration());
    copiedStage.setCategory(originalStage.getCategory());
    copiedStage.setType(originalStage.getType());
    copiedStage.setSubType(originalStage.getSubType());
    copiedStage.setTester(originalStage.getTester());
    copiedStage.setPriority(originalStage.getPriority());
    copiedStage.setDateRequired(originalStage.getDateRequired());
    copiedStage.setStatus(StageStatus.PENDIENTE); // Estado inicial
    copiedStage.setEstimatedTime(originalStage.getEstimatedTime());

    // Copiar los checklists sin el estado
    copiedStage.setCheckLists(
      originalStage.getCheckLists().stream()
        .map(originalCheckList -> {
          CheckList copiedCheckList = new CheckList();
          copiedCheckList.setDescription(originalCheckList.getDescription());
          copiedCheckList.setStage(copiedStage);
          copiedCheckList.setStatus(false);
          return copiedCheckList;
        })
        .collect(Collectors.toList())
    );

    // Copiar los steps sin el estado
    copiedStage.setSteps(
      originalStage.getSteps().stream()
        .map(originalStep -> {
          Step copiedStep = new Step();
          copiedStep.setDescription(originalStep.getDescription());
          copiedStep.setStage(copiedStage); // Asigna el nuevo stage como propietario
          copiedStep.setStatus(StageStatus.PENDIENTE); // Estado inicial
          return copiedStep;
        })
        .collect(Collectors.toList())
    );

    // Guardar la copia en la base de datos
    Stage savedCopiedStage = stageRepository.save(copiedStage);

    // Asignar el nuevo stage como `previousStage` del original
    originalStage.setPreviousStage(savedCopiedStage);
    stageRepository.save(originalStage);

    return savedCopiedStage;
  }

  public Stage updateStage(Long id, Stage stageDetails) {
    Optional<Stage> stageOptional = stageRepository.findById(id);

    if (stageOptional.isPresent()) {
      Stage stage = stageOptional.get();
      stage.setName(stageDetails.getName());
      stage.setIteration(stageDetails.getIteration());
      stage.setType(stageDetails.getType());
      stage.setPriority(stageDetails.getPriority());
      stage.setDateRequired(stageDetails.getDateRequired());
      stage.setComment(stageDetails.getComment());
      stage.setTester(stageDetails.getTester());
      stage.setCategory(stageDetails.getCategory());
      stage.setEstimatedTime(stageDetails.getEstimatedTime());
      stage.setExpectedResult(stageDetails.getExpectedResult());
      stage.setTestedFrom(stageDetails.getTestedFrom());
      stage.setTestedTo(stageDetails.getTestedTo());
      stage.setGotResult(stageDetails.getGotResult());
      stage.setNumber(stageDetails.getNumber());
      stage.setPriority(stageDetails.getPriority());
      stage.setSubType(stageDetails.getSubType());
      stage.setStatus(stageDetails.getStatus());

      if (stageDetails.getCheckLists() != null) {
        stage.getCheckLists().clear();

        for (CheckList checkList : stageDetails.getCheckLists()) {
          if (checkList.getId() == null) {
            checkList.setStage(stage);
            checkListRepository.save(checkList);
          } else {
            checkList.setStage(stage);
          }
          stage.getCheckLists().add(checkList);
        }
      }

      if (stageDetails.getSteps() != null) {
        stage.getSteps().clear();

        for (Step step : stageDetails.getSteps()) {
          if (step.getId() == null) {
            step.setStage(stage); // Asignar Stage antes de guardar
            stepRepository.save(step);
          } else {
            step.setStage(stage);
          }
          stage.getSteps().add(step);
        }
      }

      if (stageDetails.getDocuments() != null) {
        stage.getDocuments().clear();

        for (Document document : stageDetails.getDocuments()) {
          if (document.getId() == null) {
            document.setStage(stage); // Asignar Stage antes de guardar
            documentRepository.save(document);
          } else {
            document.setStage(stage);
          }
          stage.getDocuments().add(document);
        }
      }

      return stageRepository.save(stage);
    } else {
      throw new RuntimeException("Escenario no encontrado");
    }
  }

  public void deleteStage(Long id) {
    Optional<Stage> stage = stageRepository.findById(id);
    if (stage.isPresent())
    {
      Stage currentStage = stage.get();

      // Verificar si el estado del Stage no es PENDIENTE
      if (currentStage.getStatus() != StageStatus.PENDIENTE) {
        throw new RuntimeException("El escenario contiene pruebas realizadas o no está pendiente. Actualice el estado a Finalizado.");
      }

      // Verificar si existen steps con estado distinto de APROBADO
      boolean hasApprovedSteps = currentStage.getSteps().stream()
        .anyMatch(step -> step.getStatus() != StageStatus.PENDIENTE);
      if (hasApprovedSteps) {
        throw new RuntimeException("El escenario contiene pasos que no están Pendientes.");
      }

      // Verificar si existen checkLists con estado `true`
      boolean hasActiveCheckLists = currentStage.getCheckLists().stream()
        .anyMatch(checkList -> checkList.getStatus());
      if (hasActiveCheckLists) {
        throw new RuntimeException("El escenario contiene checklists activas.");
      }
      stageRepository.deleteById(id);
    }
  }

  public List<Stage> getStagesByProjectId(Long projectId) {
    return stageRepository.findAllByProjectId(projectId);
  }

  public List<Map<String, Object>> getMatrixByProjectId(Long projectId) {
    // Filtrar las etapas (stages) por projectId
    List<Stage> stages = stageRepository.findByIteration_Project_Id(projectId);

    // Agrupar por Type y contar los Subtypes
    Map<String, Map<String, Long>> matrix = stages.stream()
      .collect(Collectors.groupingBy(
        stage -> stage.getType().getName(), // Agrupar por el nombre del Type
        Collectors.groupingBy(
          stage -> stage.getSubType().getName(), // Agrupar por el nombre del Subtype
          Collectors.counting() // Contar ocurrencias
        )
      ));

    // Obtener todos los Subtypes para las columnas
    Set<String> allSubtypes = stages.stream()
      .map(stage -> stage.getSubType().getName())
      .collect(Collectors.toSet());

    // Crear la lista para representar la matriz
    List<Map<String, Object>> result = new ArrayList<>();

    // Construir filas con Type y sus Subtypes
    for (Map.Entry<String, Map<String, Long>> entry : matrix.entrySet()) {
      Map<String, Object> row = new HashMap<>();
      row.put("Tipo de Escenario", entry.getKey()); // Nombre del Type

      // Rellenar los valores para cada Subtype
      for (String subtype : allSubtypes) {
        row.put(subtype, entry.getValue().getOrDefault(subtype, 0L));
      }

      result.add(row);
    }

    return result;
  }

}
