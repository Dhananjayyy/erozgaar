package com.knowit.erozgaar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.repositories.UserRepository;

@Service
public class UserService {
   
	@Autowired
	UserRepository urepo;
	
	public User save(User u)
	{
		return urepo.save(u);
	}
	
	public boolean approve(int id)
	{
		if (urepo.approve(id) == 1)
			return true;
		else
			return false;
	}
	
	public boolean reject(int id)
	{
		if (urepo.reject(id) == 1)
			return true;
		else
			return false;
	}
	
	public User getUser(int id)
	{
		return urepo.findById(id).get();
	}
	
	public User getUserById(int id)
	{
		return urepo.findById(id).get();
	}
	
	public boolean getUserByUserName(String uname) {
		return urepo.getUserByUserName(uname) != null;
	}
	
	public int updateUser(String phone,String accno, Integer uid) {
		return urepo.updateUser(phone, accno, uid);
	}
}
