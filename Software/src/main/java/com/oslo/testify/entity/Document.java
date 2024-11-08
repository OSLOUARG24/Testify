package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.sql.Blob;

@Entity
@Table(name = "documents")
public class Document {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "stage_id", nullable = false)
  @JsonBackReference(value = "stage-documents")
  private Stage stage;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description", nullable = false)
  private String description;

  @Lob
  @Column(name = "document", nullable = false)
  private byte[] document;

  public Document() {
  }

  public Document(Long id, Stage stage,String name, String description, byte[] document) {
    this.id = id;
    this.stage = stage;
    this.name = name;
    this.description = description;
    this.document = document;
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Stage getStage() {
    return stage;
  }

  public void setStage(Stage stage) {
    this.stage = stage;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public byte[] getDocument() {
    return document;
  }

  public void setDocument(byte[] document) {
    this.document = document;
  }

  @Override
  public String toString() {
    return "Document{" +
      "id=" + id +
      ", stage=" + stage +
      ", name=" + name +
      ", description='" + description + '\'' +
      '}';
  }
}
