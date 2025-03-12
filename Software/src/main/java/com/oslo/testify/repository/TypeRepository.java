package com.oslo.testify.repository;

import com.oslo.testify.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

  boolean existsByName(String name);
  
  boolean existsByNameAndIdNot(String name, Long id);
}
