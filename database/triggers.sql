DELIMITER //
CREATE TRIGGER worker_availability
AFTER INSERT ON job_allocation
FOR EACH ROW
BEGIN
    UPDATE workers
    SET available = FALSE
    WHERE worker_id = NEW.worker_id;
    UPDATE jobs SET job_status = 2 WHERE job_id = NEW.job_id;
END //
DELIMITER ;
