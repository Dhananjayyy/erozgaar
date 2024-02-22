DELIMITER //
CREATE TRIGGER worker_availability
AFTER INSERT ON job_allocation 
FOR EACH ROW
BEGIN
    UPDATE workers
    SET available = FALSE
    WHERE worker_id = NEW.worker_id;

    UPDATE jobs
    SET job_status = 2
    WHERE job_id = NEW.job_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_ongoing_user_status
AFTER UPDATE ON job_allocation
FOR EACH ROW
BEGIN
    IF NEW.status = 2 AND OLD.status = 0 THEN
        UPDATE workers w
        JOIN job_allocation ja ON w.worker_id = ja.worker_id
        SET w.available = TRUE
        WHERE ja.job_id = NEW.job_id AND w.worker_id = NEW.worker_id;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_completed_user_status
AFTER UPDATE ON jobs
FOR EACH ROW
BEGIN
    IF NEW.job_status = 4 AND OLD.job_status = 3 THEN
        UPDATE workers w
        JOIN job_allocation ja ON w.worker_id = ja.worker_id
        SET w.available = TRUE
        WHERE ja.job_id = NEW.job_id;
    END IF;
END //
DELIMITER ;
