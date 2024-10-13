package com.oslo.testify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "role_permissions")
public class RolePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "permission_id", referencedColumnName = "id")
    private Permission permission;

    // Getters and Setters


  public RolePermission() {
  }

  public RolePermission(Long id, Role role, Permission permission) {
    this.id = id;
    this.role = role;
    this.permission = permission;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public Permission getPermission() {
    return permission;
  }

  public void setPermission(Permission permission) {
    this.permission = permission;
  }

  @Override
  public String toString() {
    return "RolePermissions{" +
      "id=" + id +
      ", role=" + role +
      ", permission=" + permission +
      '}';
  }
}
