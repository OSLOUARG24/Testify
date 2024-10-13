package com.oslo.testify;

import com.oslo.testify.entity.RoleAssigment;
import com.oslo.testify.entity.User;
import com.oslo.testify.repository.RoleAssigmentRepository;
import com.oslo.testify.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;
  private final RoleAssigmentRepository roleAssigmentRepository;

  public CustomUserDetailsService(UserRepository userRepository, RoleAssigmentRepository roleAssigmentRepository) {
    this.userRepository = userRepository;
    this.roleAssigmentRepository = roleAssigmentRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

    // Cargar los roles del usuario
    List<RoleAssigment> roleAssigments = roleAssigmentRepository.findAllByUserId(user.getId());
    List<GrantedAuthority> authorities = roleAssigments.stream()
      .map(ra -> new SimpleGrantedAuthority("ROLE_" + ra.getRole().getName()))
      .collect(Collectors.toList());

    return new org.springframework.security.core.userdetails.User(
      user.getEmail(),
      "", // No necesitas contraseña aquí si usas OAuth2
      authorities
    );
  }
}
