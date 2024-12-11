package com.oslo.testify.repository;

import com.oslo.testify.entity.ProjectApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectApprovalStatusRepository extends JpaRepository<ProjectApprovalStatus, Long> {

}
