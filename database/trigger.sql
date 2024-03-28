-- audit_companies trigger function
-- INSERT
CREATE or replace FUNCTION audit_companies_tg_inser_fn() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   insert into audit_companies(id, name, status)
   values(NEW.id, NEW.name, 'INSERT');
   RETURN NEW;
END;
$$;

-- UPDATE
CREATE or replace FUNCTION audit_companies_tg_update_fn() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   insert into audit_companies(id, name, status)
   values(OLD.id, OLD.name, 'UPDATE');
   RETURN OLD;
END;
$$;

-- DELETE
CREATE or replace FUNCTION audit_companies_tg_delete_fn() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   insert into audit_companies(id, name, status)
   values(OLD.id, OLD.name, 'DELETE');
   RETURN OLD;
END;
$$;

-- audit_companies trigger
-- INSERT
CREATE TRIGGER audit_companies_trigger_insert 
   AFTER INSERT
   ON companies
   FOR EACH ROW
    EXECUTE PROCEDURE audit_companies_tg_inser_fn();

-- UPDATE
CREATE TRIGGER audit_companies_trigger_update
   AFTER UPDATE
   ON companies
   FOR EACH ROW
   EXECUTE PROCEDURE audit_companies_tg_update_fn();

-- DELETE
CREATE TRIGGER audit_companies_trigger_delete
   AFTER DELETE
   ON companies
   FOR EACH ROW
   EXECUTE PROCEDURE audit_companies_tg_delete_fn();






-- audit_users trigger function
-- INSERT
CREATE or replace FUNCTION audit_users_tg_insert_fn() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   insert into audit_users(id, login, password, role, full_name, company_id, status)
   values(NEW.id, NEW.login, NEW.password, NEW.role, NEW.full_name, NEW.company_id, 'INSERT');
   RETURN NEW;
END;
$$;

-- UPDATE
CREATE or replace FUNCTION audit_users_tg_update_fn() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   insert into audit_users(id, login, password, role, full_name, company_id, status)
   values(OLD.id, OLD.login, OLD.password, OLD.role, OLD.full_name, OLD.company_id, 'UPDATE');
   RETURN OLD;
END;
$$;

-- DELETE
CREATE or replace FUNCTION audit_users_tg_delete_fn() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   insert into audit_users(id, login, password, role, full_name, company_id, status)
   values(OLD.id, OLD.login, OLD.password, OLD.role, OLD.full_name, OLD.company_id, 'DELETE');
   RETURN OLD;
END;
$$;

-- audit_users trigger
-- INSERT
CREATE TRIGGER audit_users_trigger_insert 
   AFTER INSERT
   ON users
   FOR EACH ROW
    EXECUTE PROCEDURE audit_users_tg_insert_fn();

-- UPDATE
CREATE TRIGGER audit_users_trigger_update
   AFTER UPDATE
   ON users
   FOR EACH ROW
   EXECUTE PROCEDURE audit_users_tg_update_fn();

-- DELETE
CREATE TRIGGER audit_users_trigger_delete
   AFTER DELETE
   ON users
   FOR EACH ROW
   EXECUTE PROCEDURE audit_users_tg_delete_fn();