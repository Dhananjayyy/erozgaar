package com.knowit.erozgaar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {	
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	RestTemplate rtemplate;
	
	@GetMapping("/all")
	  public String allAccess() {
	    return "Public Content.";
	  }

	  @GetMapping("/c")
	  //@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
	  public String userAccess() {
		System.out.println("in user access");
		System.out.println("in security");
		System.out.println("in user access1");
	    return "User Content.";
	  }

	  @GetMapping("/mod")
	  @PreAuthorize("hasAuthority('ADMIN')")
	  public String moderatorAccess() {
	    return "Moderator Board.";
	  }

	  @GetMapping("/admin")
	  //@PreAuthorize("hasAuthority('ADMIN')")
	  public String adminAccess() {
	    return "Admin Board.";
	  }
	
	/*@GetMapping("/register")
	public String register(@RequestParam("uname") String uname,@RequestParam("password") String pwd)
	{
		System.out.println(pencoder.encode(pwd));
		User u = new User(uname,pencoder.encode(pwd),"USER",true);
		System.out.println(u);
		urepo.save(u);
		return "success";
	}*/
	  
	  @GetMapping("/dotnetapi")
	  //@PreAuthorize("hasAuthority('ADMIN')")
	  public String calldotnetrest() throws Exception {
	      System.out.println("calling dot net rest api now....");
	      String url = "https://dummy.restapiexample.com/api/v1/employees";
	      ResponseEntity<String> response = rtemplate.getForEntity(url, String.class);
	      System.out.println(response.getStatusCode());
	      System.out.println(response.getBody());
		  return response.getBody();
	  } 
	  

}
