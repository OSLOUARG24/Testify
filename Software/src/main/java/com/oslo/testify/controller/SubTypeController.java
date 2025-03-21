package com.oslo.testify.controller;


import com.oslo.testify.entity.SubType;
import com.oslo.testify.service.SubTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class SubTypeController {

    @Autowired
    private SubTypeService subTypeService;

    @GetMapping("/subTypes")
    public List<SubType> getAllSubTypes() {
      List<SubType> subTypes = subTypeService.getAllSubTypes();
      return subTypes;
    }



    @GetMapping("/subType/{id}")
    public SubType getSubTypeById(@PathVariable(value = "id", required = false) final  Long id) {
        return subTypeService.getSubTypeById(id);
    }

    @GetMapping("/subTypes/type/{id}")
    public List<SubType> getSubTypesByTypeId(@PathVariable(value = "id", required = false) final  Long id) {
      return subTypeService.getSubTypesByTypeId(id);
    }

    @PostMapping(value = "/subType", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createSubType(@RequestBody SubType subType) {
      try {
        subTypeService.saveSubType(subType);
        return ResponseEntity.ok(subType);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }

    @PutMapping("/subType/{id}")
    public ResponseEntity<?> updateSubType(@PathVariable(value = "id", required = false) final Long id, @RequestBody SubType subTypeDetails) {
      try {
        SubType updatedSubType = subTypeService.updateSubType(id, subTypeDetails);
        return ResponseEntity.ok(updatedSubType);
      } catch (RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
      }
    }
    
    @DeleteMapping("/subType/{id}")
    public ResponseEntity<?> deleteSubType(@PathVariable(value = "id", required = false) final Long id) throws Exception {
      try {
        subTypeService.deleteSubType(id);
          return ResponseEntity.ok("Subtipo eliminado correctamente.");
      } catch (RuntimeException ex) {
          return ResponseEntity.badRequest().body("Error al eliminar el subtipo: " + ex.getMessage());
      }
    }
  
}
