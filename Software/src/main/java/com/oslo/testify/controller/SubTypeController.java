package com.oslo.testify.controller;


import com.oslo.testify.entity.SubType;
import com.oslo.testify.service.SubTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite peticiones desde Angular
public class SubTypeController {

    private final Logger log = LoggerFactory.getLogger(SubTypeController.class);

    @Autowired
    private SubTypeService subTypeService;

    @GetMapping("/subTypes")
    public List<SubType> getAllSubTypes() {
      List<SubType> subTypes = subTypeService.getAllSubTypes();
      return subTypes;
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

    @GetMapping("/subType/{id}")
    public SubType getSubTypeById(@PathVariable(value = "id", required = false) final  Long id) {
        return subTypeService.getSubTypeById(id);
    }

    @GetMapping("/subTypes/type/{id}")
    public List<SubType> getSubTypesByTypeId(@PathVariable(value = "id", required = false) final  Long id) {
      return subTypeService.getSubTypesByTypeId(id);
    }

    @DeleteMapping("/subType/{id}")
    public void deleteSubType(@PathVariable(value = "id", required = false) final  Long id) {
      subTypeService.deleteSubType(id);
    }

    @PutMapping("/subType/{id}")
    public ResponseEntity<SubType> updateSubType(@PathVariable(value = "id", required = false) final Long id, @RequestBody SubType subTypeDetails) {
        SubType updatedSubType = subTypeService.updateSubType(id, subTypeDetails);
        return ResponseEntity.ok(updatedSubType);
    }
}
