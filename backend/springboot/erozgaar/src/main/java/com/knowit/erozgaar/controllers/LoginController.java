package com.knowit.erozgaar.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.knowit.erozgaar.entities.LoginRequest;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.services.AdminService;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class LoginController {

    @Autowired
    UserService uservice;

    @Autowired
    WorkerService wservice;

    @Autowired
    ProviderService pservice;

    @Autowired
    VillageLevelConnectorService vlcservice;

    @Autowired
    AdminService aservice;

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        try {
            User user = uservice.existsByUsernamePassword(request.getUsername(), request.getPassword());
            String roleName = user.getRole().getRoleName();
            String username = user.getUserName();
            Object result = null;

            if (user != null && user.isActive()) {
                if (roleName.equals("Worker")) {
                    result = wservice.getByUsername(username);
                }
                else if(roleName.equals("Provider")) {
                    result = pservice.getByUsername(username);
                } 
                else if(roleName.equals("VLC")) {
                    result = vlcservice.getByUsername(username);
                }
                else if(roleName.equals("Admin")) {
                    result = aservice.getByUsername(username);
                }
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
