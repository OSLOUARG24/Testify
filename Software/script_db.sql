CREATE USER 'testify'@'localhost' IDENTIFIED BY 'testify'
/
GRANT ALL PRIVILEGES ON testify.* TO 'testify'@'localhost'
/
CREATE  OR REPLACE VIEW `testify`.`project_approval_status` 
AS select `p`.`id` AS `id`,coalesce(round(((sum((case when (`st`.`status` = 'APROBADO') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `approval_percentage` 
from ((`testify`.`projects` `p` left join `testify`.`iterations` `it` on((`p`.`id` = `it`.`project_id`))) 
left join `testify`.`stages` `st` on((`it`.`id` = `st`.`iteration_id`))) 
where ((`st`.`previous_stage_id` is null) or ((`st`.`previous_stage_id` is not null) and (`st`.`status` = 'APROBADO'))) group by `p`.`id`
/
CREATE OR REPLACE VIEW `testify`.`iteration_status_v` AS 
select concat(`it`.`id`,'_',coalesce(`st`.`status`,'NO_STATUS')) AS `id`,`pr`.`id` AS `project_id`,`pr`.`name` AS `project_name`
,`it`.`name` AS `iteration_name`
,coalesce(round(((sum((case when (`st`.`status` = 'PENDIENTE') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `pending_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'ERROR') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `error_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'APROBADO') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `approved_quantity` 
from ((`testify`.`iterations` `it` left join `testify`.`stages` `st` on((`it`.`id` = `st`.`iteration_id`))) 
join `testify`.`projects` `pr` on((`pr`.`id` = `it`.`project_id`))) 
where ((`st`.`previous_stage_id` is null) or ((`st`.`previous_stage_id` is not null) and (`st`.`status` = 'APROBADO'))) 
group by `it`.`id`,`it`.`name` order by `pr`.`name`,`it`.`id`
/
CREATE OR REPLACE VIEW `testify`.`category_status_v` AS 
select md5(concat(it.id, '_', coalesce(st.status, 'NO_STATUS'), '_', cat.name)) AS `id`,`pr`.`id` AS `project_id`,`pr`.`name` AS `project_name`
,`cat`.`name` AS `category_name`
,coalesce(round(((sum((case when (`st`.`status` = 'PENDIENTE') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `pending_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'ERROR') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `error_quantity`
,coalesce(round(((sum((case when (`st`.`status` = 'APROBADO') then 1 else 0 end)) * 100.0) / nullif(count(`st`.`id`),0)),2),0) AS `approved_quantity` 
from ((`testify`.`iterations` `it` 
left join `testify`.`stages` `st` on((`it`.`id` = `st`.`iteration_id`))) 
join `testify`.`projects` `pr` on((`pr`.`id` = `it`.`project_id`))) 
join categories cat on (st.category_id = cat.id)
where ((`st`.`previous_stage_id` is null) or ((`st`.`previous_stage_id` is not null) and (`st`.`status` = 'APROBADO'))) 
group by `it`.`id`,`cat`.`name` 
order by `pr`.`name`,`cat`.`id`
/