package com.oslo.testify.repository;

import com.oslo.testify.entity.SubType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubTypeRepository extends JpaRepository<SubType, Long> {
  }
