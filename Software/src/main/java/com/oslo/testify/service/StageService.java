package com.oslo.testify.service;

import com.oslo.testify.entity.*;
import com.oslo.testify.repository.CheckListRepository;
import com.oslo.testify.repository.DocumentRepository;
import com.oslo.testify.repository.StageRepository;
import com.oslo.testify.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

  public Stage copyStage(Long id) {
    Optional<Stage> oldStage = stageRepository.findById(id);
    if (oldStage.isPresent()){
      Stage newStage = new Stage();
      newStage.setName(oldStage.get().getName());
      newStage.setNumber(oldStage.get().getNumber()+ 1);
      newStage.setCategory(oldStage.get().getCategory());
      newStage.setType(oldStage.get().getType());
      newStage.setSubType(oldStage.get().getSubType());
      newStage.setTester(oldStage.get().getTester());
      newStage.setPriority(oldStage.get().getPriority());
      newStage.setDateRequired(oldStage.get().getDateRequired());
      newStage.setIteration(oldStage.get().getIteration());
      newStage.setStatus(oldStage.get().getStatus());
      newStage.setExpectedResult(oldStage.get().getExpectedResult());
      newStage.setGotResult(oldStage.get().getGotResult());
      newStage.setEstimatedTime(oldStage.get().getEstimatedTime());

      Stage savedNewStage = stageRepository.save(newStage);

      List<CheckList> chs = new ArrayList<>();
      for (CheckList checkList: oldStage.get().getCheckLists()) {
        CheckList cl = new CheckList();
        cl.setStage(checkList.getStage());
        cl.setStatus(checkList.getStatus());
        cl.setDescription(checkList.getDescription());
        cl.setOrden(checkList.getOrden());
        chs.add(cl);
      }
      newStage.setCheckLists(chs);
      List<Step> sts = new ArrayList<>();
      for (Step step: oldStage.get().getSteps()) {
        Step st = new Step();
        st.setStage(step.getStage());
        st.setComment(step.getComment());
        st.setDescription(step.getDescription());
        st.setOrden(step.getOrden());
        st.setStatus(step.getStatus());
        sts.add(st);
      }
      newStage.setSteps(sts);
      stageRepository.save(newStage);
      Stage st = oldStage.get();
      st.setPreviousStage(newStage);
      stageRepository.save(st);
      return newStage;

    } else {
      return null;
    }
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
}
