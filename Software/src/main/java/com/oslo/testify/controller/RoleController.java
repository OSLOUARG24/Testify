package com.oslo.testify.controller;


import com.oslo.testify.entity.Role;
import com.oslo.testify.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class RoleController {

    private final Logger log = LoggerFactory.getLogger(RoleController.class);

    @Autowired
    private RoleService roleService;

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
      List<Role> roles = roleService.getAllRoles();
      log.debug(roles.toString());
      return roles;
    }

    @PostMapping("/role")
    public ResponseEntity<?> createRole(@RequestBody Role role) {
      try {
        roleService.saveRole(role);
        return ResponseEntity.ok(role);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }

    @GetMapping("/role/{id}")
    public Role getRoleById(@PathVariable(value = "id", required = false) final  Long id) {
        return roleService.getRoleById(id);
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable(value = "id", required = false) final Long id, @RequestBody Role role) {
       return ResponseEntity.ok(roleService.updateRole(id, role));
    }


    @DeleteMapping("/role/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable(value = "id", required = false) final Long id) throws Exception {
      try {
        roleService.deleteRole(id);
          return ResponseEntity.ok("Rol eliminado correctamente.");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar el rol: " + ex.getMessage());
      }
    }
}
