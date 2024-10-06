package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column( name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column( name = "status")
    private ProjectStatus status;

    @Column( name = "rate_approval")
    private Float rateApproval;

    // Getters and Setters

    public Project(){}

  public Project(Long id, String name, ProjectStatus status, Float rateApproval) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.rateApproval = rateApproval;
  }

  public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

  public ProjectStatus getStatus() {
    return status;
  }

  public void setStatus(ProjectStatus status) {
    this.status = status;
  }

  public Float getRateApproval() {
        return rateApproval;
    }

    public void setRateApproval(Float rateApproval) {
        this.rateApproval = rateApproval;
    }

  @Override
  public String toString() {
    return "Project{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", status=" + status +
      ", rateApproval=" + rateApproval +
      '}';
  }
}
