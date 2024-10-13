package com.oslo.testify.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permission{

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  public Permission() {
  }

  public Permission(Long id, String name, Boolean status) {
    this.id = id;
    this.name = name;
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

  @Override
  public String toString() {
    return "Permission{" +
      "id=" + id +
      ", name='" + name + '\'' +
      '}';
  }
}
