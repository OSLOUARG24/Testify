package com.oslo.testify.repository;

import com.oslo.testify.entity.RoleAssigment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoleAssigmentRepository extends JpaRepository<RoleAssigment, Long> {
  List<RoleAssigment> findAllByUserId(Long id);

  List<RoleAssigment> findAllByRoleId(Long id);

  List<RoleAssigment> findAllByProjectId(Long id);

  List<RoleAssigment> findAllByUserIdAndProjectId(Long idUser, Long idProject);

  boolean existsByUserId(Long userId);

  boolean existsByRoleId(Long roleId);
}
