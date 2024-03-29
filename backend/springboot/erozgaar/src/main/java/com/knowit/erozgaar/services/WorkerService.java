package com.knowit.erozgaar.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.repositories.WorkerRepository;

@Service
public class WorkerService {
	
    @Autowired
	WorkerRepository wrepo;
	
	public Worker save(Worker u)
	{
		return wrepo.save(u);
	}

	public Worker getByUsername(String username) {
		return wrepo.findByUsername(username);
	}

	public List<Worker> getWorkers(int uid)
	{
		
		return wrepo.getListForApproval(uid);
		
	}
	
	public List<Worker> getAvailableWorkerByVlcUid(int uid, int jid){
		return wrepo.getAvailableWorkersByVlcUid(uid, jid);
	}
	
	public Worker getById(int wid) {
		return wrepo.getWorkerById(wid);
	}
	
	public boolean isAvailable(int wid) {
		return wrepo.isAvailable(wid) != null;
	}
	

	public Worker getWorkerById(int uid) {
		return wrepo.getWorker(uid);
	}
	
	public int updateWorker(String fname, String mname, String lname,boolean relocation,Date dob, int uid) {
	    return wrepo.updateWorker(fname, mname, lname,relocation,dob, uid);
	}
}