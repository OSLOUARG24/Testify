package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "check_lists")
public class CheckList {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "orden")
  private Long orden;

  @Column(name = "description")
  private String description;

  @Column(name = "status")
  private Boolean status;

  @ManyToOne
  @JoinColumn(name = "stage_id")
  @JsonBackReference(value = "stage-checkList")
  private Stage stage;

  public CheckList() {
  }

  public CheckList(Long id, Long orden, String description, Boolean status, Stage stage) {
    this.id = id;
    this.orden = orden;
    this.description = description;
    this.status = status;
    this.stage = stage;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getOrden() {
    return orden;
  }

  public void setOrden(Long orden) {
    this.orden = orden;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getStatus() {
    return status;
  }

  public void setStatus(Boolean status) {
    this.status = status;
  }

  public Stage getStage() {
    return stage;
  }

  public void setStage(Stage stage) {
    this.stage = stage;
  }

  @Override
  public String toString() {
    return "CheckList{" +
      "id=" + id +
      ", orden=" + orden +
      ", description='" + description + '\'' +
      ", status=" + status +
      ", stage=" + stage +
      '}';
  }
}
