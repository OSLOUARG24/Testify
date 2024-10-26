package com.oslo.testify.entity;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column( name = "name")
    private String name;

    @Column( name = "email")
    private String email;

    @Column( name = "admin_flag")
    private Boolean isAdmin;

    public User(Long id, String name, String email, Boolean isAdmin) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.isAdmin = isAdmin;
    }

    // Getters and Setters

    public User(){}

    public User(Long id, String name, String email, List<RoleAssigment> roles) {
      this.id = id;
      this.name = name;
      this.email = email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

  public Boolean getAdmin() {
    return isAdmin;
  }

  public void setAdmin(Boolean admin) {
    isAdmin = admin;
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", email='" + email + '\'' +
      ", isAdmin=" + isAdmin +
      '}';
  }
}
