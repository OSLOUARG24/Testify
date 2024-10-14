package com.oslo.testify.service;

import com.oslo.testify.ResourceNotFoundException;
import com.oslo.testify.entity.Type;
import com.oslo.testify.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    public List<Type> getAllTypes() {
        return typeRepository.findAll();
    }

    public Type saveType(Type type) {
        return typeRepository.save(type);
    }

    public Type getTypeById(Long id) {
        return typeRepository.findById(id).orElse(null);
    }

    public void deleteType(Long id) {
      typeRepository.deleteById(id);
    }

  @Transactional
  public Type updateType(Long id, Type typeDetails) {
    Optional<Type> existingType = typeRepository.findById(id);

    if (existingType.isPresent()) {
      Type type = existingType.get();

      // Actualizar los campos del hito
      type.setName(typeDetails.getName());

      // Guardar el hito actualizado
      return typeRepository.save(type);
    } else {
      throw new ResourceNotFoundException("Type not found with id: " + id);
    }
  }

}

