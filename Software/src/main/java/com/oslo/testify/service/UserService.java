package com.oslo.testify.service;

import com.oslo.testify.entity.User;
import com.oslo.testify.repository.RoleAssigmentRepository;
import com.oslo.testify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleAssigmentRepository roleAssignmentRepository;

    public UserService(UserRepository userRepository, RoleAssigmentRepository roleAssignmentRepository) {
      this.userRepository = userRepository;
      this.roleAssignmentRepository = roleAssignmentRepository;
    }

    public List<User> getTestersByProjectId(Long id) {
      return userRepository.findUsersByRoleTesterAndProjectId(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
    	if (userRepository.existsByName(user.getName())) {
         throw new RuntimeException("Ya existe un usuario con este nombre");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
         throw new RuntimeException("Ya existe un usuario con este email");
        }
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {

      boolean hasRoleAssignments  = roleAssignmentRepository.existsByUserId(id);

      if (hasRoleAssignments) {
        throw new RuntimeException("El usuario no puede ser eliminado porque está asociado a uno o más proyectos");
      }

      userRepository.deleteById(id);
    }

    public User getUserByEmail(String email) {
      return  userRepository.getUserByEmail(email);
    }

  public User updateUser(Long id, User updatedUser) {
    // Verificar si el usuario existe en la base de datos
    Optional<User> existingUserOptional = userRepository.findById(id);

    if (existingUserOptional.isPresent()) {
      User existingUser = existingUserOptional.get();

      // Actualizar los campos del usuario existente
      existingUser.setName(updatedUser.getName());
      existingUser.setEmail(updatedUser.getEmail());

      // Guardar el usuario actualizado en la base de datos
      return userRepository.save(existingUser);
    } else {
      throw new RuntimeException("Usuario no encontrado con id: " + id);
    }
  }
}
