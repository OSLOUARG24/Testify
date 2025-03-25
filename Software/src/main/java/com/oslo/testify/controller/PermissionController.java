package com.oslo.testify.controller;


import com.oslo.testify.entity.Permission;
import com.oslo.testify.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping("/permission")
    public List<Permission> getAllPermissions() {
        return permissionService.getAllPermissions();
    }

    @PostMapping("/permission")
    public Permission createPermission(@RequestBody Permission permission) {
        return permissionService.savePermission(permission);
    }

    @GetMapping("/permission/{id}")
    public Permission getPermissionById(@PathVariable(value = "id", required = false) final Long id) {
        return permissionService.getPermissionById(id);
    }

    @PutMapping("/permission/{id}")
    public ResponseEntity<Permission> updatePermission(@PathVariable(value = "id", required = false) final Long id, @RequestBody Permission permission) {
      return ResponseEntity.ok(permissionService.updatePermission(id, permission));
    }


  @DeleteMapping("/permission/{id}")
    public ResponseEntity<?> deletePermission(@PathVariable(value = "id", required = false) final Long id) {
      try {
        permissionService.deletePermission(id);
          return ResponseEntity.ok("Permiso eliminado correctamente.");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar el permiso: " + ex.getMessage());
      }
    }


}
