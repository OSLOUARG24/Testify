package com.oslo.testify.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_approval_status")
public class ProjectApprovalStatus {

    @Id
    @Column(name = "id")
    private Long id;

    @Column( name = "approval_percentage")
    private Float approvalPercentage;

    // Getters and Setters

    public ProjectApprovalStatus(){}

    public ProjectApprovalStatus(Long id, Float approvalPercentage) {
      this.id = id;
      this.approvalPercentage = approvalPercentage;
    }

  public Long getId() {
        return id;
    }

  public Float getApprovalPercentage() {
        return approvalPercentage;
    }

  @Override
  public String toString() {
    return "Project{" +
      "id=" + id +
      ", approvalPercentage=" + approvalPercentage +
      '}';
  }
}
