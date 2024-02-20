package com.knowit.erozgaar.repositories;

import java.util.List;

import org.hibernate.annotations.SQLInsert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Job;
import com.knowit.erozgaar.entities.JobAllocation;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface JobAllocationRepository extends JpaRepository<JobAllocation, Integer> {
	
	@Modifying
    @Query(value = "INSERT INTO job_allocation (job_id, worker_id) VALUES (:jid, :wid)", nativeQuery = true)
    public List<JobAllocation> saveAllocation(int jid, int wid);
	
	@Query("SELECT ja FROM JobAllocation ja WHERE ja.job.id = :jobId AND ja.worker.id = :workerId")
	JobAllocation isAllocated(@Param("jobId") int jobId, @Param("workerId") int workerId);
}
