create index idx_users_company_id on users using hash(company_id);
create index idx_tasks_company_id on tasks using hash(company_id);
create index idx_tasks_parent_id on tasks using hash(parent_id);
create index idx_user_tasks_user_id on user_tasks using hash(user_id);
create index idx_user_tasks_task_id on user_tasks using hash(task_id);
