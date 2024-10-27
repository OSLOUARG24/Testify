package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.SubType;
import com.oslo.testify.repository.SubTypeRepository;
import com.oslo.testify.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SubTypeService {

    @Autowired
    private SubTypeRepository subTypeRepository;

    public List<SubType> getAllSubTypes() {
        return subTypeRepository.findAll();
    }

    public SubType saveSubType(SubType subType) {
    	if (subTypeRepository.existsByName(subType.getName())) {
          throw new RuntimeException("Ya existe un subtipo con este nombre");
        }
        return subTypeRepository.save(subType);
    }

    public SubType getSubTypeById(Long id) {
        return subTypeRepository.findById(id).orElse(null);
    }

    public void deleteSubType(Long id) {
      subTypeRepository.deleteById(id);
    }

  @Transactional
  public SubType updateSubType(Long id, SubType subTypeDetails) {
    Optional<SubType> existingSubType = subTypeRepository.findById(id);

    if (existingSubType.isPresent()) {
      SubType subType = existingSubType.get();

      // Actualizar los campos del hito
      subType.setName(subTypeDetails.getName());

      // Guardar el hito actualizado
      return subTypeRepository.save(subType);
    } else {
      throw new ResourceNotFoundException("SubType not found with id: " + id);
    }
  }

  public List<SubType> getSubTypesByTypeId(Long id) {
      return subTypeRepository.findAllByTypeId(id);
  }
}

