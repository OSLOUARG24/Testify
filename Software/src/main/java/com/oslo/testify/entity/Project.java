package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column( name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column( name = "status")
    private ProjectStatus status;

    @Column( name = "rate_approval")
    private Float rateApproval;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Iteration> iterations = new ArrayList<>();

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

    public List<Iteration> getIterations() {
      return iterations;
    }

    public void setIterations(List<Iteration> iterations) {
      this.iterations = iterations;
    }

  @Override
  public String toString() {
    return "Project{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", status=" + status +
      ", rateApproval=" + rateApproval +
      ", iterations=" + iterations +
      '}';
  }
}
