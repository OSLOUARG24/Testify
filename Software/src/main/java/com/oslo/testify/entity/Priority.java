package com.oslo.testify.entity;

public enum Priority {
  BAJO("Bajo"),
  MEDIO("Medio"),
  ALTO("Alto"),
  URGENTE("Urgente");

  private String description;

  Priority(String description) {
    this.description = description;
  }

  public String getDescription() {
    return this.description;
  }

}
