package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.Role;
import com.oslo.testify.entity.RolePermission;
import com.oslo.testify.repository.RolePermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
        return rolePermissionRepository.save(rolePermission);
    }

    public RolePermission updateRolePermission(Long id, RolePermission updatedRolePermission) {
      RolePermission existingRolePermission = rolePermissionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Asignacion Rol-Permiso no encontrado"));

      existingRolePermission.setRole(existingRolePermission.getRole());
      existingRolePermission.setPermission(existingRolePermission.getPermission());
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

}

