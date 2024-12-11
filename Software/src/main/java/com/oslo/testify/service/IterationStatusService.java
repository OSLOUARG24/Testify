package com.oslo.testify.service;

import com.oslo.testify.entity.IterationStatus;
import com.oslo.testify.repository.IterationStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IterationStatusService {

    @Autowired
    private IterationStatusRepository iterationStatusRepository;

    public List<IterationStatus> getAllIterationStatus() {
        return iterationStatusRepository.findAll();
    }

    public List<IterationStatus> getIterationsByProjectId(Long id) {
        return iterationStatusRepository.findAllByProjectId(id);
    }

}

