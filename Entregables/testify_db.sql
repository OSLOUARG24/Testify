use testify;

DROP TABLE category_status_v;

CREATE OR REPLACE VIEW `testify`.`category_status_v` AS 
<<<<<<< Updated upstream
select md5(concat(`cat`.`id`,'_',coalesce(`st`.`status`,'NO_STATUS'),'_',`cat`.`name`)) AS `id`
,`pr`.`id` AS `project_id`,`pr`.`name` AS `project_name`
,`cat`.`name` AS `category_name`
,coalesce(round(((sum((case when (`st`.`status` = 'PENDIENTE') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `pending_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'ERROR') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `error_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'APROBADO') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `approved_quantity` 
from `testify`.`iterations` `it` 
left join `testify`.`stages` `st` on `it`.`id` = `st`.`iteration_id`
join `testify`.`projects` `pr` on`pr`.`id` = `it`.`project_id`
join categories cat on st.category_id = cat.id
where ((`st`.`previous_stage_id` is null) or ((`st`.`previous_stage_id` is not null) and (`st`.`status` = 'APROBADO'))) 
group by md5(concat(`cat`.`id`,'_',coalesce(`st`.`status`,'NO_STATUS'),'_',`cat`.`name`))
,`pr`.`id`,`pr`.`name`
,`cat`.`name`
order by 3,1;
=======
SELECT md5(concat(`cat`.`id`,'_',`cat`.`name`)) AS `id`
, `pr`.`id` AS `project_id`, `pr`.`name` AS `project_name`
, `cat`.`name` AS `category_name`
, coalesce(round(((sum((CASE WHEN (`st`.`status` = 'PENDIENTE') THEN 1 ELSE 0 END)) * 100.0) / NULLIF(COUNT(`st`.`id`),0)),2),0) AS `pending_quantity`
, coalesce(round(((sum((CASE WHEN (`st`.`status` = 'ERROR') THEN 1 ELSE 0 END)) * 100.0) / NULLIF(COUNT(`st`.`id`),0)),2),0) AS `error_quantity`
, coalesce(round(((sum((CASE WHEN (`st`.`status` = 'APROBADO') THEN 1 ELSE 0 END)) * 100.0) / NULLIF(COUNT(`st`.`id`),0)),2),0) AS `approved_quantity` 
FROM `testify`.`iterations` `it` 
LEFT JOIN `testify`.`stages` `st` ON `it`.`id` = `st`.`iteration_id`
JOIN `testify`.`projects` `pr` ON `pr`.`id` = `it`.`project_id`
JOIN `categories` `cat` ON `st`.`category_id` = `cat`.`id`
WHERE ((`st`.`previous_stage_id` IS NULL) OR ((`st`.`previous_stage_id` IS NOT NULL) AND (`st`.`status` = 'APROBADO'))) 
GROUP BY `cat`.`id`, `cat`.`name`, `pr`.`id`, `pr`.`name`
ORDER BY `pr`.`name`, `cat`.`name`;
>>>>>>> Stashed changes

DROP TABLE iteration_status_v;

CREATE OR REPLACE VIEW `testify`.`iteration_status_v` AS 
select concat(`it`.`id`,'_',coalesce(`st`.`status`,'NO_STATUS')) AS `id`
,`pr`.`id` AS `project_id`
,`pr`.`name` AS `project_name`
,`it`.`name` AS `iteration_name`
,coalesce(round(((sum((case when (`st`.`status` = 'PENDIENTE') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `pending_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'ERROR') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `error_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'APROBADO') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `approved_quantity` 
from ((`testify`.`iterations` `it` left join `testify`.`stages` `st` on((`it`.`id` = `st`.`iteration_id`))) 
join `testify`.`projects` `pr` on((`pr`.`id` = `it`.`project_id`)))
where ((`st`.`previous_stage_id` is null) or ((`st`.`previous_stage_id` is not null) and (`st`.`status` = 'APROBADO'))) 
group by `it`.`id`,`it`.`name` order by `pr`.`name`,`it`.`id`;


DROP TABLE project_approval_status;

CREATE  VIEW `testify`.`project_approval_status` 
AS select `p`.`id` AS `id`,coalesce(round(((sum((case when (`st`.`status` = 'APROBADO') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `approval_percentage` 
from ((`testify`.`projects` `p` left join `testify`.`iterations` `it` on((`p`.`id` = `it`.`project_id`))) 
left join `testify`.`stages` `st` on((`it`.`id` = `st`.`iteration_id`))) 
where ((`st`.`previous_stage_id` is null) or ((`st`.`previous_stage_id` is not null) and (`st`.`status` = 'APROBADO'))) group by `p`.`id`;

INSERT INTO users VALUES (1,'osofia@uarg.unpa.edu.ar',1,'Albert');

INSERT INTO `roles` VALUES (1,'GESTOR','Gestor de Pruebas'),(2,'TESTER','Tester'),(3,'GUEST','Invitado');

<<<<<<< Updated upstream
INSERT INTO `permissions` VALUES (22,'Usuarios'),(23,'Roles'),(24,'Permisos'),(25,'Tipos'),(26,'Subtipos'),(27,'Categorias'),(28,'Consultar Proyectos'),(29,'Consultar Iteraciones'),(30,'Modificar Iteraciones'),(31,'Eliminar Iteraciones'),(32,'Modificar Proyectos'),(33,'Eliminar Proyectos'),(34,'Exportar Proyectos'),(35,'Consultar Escenarios'),(36,'Modificar Escenarios'),(37,'Eliminar Escenarios'),(38,'Realizar Pruebas'),(39,'Crear Iteraciones'),(40,'Crear Proyectos'),(41,'Crear Escenarios'),(42,'Exportar Escenarios');

INSERT INTO `role_permissions` VALUES (6,28,1),(20,28,3),(21,29,1),(22,35,1),(23,36,1),(24,37,1),(25,41,1),(26,42,1),(27,38,2),(28,29,3),(29,35,3),(30,34,1),(31,22,2),(33,24,2),(34,36,2);
=======
INSERT INTO `permissions` VALUES (22,'Usuarios'),(23,'Roles'),(24,'Permisos'),(25,'Tipos'),(26,'Subtipos'),(27,'Categorias'),(28,'Consultar Proyectos'),(29,'Consultar Iteraciones'),(30,'Modificar Iteraciones'),(31,'Eliminar Iteraciones'),(32,'Modificar Proyectos'),(33,'Eliminar Proyectos'),(34,'Exportar Proyectos'),(35,'Consultar Escenarios'),(36,'Modificar Escenarios'),(37,'Eliminar Escenarios'),(38,'Realizar Pruebas'),(39,'Crear Iteraciones'),(40,'Crear Proyectos'),(41,'Crear Escenarios'),(42,'Exportar Escenarios'),(43,'Copiar Escenarios');

INSERT INTO `role_permissions` VALUES (6,28,1),(20,28,3),(21,29,1),(22,35,1),(23,36,1),(24,37,1),(25,41,1),(26,42,1),(27,38,2),(28,29,3),(29,35,3),(30,34,1),(31,22,2),(33,24,2),(34,36,2),(36,43,1);
>>>>>>> Stashed changes

INSERT INTO `types` VALUES (21,'Prueba Funcional'),(22,'Prueba de Integración'),(23,'Prueba de Regresión'),(24,'Prueba de Usabilidad'),(25,'Prueba de Seguridad'),(26,'Prueba de Compatibilidad'),(27,'Prueba de mantenimiento'),(28,'Prueba de Rendimiento'),(29,'Revisión Documento Clave'),(30,'Revisión documentos soporte'),(31,'Revisión Tecnica Formal (RTF)'),(32,'Pruebas de Calidad de Contenido');

INSERT INTO `subtypes` VALUES (22,'Caja Negra',21),(23,'Caja Blanca',21),(24,'Valores Limites',21),(25,'Unitarias',21),(26,'Interfaz',22),(27,'Componentes',22),(28,'Flujo de Datos',22),(29,'API',22),(30,'Base de Datos',22),(31,'Código',22),(32,'De Repetición',23),(33,'Humo',23),(34,'Cobertura de Código',23),(35,'Accesibilidad',24),(36,'Escenarios',24),(37,'Heuristicas',24),(38,'De División A/B',24),(39,'Caja Gris',25),(40,'Autenticación',25),(41,'Manejo de datos sensibles',25),(42,'Portabilidad',26),(43,'Configuración',26),(44,'Visualización',26),(45,'Impacto',27),(46,'Modificabilidad',27),(47,'Refactorización',27),(48,'Volumen',28),(49,'Concurrencia',28),(50,'Estabilidad',28),(51,'Carga',28),(52,'Estrés',28),(53,'Escalabilidad',28),(61,'Ortográfico',30),(62,'Estándar OSLO',30),(63,'Gestión de configuración',30),(64,'Revisión Rutinaria',30),(65,'Descripción poco funcional/claro',29),(66,'Falta de Requerimiento Funcional',29),(67,' Falta de Requerimiento No Funcional',29),(68,'Verificabilidad',29),(69,'Trazabilidad',29),(70,'Índice',29),(71,'Estándar definido por el equipo de desarrollo ',29),(72,'Sin anexo del MCU',29),(73,'Inconsistencia Caso de Uso-Requerimiento Funcional',29),(74,'Ambigüedad',29),(75,'Actor No Identificado',29),(76,'Caso de Uso no identificado',29),(77,'Criterio de aceptación',29),(78,'Modelo MVC',29),(79,'Inconsistencia diagramas UML',29),(80,'Seguridad',29),(81,'Inconsistencia Modularidad',29),(82,'Inconsistencia de estándar',29),(83,'No es flexible',29),(84,'Poca Cobertura',29),(85,'Exceso de Cobertura',29),(86,'No alineado con Especificación',29),(87,'No alineado con MCU',29),(88,'No alineado con diagrama de secuencia',29),(89,'Pruebas no diversificadas',29),(90,'No se prioriza escenario crítico',29),(91,'Riesgo no identificado',29),(92,'No existe contingencia',29),(93,'No existe Mitigación',29),(94,'No existe reevaluación',29),(95,'Estructura poco intuitiva',29),(96,'Falta escenario',29),(97,'Falta Flujo de trabajo',29),(98,'Pruebas de aceptación de usuario (UAT)',29),(99,'Rutinaria',29),(100,'Checklist',29),(101,'Estándar',29),(106,'RTF Documentos claves',31),(107,'RTF Planificada',31),(108,'RTF Rutinaria',31),(109,'RTF Software',31),(110,'Revisión manual de contenido',32),(111,'Revisión ortográfica y gramatical',32),(112,'Revisión de coherencia y consistencia',32),(113,'Pruebas de legibilidad y comprensión',32),(114,'Validación de cumplimiento normativo',32);
