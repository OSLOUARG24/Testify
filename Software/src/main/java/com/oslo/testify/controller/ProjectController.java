package com.oslo.testify.controller;

import com.oslo.testify.entity.Project;
import com.oslo.testify.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    private final Logger log = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private ProjectService projectService;

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
      return projectService.getAllProjects();
    }

    @PostMapping(value = "/project", consumes = "application/json", produces = "application/json")
    public Project createProject(@RequestBody Project project) {
    return projectService.saveProject(project);
  }

    @PutMapping("/project/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable(value = "id", required = false) final Long id, @RequestBody Project projectDetails) {
      // Llama al servicio para actualizar el proyecto
      Project updatedProject = projectService.updateProject(id, projectDetails);
      return ResponseEntity.ok(updatedProject);
    }

    @GetMapping("/project/{id}")
    public Project getProjectById(@PathVariable(value = "id", required = false) final Long id) {
        return projectService.getProjectById(id);
    }

    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable(value = "id", required = false) final Long id) {
        projectService.deleteProject(id);
    }

    @GetMapping("/projects/user-email/{email}")
    public List<Project> getProjectsByEmail(@PathVariable(value = "email", required = false) final String email) {
      return projectService.getProjectsByEmail(email);
    }
}
