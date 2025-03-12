
package com.oslo.testify.service;


import com.oslo.testify.entity.ProjectApprovalStatus;
import com.oslo.testify.repository.ProjectApprovalStatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProjectApprovalStatusService {

  @Autowired
  private ProjectApprovalStatusRepository projectApprovalStatusRepository;

  public ProjectApprovalStatus getProjectApprovalStatusById(Long id) {
    return projectApprovalStatusRepository.findById(id).orElse(null);
  }

}
