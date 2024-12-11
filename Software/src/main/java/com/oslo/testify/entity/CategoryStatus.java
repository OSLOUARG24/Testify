package com.oslo.testify.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category_status_v")
public class CategoryStatus {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "project_id")
    private Long projectId;

    @Column( name = "project_name")
    private String projectName;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "pending_quantity")
    private Float pendingQuantity;

    @Column(name = "error_quantity")
    private Float errorQuantity;

    @Column(name = "approved_quantity")
    private Float approvedQuantity;

  public CategoryStatus() {}

  public Long getProjectId() {
    return projectId;
  }

  public CategoryStatus(Long projectId, String projectName, String categoryName, Float pendingQuantity, Float errorQuantity, Float approvedQuantity) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.categoryName = categoryName;
    this.pendingQuantity = pendingQuantity;
    this.errorQuantity = errorQuantity;
    this.approvedQuantity = approvedQuantity;
  }

  public String getProjectName() {
    return projectName;
  }

  public String getCategoryName() {
    return categoryName;
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
      ", categoryName='" + categoryName + '\'' +
      ", pendingQuantity=" + pendingQuantity +
      ", errorQuantity=" + errorQuantity +
      ", approvedQuantity=" + approvedQuantity +
      '}';
  }
}
