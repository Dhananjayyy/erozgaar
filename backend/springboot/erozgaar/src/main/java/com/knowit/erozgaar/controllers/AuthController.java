package com.knowit.erozgaar.controllers;

import java.sql.SQLException;
import java.util.*;
import java.util.stream.*;

import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.JobCategory;
import com.knowit.erozgaar.entities.LoginRequest;
import com.knowit.erozgaar.entities.MessageResponse;
import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.entities.SecurityQuestion;
import com.knowit.erozgaar.entities.SignupRequest;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserInfoResponse;
import com.knowit.erozgaar.entities.UserProviderRequest;
import com.knowit.erozgaar.entities.UserVlcRequest;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.repositories.UserRepository;
import com.knowit.erozgaar.security.JwtUtils;
import com.knowit.erozgaar.security.MyUserDetails;
import com.knowit.erozgaar.services.JobCategoryService;
import com.knowit.erozgaar.services.JobService;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.RoleService;
import com.knowit.erozgaar.services.SecurityQuestionService;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

import jakarta.transaction.Transactional;

@CrossOrigin(origins = "https://erozgaar.azurewebsites.net/login")
@RestController
public class AuthController {

	@Autowired
	AuthenticationManager authManager;

	// @Autowired
	// AuthenticationProvider authenticationProvider;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	RoleService rservice;

	@Autowired
	UserService uservice;

	@Autowired
	SecurityQuestionService sservice;

	@Autowired
	WorkerService wservice;

	@Autowired
	ProviderService pservice;

	@Autowired
	VillageLevelConnectorService vlcservice;
	
	@Autowired
	JobCategoryService jcservice;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		System.out.println(loginRequest.getUsername() + " : " + loginRequest.getPassword());
		

		Authentication authentication = authManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
		System.out.println(userDetails);
		
		
		if(userDetails.getActive() == 0) {
			return ResponseEntity.ok(new MessageResponse("inactive"));
		}

		String jwtToken = jwtUtils.generateTokenFromUsername(loginRequest.getUsername());
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok()
				// .header("Authorization", "Bearer " + jwtToken)
				.body(new UserInfoResponse(userDetails.getId(),
						userDetails.getUsername(),
						roles, jwtToken));
	}

	@Transactional
	@PostMapping("/regWorker")
	public ResponseEntity<?> registerWorker(@RequestBody UserWorkerRequest request) {
		try {
			Role role = rservice.getById(request.getRole().getRoleId());
			SecurityQuestion securityQuestion = sservice.getById(request.getSecurityQuestion().getSecurityQuestionId());
			//JobCategory jobCategory = jcservice.getById(request.getJobCategory().getId());

			User u = new User(request.getUserName(), encoder.encode(request.getPassword()), request.getPhoneNumber(),
					request.getGender(), role, 0, request.getAdhaar(), request.getAccountNumber(), securityQuestion,
					request.getAnswer());
			Worker w = new Worker(request.getWorkerId(), request.getFirstName(), request.getMiddleName(),
					request.getLastName(),
					request.getEducation(), request.getAddress(), request.getDateOfBirth(), request.isRelocation(),true,request.getJobCategory(), u);

			wservice.save(w);
			return ResponseEntity.ok(new MessageResponse("success"));
		}catch (DataIntegrityViolationException e) {
	        // Handle duplicate entry violation (username already exists)
	        return ResponseEntity.ok(new MessageResponse("duplicate"));
		}
		catch (Exception e) {
			return ResponseEntity.ok(new MessageResponse("error"));
		}
	}

	@Transactional
	@PostMapping("/regProvider")
	public ResponseEntity<?> registerProvider(@RequestBody UserProviderRequest request) {
		try {
			Role role = rservice.getById(request.getRole().getRoleId());
			SecurityQuestion securityQuestion = sservice.getById(request.getSecurityQuestion().getSecurityQuestionId());

			User u = new User(request.getUserName(), encoder.encode(request.getPassword()), request.getPhoneNumber(),
					request.getGender(), role, 0, request.getAdhaar(), request.getAccountNumber(), securityQuestion,
					request.getAnswer());
			Provider p = new Provider(request.getProviderId(), request.getFirstName(), request.getMiddleName(),
					request.getLastName(), request.getOrganization(), request.getEducation(), request.getAddress(), u);

			pservice.save(p);
			return ResponseEntity.ok(new MessageResponse("success"));
		} catch (Exception e) {
			return ResponseEntity.ok(new MessageResponse("error"));
		}
	}

	@Transactional
	@PostMapping("/regVlc")
	public ResponseEntity<?> registerVlc(@RequestBody UserVlcRequest request) {
		try {
			Role role = rservice.getById(request.getRole().getRoleId());
			SecurityQuestion securityQuestion = sservice.getById(request.getSecurityQuestion().getSecurityQuestionId());

			User u = new User(request.getUserName(), encoder.encode(request.getPassword()), request.getPhoneNumber(),
					request.getGender(), role, 1, request.getAdhaar(), request.getAccountNumber(), securityQuestion,
					request.getAnswer());
			VillageLevelConnector vlc = new VillageLevelConnector(request.getVlcId(), request.getFirstName(),
					request.getMiddleName(), request.getLastName(), request.getEducation(), request.getAddress(), u);
			vlcservice.save(vlc);
			return ResponseEntity.ok(new MessageResponse("success"));
		} catch (Exception e) {
			return ResponseEntity.ok(new MessageResponse("error"));
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser() {
		ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
				.body(new MessageResponse("You've been signed out!"));
	}
}
