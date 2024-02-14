package com.knowit.erozgaar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Admin;
import com.knowit.erozgaar.repositories.AdminRepository;

@Service
public class AdminService {

    @Autowired
    AdminRepository arepo;

    public Admin save(Admin vlc)
	{
		return arepo.save(vlc);
	}

	public Admin getByUsername(String username) {
		return arepo.findByUsername(username);
	}
    
}