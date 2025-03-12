package com.oslo.testify.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role_assigments")
public class RoleAssigment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    // Getters and Setters


  public RoleAssigment() {
  }

  public RoleAssigment(Long id, User user, Role role, Project project) {
    this.id = id;
    this.user = user;
    this.role = role;
    this.project = project;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public Project getProject() {
    return project;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  @Override
  public String toString() {
    return "RoleAssigment{" +
      "id=" + id +
      ", user=" + user +
      ", role=" + role +
      ", project=" + project +
      '}';
  }
}
