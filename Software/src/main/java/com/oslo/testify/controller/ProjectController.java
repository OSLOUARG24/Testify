package com.oslo.testify.controller;

import com.oslo.testify.entity.Project;
import com.oslo.testify.service.PDFReportService;
import com.oslo.testify.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PDFReportService pdfReportService;

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
      return projectService.getAllProjects();
    }

    @PostMapping(value = "/project", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
      try {
        projectService.saveProject(project);
        return ResponseEntity.ok(project);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
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
    public ResponseEntity<?> deleteProject(@PathVariable(value = "id", required = false) final Long id) {
      try {
        projectService.deleteProject(id);
          return ResponseEntity.ok("Proyecto eliminado correctamente.");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar el proyecto: " + ex.getMessage());
      }
    }

    @GetMapping("/projects/user-email/{email}")
    public List<Project> getProjectsByEmail(@PathVariable(value = "email", required = false) final String email) {
      return projectService.getProjectsByEmail(email);
    }

  @PostMapping("/project/export")
  public ResponseEntity<byte[]> generateProjectReport(
    @RequestParam("projectId") Long projectId,
    @RequestParam("includeStatus") boolean includeStatus,
    @RequestParam("includeStageDetail") boolean includeStageDetail) {
    try {
      byte[] pdfContent = pdfReportService.generateProjectReport(projectId, includeStatus, includeStageDetail);
      HttpHeaders headers = new HttpHeaders();
      headers.add("Content-Disposition", "inline; filename=project_report.pdf");
      return ResponseEntity.ok().headers(headers).body(pdfContent);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}
