package com.oslo.testify.entity;

public enum ProjectStatus {
  PENDIENTE("Pendiente"),
  EN_PROCESO("En Proceso"),
  FINALIZADO("Finalizado");

  private String description;

  ProjectStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return this.description;
  }

}
