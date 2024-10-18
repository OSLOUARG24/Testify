package com.oslo.testify.service;

import com.oslo.testify.entity.RoleAssigment;
import com.oslo.testify.repository.RoleAssigmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleAssigmentService {

    @Autowired
    private RoleAssigmentRepository roleAssigmentRepository;

    public List<RoleAssigment> getAllRoles() {
        return roleAssigmentRepository.findAll();
    }

    public RoleAssigment saveRoleAssigment(RoleAssigment roleAssigment) {
        return roleAssigmentRepository.save(roleAssigment);
    }

    public RoleAssigment getRoleAssigmentById(Long id) {
        return roleAssigmentRepository.findById(id).orElse(null);
    }

    public List<RoleAssigment> getRolesAssigmentsByUserId(Long id) {
      return roleAssigmentRepository.findAllByUserId(id);
    }

    public void deleteRoleAssigment(Long id) {
      roleAssigmentRepository.deleteById(id);
    }

  public List<RoleAssigment> getRolesAssigmentByRoleId(Long id) {
    return roleAssigmentRepository.findAllByRoleId(id);
  }

  public List<RoleAssigment> getRolesAssigmentByProjectId(Long id) {return roleAssigmentRepository.findAllByProjectId(id);
  }

  public List<RoleAssigment> getRolesAssigmentsByEmailAndProjectId(String email, Long idProject) {
      return roleAssigmentRepository.findAllByEmailAndProjectId(email,idProject);
  }

  public Optional<RoleAssigment> findById(Long id) {
    return roleAssigmentRepository.findById(id);
  }
}
