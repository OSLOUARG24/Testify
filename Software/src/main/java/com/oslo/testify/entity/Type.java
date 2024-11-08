package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "types")
public class Type {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column( name = "name")
  private String name;

  @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<SubType> subTypes = new ArrayList<>();

  // Getters and Setters

  public Type() {
  }

  public Type(Long id, String name, List<SubType> subTypes) {
    this.id = id;
    this.name = name;
    this.subTypes = subTypes;
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

  public List<SubType> getSubTypes() {
    return subTypes;
  }

  public void setSubTypes(List<SubType> subTypes) {
    this.subTypes = subTypes;
  }

  @Override
  public String toString() {
    return "Type{" +
      "id=" + id +
      ", name='" + name + '\'' +
      '}';
  }
}

