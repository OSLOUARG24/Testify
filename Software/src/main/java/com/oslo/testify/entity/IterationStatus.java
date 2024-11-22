package com.oslo.testify.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "iteration_status_v")
public class IterationStatus {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "project_id")
    private Long projectId;

    @Column( name = "project_name")
    private String projectName;

    @Column(name = "iteration_name")
    private String iterationName;

    @Column(name = "pending_quantity")
    private Float pendingQuantity;

    @Column(name = "error_quantity")
    private Float errorQuantity;

    @Column(name = "approved_quantity")
    private Float approvedQuantity;

  public IterationStatus() {}

  public IterationStatus(Long projectId, String projectName, String iterationName, Float pendingQuantity, Float errorQuantity, Float approvedQuantity) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.iterationName = iterationName;
    this.pendingQuantity = pendingQuantity;
    this.errorQuantity = errorQuantity;
    this.approvedQuantity = approvedQuantity;
  }

  public Long getProjectId() {
    return projectId;
  }

  public String getProjectName() {
    return projectName;
  }

  public String getIterationName() {
    return iterationName;
  }

  public Float getPendingQuantity() {
    return pendingQuantity;
  }

  public Float getErrorQuantity() {
    return errorQuantity;
  }

  public Float getApprovedQuantity() {
    return approvedQuantity;
  }

  @Override
  public String toString() {
    return "IterationStatus{" +
      "projectId=" + projectId +
      ", projectName='" + projectName + '\'' +
      ", iterationName='" + iterationName + '\'' +
      ", pendingQuantity=" + pendingQuantity +
      ", errorQuantity=" + errorQuantity +
      ", approvedQuantity=" + approvedQuantity +
      '}';
  }
}
