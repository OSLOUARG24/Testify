package com.oslo.testify.repository;

import com.oslo.testify.entity.RoleAssigment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoleAssigmentRepository extends JpaRepository<RoleAssigment, Long> {
  List<RoleAssigment> findAllByUserId(Long id);

  List<RoleAssigment> findAllByRoleId(Long id);

  List<RoleAssigment> findAllByProjectId(Long id);

  @Query("SELECT ra FROM RoleAssigment ra JOIN User u ON ra.user.id = u.id  WHERE u.email = :email AND ra.project.id = :projectId")
  List<RoleAssigment> findAllByEmailAndProjectId(@Param("email") String email,@Param("projectId")  Long projectId);

  boolean existsByUserId(Long userId);

  boolean existsByRoleId(Long roleId);

  @Query(value = "(SELECT DISTINCT REPLACE(UPPER(p.name), ' ', '_') " +
  " FROM permissions p " +
  " WHERE (SELECT u.admin_flag FROM users u WHERE u.id = :userId) = true) " +
  "UNION " +
  "(SELECT DISTINCT REPLACE(UPPER(p.name), ' ', '_') " +
  " FROM permissions p " +
  " JOIN role_permissions rp ON p.id = rp.permission_id " +
  " JOIN roles r ON rp.role_id = r.id " +
  " JOIN role_assigments ra ON ra.role_id = r.id " +
  " WHERE ra.user_id = :userId AND ra.project_id = :projectId)",
nativeQuery = true)
  List<String> findPermissionsByUserIdAndProjectId(@Param("userId") Long idUser, @Param("projectId") Long idProject);

}
