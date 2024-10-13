
package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.Project;
import com.oslo.testify.repository.ProjectRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

  import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepository;

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Project saveProject(Project project) {
    return projectRepository.save(project);
  }

  public Project getProjectById(Long id) {
    return projectRepository.findById(id).orElse(null);
  }

  public void deleteProject(Long id) {
    projectRepository.deleteById(id);
  }

  public List<Project> getProjectsByEmail(String email) {
    return projectRepository.findDistinctProjectsByUserEmail(email);
  }

  @Transactional
  public Project updateProject(Long id, Project projectDetails) {
    // Busca el proyecto existente por ID
    Optional<Project> existingProject = projectRepository.findById(id);

    if (existingProject.isPresent()) {
      Project project = existingProject.get();

      // Actualiza los atributos del proyecto
      project.setName(projectDetails.getName());
      project.setStatus(projectDetails.getStatus());
      project.setRateApproval(projectDetails.getRateApproval());


      // Guarda el proyecto actualizado
      return projectRepository.save(project);
    } else {
      throw new ResourceNotFoundException("Project not found with id: " + id);
    }
  }
}
