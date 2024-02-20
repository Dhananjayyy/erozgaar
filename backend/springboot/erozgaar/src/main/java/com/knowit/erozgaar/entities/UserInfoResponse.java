package com.knowit.erozgaar.entities;

import java.util.List;

public class UserInfoResponse {

	int id;
	String username;
	List<String> roles;
	String accessToken;
	public UserInfoResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserInfoResponse(int id, String username, List<String> roles,String accessToken) {
		super();
		this.id = id;
		this.username = username;
		this.roles = roles;
		this.accessToken = accessToken;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	
}
