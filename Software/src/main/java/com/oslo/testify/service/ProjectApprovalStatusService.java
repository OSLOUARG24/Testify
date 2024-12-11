
package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.Project;
import com.oslo.testify.entity.ProjectApprovalStatus;
import com.oslo.testify.repository.ProjectApprovalStatusRepository;
import com.oslo.testify.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectApprovalStatusService {

  @Autowired
  private ProjectApprovalStatusRepository projectApprovalStatusRepository;

  public ProjectApprovalStatus getProjectApprovalStatusById(Long id) {
    return projectApprovalStatusRepository.findById(id).orElse(null);
  }

}
