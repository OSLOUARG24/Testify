package com.oslo.testify.service;

import com.oslo.testify.entity.Role;
import com.oslo.testify.repository.RoleAssigmentRepository;
import com.oslo.testify.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleAssigmentRepository roleAssigmentRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role saveRole(Role role) {
    	if (roleRepository.existsByName(role.getName())) {
         throw new RuntimeException("Ya existe un Rol con este nombre");
        }
        return roleRepository.save(role);
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public Role updateRole(Long id, Role updatedRole) {
      Role existingRole = roleRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
      existingRole.setCode(updatedRole.getCode());
      existingRole.setName(updatedRole.getName());
      return roleRepository.save(existingRole);
    }

    public Role createRole(Role role) {
      return roleRepository.save(role);
    }

    public void deleteRole(Long id) throws Exception  {
      boolean isAssigned = roleAssigmentRepository.existsByRoleId(id);
      if (isAssigned) {
        throw new Exception("No se puede eliminar el rol porque está asignado a un usuario.");
      }
      roleRepository.deleteById(id);
    }

}
