package com.oslo.testify.entity;

public enum StageStatus {
  PENDIENTE("Pendiente"),
  APROBADO("Aprobado"),
  ERROR("Con Errores"),
  FINALIZADO("Finalizado");

  private String description;

  StageStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return this.description;
  }

}
