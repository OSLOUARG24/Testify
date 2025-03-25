package com.oslo.testify.repository;

import com.oslo.testify.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

  boolean existsByName(String name);
}
