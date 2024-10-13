package com.oslo.testify.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "roles")
public class Role{

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  public Role() {
  }

  public Role(Long id, String name, Boolean status, List<RolePermission> permissions) {
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
    return "Role{" +
      "id=" + id +
      ", name='" + name + '\'' +
      '}';
  }
}
