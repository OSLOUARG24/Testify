package com.oslo.testify.repository;

import com.oslo.testify.entity.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {

    List<RolePermission> findAllByRoleId(Long roleId);
    List<RolePermission> findAllByPermissionId(Long permissionId);
    List<RolePermission> findAllById(Long id);
    boolean existsByRoleIdAndPermissionId(Long roleId, Long permissionId);
}
