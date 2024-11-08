package com.oslo.testify.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "steps")
public class Step {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "orden")
  private Long orden;

  @Column(name = "description")
  private String description;

  @Column(name = "comment")
  private String comment;

  @Column(name = "status")
  private StageStatus status;

  @ManyToOne
  @JoinColumn(name = "stage_id")
  @JsonBackReference(value = "stage-steps")
  private Stage stage;

  public Step() {
  }

  public Step(Long id, Long orden, String description, String comment, StageStatus status, Stage stage) {
    this.id = id;
    this.orden = orden;
    this.description = description;
    this.comment = comment;
    this.status = status;
    this.stage = stage;
  }



  public Stage getStage() {
    return stage;
  }

  public void setStage(Stage stage) {
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

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public StageStatus getStatus() {
    return status;
  }

  public void setStatus(StageStatus status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "Step{" +
      "id=" + id +
      ", orden=" + orden +
      ", description='" + description + '\'' +
      ", comment='" + comment + '\'' +
      ", status=" + status +
      ", stage=" + stage +
      '}';
  }
}
