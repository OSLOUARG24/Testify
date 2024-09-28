package com.oslo.testify.controller;


import com.oslo.testify.entity.RoleAssigment;
import com.oslo.testify.service.RoleAssigmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.oslo.testify.entity.User;
import com.oslo.testify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private RoleAssigmentService roleAssigmentService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable(value = "id", required = false) final Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/user/email/{email}")
    public User getUserByEmail(@PathVariable(value = "email", required = false) final String email) {
       return userService.getUserByEmail(email);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id", required = false) final Long id, @RequestBody User userDetails) {
      log.debug("REST request to save User : {}", userDetails);
      User updatedUser = userService.updateUser(id, userDetails);
      return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable(value = "id", required = false) final  Long id) {
        userService.deleteUser(id);
    }

}
