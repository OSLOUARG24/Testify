package com.oslo.testify.repository;

import com.oslo.testify.entity.SubType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubTypeRepository extends JpaRepository<SubType, Long> {
    List<SubType> findAllByTypeId(Long id);
}
