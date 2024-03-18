package com.knowit.erozgaar.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Worker;
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
    
    public List<Provider> getProvidersByCity(int uid)
	{
		
		return prepo.getListForApprovalByCity(uid);
		
	}
    
    public Provider getProviderByUserId(int id){
    	return prepo.getProviderByUserId(id);
    }
    
    public int getProviderIdByUserId(int uid) {
    	return prepo.getProviderIdByUserId(uid);
    }
    
    public Provider getProviderById(int uid) {
    	return prepo.getProviderById(uid);
    }
    
    public int updateProvider(String fname, String mname, String lname, String org, int uid) {
    	return prepo.updateProvider(fname,mname,lname,org,uid);
    }
}