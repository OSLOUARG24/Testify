package com.oslo.testify.repository;

import com.oslo.testify.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User getUserByEmail(String email);
  Optional<User> findByEmail(String email);
  
  boolean existsByName(String name);
  
  boolean existsByEmail(String email);

  @Query("SELECT u FROM User u JOIN RoleAssigment ra ON ra.user.id = u.id JOIN Role r ON ra.role.id = r.id WHERE r.name = 'Tester' AND ra.project.id = :projectId")
  List<User> findUsersByRoleTesterAndProjectId(@Param("projectId") Long id);
}
