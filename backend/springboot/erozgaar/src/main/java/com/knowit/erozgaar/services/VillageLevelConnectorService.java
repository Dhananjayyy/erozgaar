package com.knowit.erozgaar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.repositories.VillageLevelConnectorRepository;


@Service
public class VillageLevelConnectorService {

    @Autowired
    VillageLevelConnectorRepository vlcrepo;

    public VillageLevelConnector save(VillageLevelConnector vlc)
	{
		return vlcrepo.save(vlc);
	}

	public VillageLevelConnector getByUsername(String username) {
		return vlcrepo.findByUsername(username);
	}
	
	public int getCityIdbyUserId(int uid) {
		return vlcrepo.getCityIdbyUserId(uid);
	}
	
	public VillageLevelConnector getVlcById(int uid) {
		return vlcrepo.getVlc(uid);

	}
	
	public int updateVlc(String fname, String mname,String lname, Integer uid) {
		return vlcrepo.updateVlc(fname,mname,lname,uid);
	}
}