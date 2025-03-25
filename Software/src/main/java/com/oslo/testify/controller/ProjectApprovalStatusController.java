package com.oslo.testify.controller;

import com.oslo.testify.entity.ProjectApprovalStatus;
import com.oslo.testify.service.ProjectApprovalStatusService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectApprovalStatusController {


    @Autowired
    private ProjectApprovalStatusService projectApprovalStatusService;

    @GetMapping("/project-approval-status/{id}")
    public ProjectApprovalStatus getProjectApprovalStatusById(@PathVariable(value = "id", required = false) final Long id) {
        return projectApprovalStatusService.getProjectApprovalStatusById(id);
    }

}
