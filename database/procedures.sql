-- stored procedures
DELIMITER //
CREATE PROCEDURE UpdateRejectionJobStatus(IN jobId INT)
BEGIN
    UPDATE job_allocation
    SET status = 2
    WHERE job_id = jobId AND status = 0;

    UPDATE jobs
    SET job_status = 3
    WHERE job_id = jobId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateCompletionJobStatus(IN jobId INT)
BEGIN
    UPDATE jobs
    SET job_status = 4
    WHERE job_id = jobId;
END //
DELIMITER ;