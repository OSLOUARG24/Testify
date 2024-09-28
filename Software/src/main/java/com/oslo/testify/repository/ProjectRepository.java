package com.oslo.testify.repository;

import com.oslo.testify.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

  @Query("SELECT DISTINCT p FROM Project p " +
    "JOIN RoleAssigment ra ON p.id = ra.project.id " +
    "JOIN User u ON u.id = ra.user.id " +
    "WHERE u.email = :email")
  List<Project> findDistinctProjectsByUserEmail(@Param("email") String email);

}
