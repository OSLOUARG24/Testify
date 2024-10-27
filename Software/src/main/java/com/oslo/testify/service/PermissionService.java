package com.oslo.testify.service;

import com.oslo.testify.entity.Permission;
import com.oslo.testify.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission savePermission(Permission permission) {
    	if (permissionRepository.existsByName(permission.getName())) {
          throw new RuntimeException("Ya existe un permiso con este nombre");
        }
        return permissionRepository.save(permission);
    }

    public Permission getPermissionById(Long id) {
        return permissionRepository.findById(id).orElse(null);
    }

    public Permission updatePermission(Long id, Permission updatedPermission) {
      Permission existingPermission = permissionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Permiso no encontrado"));

      existingPermission.setName(updatedPermission.getName());
      return permissionRepository.save(existingPermission);
    }

    public void deletePermission(Long id) {
      permissionRepository.deleteById(id);
    }
}
