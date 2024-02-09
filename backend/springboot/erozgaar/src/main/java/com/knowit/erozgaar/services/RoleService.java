package com.knowit.erozgaar.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.repositories.RoleRepository;


@Service
public class RoleService {

	@Autowired
	RoleRepository rrepo;
	
	public Role getById(int id)
	{
		Optional<Role> or = rrepo.findById(id);
		Role r;
		try
		{
			r = or.get();
		}
		catch(Exception e)
		{
			r=null;
		}
		return r;
	}

    
	
}
