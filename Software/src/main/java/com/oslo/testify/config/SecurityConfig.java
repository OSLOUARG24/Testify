package com.oslo.testify.config;

import com.oslo.testify.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  private final CustomUserDetailsService customUserDetailsService;

  public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
    this.customUserDetailsService = customUserDetailsService;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf((csrf) -> csrf.disable())  // Deshabilitar CSRF para desarrollo, se puede ajustar más adelante
      .authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/", "/login", "/oauth2/**", "/public/**","/api/**","/swagger-ui.html","/swagger-ui/**", "/v3/api-docs/**").permitAll()  // Rutas públicas
        .anyRequest().authenticated()  // Otras rutas requieren autenticación
      )
      .userDetailsService(customUserDetailsService);  // Usar el servicio de UserDetails personalizado

    return http.build();
  }
}
