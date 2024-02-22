package com.knowit.erozgaar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.knowit.erozgaar.entities.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {
	//@Query("SELECT j FROM Job j JOIN j.address a JOIN a.city c JOIN c.vlc v WHERE v.vlc_id = :id")
//	@Query("SELECT j FROM Job j JOIN j.address a JOIN a.city c JOIN c.vlc v WHERE v.vlc_id = :id")
//	List<Job> getAllJobsByVlcCity(@Param("id") int vid);
	
//	@Query("SELECT j FROM Job j WHERE j.address.city IN (SELECT vlc.address.city FROM VillageLevelConnector vlc WHERE vlc.id = :vlcId)")
//    List<Job> getAllJobsByVlcCity(@Param("vlcId") int vlcId);
	
	@Query("SELECT j FROM Job j WHERE j.address.city IN (SELECT vlc.address.city FROM VillageLevelConnector vlc WHERE vlc.user.id = :userId)")
	List<Job> getAllJobsByVlcCity(@Param("userId") int userId);
	
	@Query("Select j FROM Job j WHERE j.id = :jobId")
	Job getJobById(@Param("jobId") int jobId);
	
	@Query("SELECT j FROM Job j WHERE j.provider.user.id = :userId")
	List<Job> getJobByUserId(@Param("userId") int userId);
	
	@Query("SELECT j FROM Job j WHERE j.id IN (SELECT ja.job.id FROM JobAllocation ja WHERE ja.worker.id = :workerId) AND j.id IN (SELECT wa.job.id FROM JobAllocation wa WHERE wa.job.id = j.id)")
    List<Job> getAllJobsForWorker(@Param("workerId") int workerId);
	
	@Modifying
    @Procedure(name = "UpdateCompletionJobStatus")
    public void UpdateCompletionJobStatus(@Param("jobId") int jobId);
	
}
