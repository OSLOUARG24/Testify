package com.oslo.testify.service;

import com.oslo.testify.entity.RolePermission;
import com.oslo.testify.repository.RolePermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class RolePermissionService {

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    public List<RolePermission> getAllRoles() {
        return rolePermissionRepository.findAll();
    }

    public RolePermission saveRolePermission(RolePermission rolePermission) {
      Long roleId = rolePermission.getRole().getId();
      Long permissionId = rolePermission.getPermission().getId();
  
      if (existsByRoleIdAndPermissionId(roleId, permissionId)) {
          throw new RuntimeException("Ya existe este permiso asignado para el rol.");
      }
      return rolePermissionRepository.save(rolePermission);
  }

    public RolePermission updateRolePermission(Long id, RolePermission updatedRolePermission) {
      RolePermission existingRolePermission = rolePermissionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Asignación Rol-Permiso no encontrado"));

      existingRolePermission.setRole(updatedRolePermission.getRole());
      existingRolePermission.setPermission(updatedRolePermission.getPermission());
      return rolePermissionRepository.save(existingRolePermission);
    }


    public RolePermission getRolePermissionById(Long id) {
        return rolePermissionRepository.findById(id).orElse(null);
    }

    public void deleteRolePermission(Long id) {
      rolePermissionRepository.deleteById(id);
    }

    public List<RolePermission> getRolesPermissionByRoleId(Long id) {
        return rolePermissionRepository.findAllByRoleId(id);
    }

    public Optional<RolePermission> findById(Long id) {
    return rolePermissionRepository.findById(id);
  }

  public boolean existsByRoleIdAndPermissionId(Long roleId, Long permissionId) {
    return rolePermissionRepository.existsByRoleIdAndPermissionId(roleId, permissionId);
}

}

