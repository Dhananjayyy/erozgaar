package com.knowit.erozgaar.services;

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
}