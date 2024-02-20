package com.knowit.erozgaar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.repositories.ProviderRepository;

@Service
public class ProviderService {
    
    @Autowired
    ProviderRepository prepo;

    public Provider save(Provider p)
    {
        return prepo.save(p);
    }

    public Provider getByUsername(String username) {
		return prepo.findByUsername(username);
	}
    
    public List<Provider> getProviders()
	{
		return prepo.getListForApproval();
		
	}
    
    public Provider getProviderByUserId(int id){
    	return prepo.getProviderByUserId(id);
    }
    
    public int getProviderIdByUserId(int uid) {
    	return prepo.getProviderIdByUserId(uid);
    }
}