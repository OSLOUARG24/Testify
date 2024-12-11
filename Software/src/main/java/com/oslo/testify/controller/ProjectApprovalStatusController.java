package com.oslo.testify.controller;

import com.oslo.testify.entity.Project;
import com.oslo.testify.entity.ProjectApprovalStatus;
import com.oslo.testify.service.IterationService;
import com.oslo.testify.service.PDFReportService;
import com.oslo.testify.service.ProjectApprovalStatusService;
import com.oslo.testify.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class ProjectApprovalStatusController {

    private final Logger log = LoggerFactory.getLogger(ProjectApprovalStatusController.class);

    @Autowired
    private ProjectApprovalStatusService projectApprovalStatusService;

    @GetMapping("/project-approval-status/{id}")
    public ProjectApprovalStatus getProjectApprovalStatusById(@PathVariable(value = "id", required = false) final Long id) {
        return projectApprovalStatusService.getProjectApprovalStatusById(id);
    }

}
