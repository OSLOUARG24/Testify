package com.oslo.testify.service;

import com.oslo.testify.entity.CategoryStatus;
import com.oslo.testify.repository.CategoryStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryStatusService {

    @Autowired
    private CategoryStatusRepository categoryStatusRepository;

    public List<CategoryStatus> getAllCategoryStatus() {
        return categoryStatusRepository.findAll();
    }

    public List<CategoryStatus> getCategoriesByProjectId(Long id) {
        return categoryStatusRepository.findAllByProjectId(id);
    }

}

