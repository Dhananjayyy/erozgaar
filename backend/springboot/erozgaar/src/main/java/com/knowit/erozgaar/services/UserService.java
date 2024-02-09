package com.knowit.erozgaar.services;
import java.util.List;

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

	public List<User> getAll(){
		return urepo.findAll();
	}
	
	public User getUser(int id)
	{
		return urepo.findById(id).get();
	}
}