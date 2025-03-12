package com.oslo.testify.controller;


import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.RoleAssigment;
import com.oslo.testify.service.RoleAssigmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class RoleAssigmentController {

    private final Logger log = LoggerFactory.getLogger(RoleAssigmentController.class);

    @Autowired
    private RoleAssigmentService roleAssigmentService;

    @GetMapping("/roleAssigments")
    public List<RoleAssigment> getAllRoles() {
      List<RoleAssigment> roles = roleAssigmentService.getAllRoles();
      log.debug(roles.toString());
      return roles;
    }

    @GetMapping("/roleAssigments/role/{id}")
    public List<RoleAssigment> getAllByRoleId(@PathVariable(value = "id", required = false) final  Long id) {
      List<RoleAssigment> roles = roleAssigmentService.getRolesAssigmentByRoleId(id);
      return roles;
    }

    @GetMapping("/roleAssigments/project/{id}")
    public List<RoleAssigment> getAllByProjectId(@PathVariable(value = "id", required = false) final  Long id) {
      List<RoleAssigment> roles = roleAssigmentService.getRolesAssigmentByProjectId(id);
      return roles;
    }

    @PostMapping("/roleAssigment")
    public RoleAssigment createRoleAssigment(@RequestBody RoleAssigment roleAssigment) {
        return roleAssigmentService.saveRoleAssigment(roleAssigment);
    }

    @GetMapping("/roleAssigment/{id}")
    public RoleAssigment getRoleAssigmentById(@PathVariable(value = "id", required = false) final  Long id) {
        return roleAssigmentService.getRoleAssigmentById(id);
    }

    @GetMapping("/roleAssigments/user/{id}")
    public List<RoleAssigment> getRoleAssigmentByUserId(@PathVariable(value = "id", required = false) final  Long id) {
        return roleAssigmentService.getRolesAssigmentsByUserId(id);
    }

    @GetMapping("/roleAssigments/roles")
    public List<RoleAssigment> getRoleAssigmentByUserIdAndProjectId( @RequestParam("email") String email,
                                                                     @RequestParam("pId") Long id) {
      return roleAssigmentService.getRolesAssigmentsByEmailAndProjectId(email,id);
    }

    @DeleteMapping("/roleAssigment/{id}")
    public void deleteRoleAssigment(@PathVariable(value = "id", required = false) final  Long id) {
      roleAssigmentService.deleteRoleAssigment(id);
    }

    @PutMapping("/roleAssigment/{id}")
    public ResponseEntity<RoleAssigment> updateRoleAssigment(@PathVariable(value = "id", required = false) final Long id,
    @RequestBody RoleAssigment roleAssigmentDetails) {

    // Buscamos el RoleAssigment existente
    RoleAssigment existingRoleAssigment = roleAssigmentService.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("RoleAssigment no encontrado con id: " + id));

    // Actualizamos los valores de los campos
    existingRoleAssigment.setUser(roleAssigmentDetails.getUser());
    existingRoleAssigment.setRole(roleAssigmentDetails.getRole());
    existingRoleAssigment.setProject(roleAssigmentDetails.getProject());

    // Guardamos la actualización
    RoleAssigment updatedRoleAssigment = roleAssigmentService.saveRoleAssigment(existingRoleAssigment);

    return ResponseEntity.ok(updatedRoleAssigment);
    }

    @GetMapping("/roleAssigments/permissions/user")
    public List<String> getPermissionsByUserId( @RequestParam("uId") Long idUser,
                                                @RequestParam("pId") Long idProject) {
      return roleAssigmentService.getPermissionsByUserIdAndProjectId(idUser,idProject);
    }
}
