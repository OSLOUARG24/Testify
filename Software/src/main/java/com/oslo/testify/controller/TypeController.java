package com.oslo.testify.controller;


import com.oslo.testify.entity.Type;
import com.oslo.testify.service.TypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class TypeController {

    @Autowired
    private TypeService typeService;

    @GetMapping("/types")
    public List<Type> getAllTypes() {
      List<Type> types = typeService.getAllTypes();
      return types;
    }

    @GetMapping("/type/{id}")
    public Type getTypeById(@PathVariable(value = "id", required = false) final  Long id) {
        return typeService.getTypeById(id);
    }

    @PostMapping(value = "/type", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createType(@RequestBody Type type) {
      try {
        typeService.saveType(type);
        return ResponseEntity.ok(type);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }

    @PutMapping("/type/{id}")
    public ResponseEntity<?> updateType(@PathVariable(value = "id", required = false) final Long id, @RequestBody Type typeDetails) {
      try {
        Type updatedType = typeService.updateType(id, typeDetails);
        return ResponseEntity.ok(updatedType);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }

  @DeleteMapping("/type/{id}")
    public ResponseEntity<?> deleteType(@PathVariable(value = "id", required = false) final Long id) throws Exception {
      try {
        typeService.deleteType(id);
          return ResponseEntity.ok("Subtipo eliminado correctamente.");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar el subtipo: " + ex.getMessage());
      }
    }

}
