package com.knowit.erozgaar.controllers;

import java.io.IOException;
import java.util.List;

//import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.knowit.erozgaar.entities.Doctor;
import com.knowit.erozgaar.entities.DoctorReg;
import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.DoctorService;
import com.knowit.erozgaar.services.RoleService;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

@RestController
@CrossOrigin(origins = "http://localhost:5173",exposedHeaders = "**")
public class VlcController {
	
	@Autowired
	UserService uservice;
	
	@Autowired
	VillageLevelConnectorService dservice;

	@Autowired
	WorkerService wservice;
	
	@Autowired
	RoleService rserevice;
	
	/*@Transactional
	@PostMapping(value="/regDoctor",consumes = MediaType.APPLICATION_JSON_VALUE)
	public Doctor regDoctor(@RequestBody  DoctorReg dr)
	{
		System.out.println(dr.getPicture());
		Login l = new Login(dr.getUid(), dr.getPwd(),  "doctor",false);
		Login saved = lservice.save(l);
		System.out.println(saved.getLogin_id());
		System.out.println(dr.getExperience());
		
		Doctor d = new Doctor(dr.getFname(), dr.getMname(), dr.getLname(), dr.getEmail(), dr.getContact(), dr.getSpecialization(), dr.getExperience(),dr.getPicture(), saved);
		System.out.println(d.getExperience());
		return dservice.saveDoctor(d);
	} */
	
	
	/*@PostMapping("/regDoctor")
	public Doctor regDoctor(@RequestBody DoctorReg dr)
	{
			Role r = rserevice.getById(2);		
			Login l = new Login(dr.getUid(), dr.getPwd(), r ,false);
			Login saved = lservice.save(l);
		
			
			System.out.println(saved.getLogin_id());
			System.out.println(dr.getExperience());
			
			Doctor d = new Doctor(dr.getFname(), dr.getMname(), dr.getLname(), dr.getEmail(), dr.getContact(), dr.getSpecialization(), dr.getExperience(), saved);
			System.out.println(d.getExperience());
			return dservice.saveDoctor(d);	
		
	}*/
	
	
	// @GetMapping("/approve")
	// public boolean approve(@RequestParam("id") int id)
	// {
	// 	return uservice.approve(id);
	// }
	
	
	
	
	// @PostMapping(value="/uploadimg/{id}", consumes = "multipart/form-data")
	// public boolean updateImg(@PathVariable("id") int id,@RequestBody MultipartFile file)
	// {
	// 	System.out.println("hi");
	// 	boolean flag = false;
	// 	try
	// 	{
	// 		flag = dservice.upload(id,file.getBytes());
	// 	}
	// 	catch(Exception e)
	// 	{
	// 		e.printStackTrace();
	// 	}
	// 	return flag;
	// }
	
	
	
	
	// @GetMapping("/getWorker")
	// public Worker getWorker(@RequestParam int loginid)
	// {
	// 	User l = uservice.getUser(loginid);
	// 	return dservice.getWorker(l);		
	// }
	
	// @GetMapping("/getRegRequests")
	// public List<Doctor> getListForApproval()
	// {
	// 	System.out.println("sending pending approvals");
	// 	return dservice.getWorkers();		
	// }
}
