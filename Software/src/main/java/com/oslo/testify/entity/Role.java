package com.oslo.testify.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "roles")
public class Role{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "code")
  private String code;

  @Column(name = "name")
  private String name;

  public Role() {
  }

  public Role(Long id, String code, String name) {
    this.id = id;
    this.code = code;
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
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
      ",code='" + code +
      ", name='" + name +
      '}';
  }
}
