package com.oslo.testify.controller;



import com.oslo.testify.entity.RolePermission;
import com.oslo.testify.service.RolePermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class RolePermissionController {

    private final Logger log = LoggerFactory.getLogger(RolePermissionController.class);

    @Autowired
    private RolePermissionService rolePermissionService;

    @GetMapping("/rolePermissions")
    public List<RolePermission> getAllRoles() {
      List<RolePermission> roles = rolePermissionService.getAllRoles();
      log.debug(roles.toString());
      return roles;
    }

    @GetMapping("/rolePermissions/role/{id}")
    public List<RolePermission> getAllByRoleId(@PathVariable(value = "id", required = false) final  Long id) {
      List<RolePermission> roles = rolePermissionService.getRolesPermissionByRoleId(id);
      return roles;
  }

    @PostMapping("/rolePermission")
    public RolePermission createRole(@RequestBody RolePermission rolePermission) {
        return rolePermissionService.saveRolePermission(rolePermission);
    }

    @GetMapping("/rolePermission/{id}")
    public RolePermission getRolePermissionById(@PathVariable(value = "id", required = false) final  Long id) {
        return rolePermissionService.getRolePermissionById(id);
    }

    @DeleteMapping("/rolePermission/{id}")
    public ResponseEntity<?> deleteRolePermission(@PathVariable(value = "id", required = false) final Long id) throws Exception {
      try {
        rolePermissionService.deleteRolePermission(id);
          return ResponseEntity.ok("Permiso asignado eliminado correctamente.");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar el permiso asignado: " + ex.getMessage());
      }
    }

  @PutMapping("/rolePermission/{id}")
  public ResponseEntity<RolePermission> updateRolePermission(@PathVariable(value = "id", required = false) final Long id,
                                                             @RequestBody RolePermission rolePermissionDetails) {
    return ResponseEntity.ok(rolePermissionService.updateRolePermission(id, rolePermissionDetails));
  }
}
