package com.knowit.erozgaar.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Worker;

import jakarta.transaction.Transactional;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer>{

    @Query("SELECT w FROM Worker w WHERE w.user.userName = :userName")
    Worker findByUsername(@Param("userName") String userName);

    @Query("SELECT w FROM Worker w WHERE w.user.id IN (SELECT u.id FROM User u, Worker w WHERE u.active = 0 AND w.address.city.id = :cityId)")
    public List<Worker> getListForApproval(@Param("cityId") int cityId);
    
    @Query("SELECT w FROM Worker w JOIN Address a ON w.address.id = a.id WHERE a.city.id = (SELECT a2.city.id FROM VillageLevelConnector vlc JOIN Address a2 ON vlc.address.id = a2.id WHERE vlc.user.id = :uid) AND w.jobCategory = (SELECT j.jobCategory FROM Job j WHERE j.id = :jid) AND w.available = TRUE AND w.user.active = 1")
    public List<Worker> getAvailableWorkersByVlcUid(@Param("uid") int uid, @Param("jid") int jid);
    
    @Query("SELECT w FROM Worker w WHERE w.id = :workerId")
    public Worker getWorkerById(@Param("workerId") int workerId);
    
    @Query("SELECT w FROM Worker w WHERE w.id = :workerId AND w.available = TRUE")
    public Worker isAvailable(@Param("workerId") int workerId);
    
    @Query("SELECT w FROM Worker w WHERE w.user.id = :uid")
	public Worker getWorker(@Param("uid") int uid);
    
    @Transactional
    @Modifying
    @Query("UPDATE Worker SET firstName=:fname, middleName=:mname, lastName=:lname,relocation=:relocation,dateOfBirth=:dob WHERE user.id=:uid")
    public int updateWorker(@Param("fname") String fname, @Param("mname") String mname, @Param("lname") String lname,@Param("relocation")boolean relocation , @Param("dob")Date dob,@Param("uid") int uid);
    
    
    
    
    
    


}