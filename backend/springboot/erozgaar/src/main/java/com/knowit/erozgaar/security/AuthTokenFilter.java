package com.knowit.erozgaar.security;

import java.io.IOException;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


public class AuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	  private JwtUtils jwtUtils;

	  @Autowired
	  private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//while(request.getHeaderNames().hasMoreElements())
			//System.out.println(request.getHeaderNames().nextElement());
		System.out.println(request.getHeader("Authorization"));
		String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        if(authHeader != null && authHeader.startsWith("Bearer ")){
            token = authHeader.substring(7);
            username = jwtUtils.getUserNameFromJwtToken(token);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
           
            if(jwtUtils.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }

        }

        filterChain.doFilter(request, response);
		
		
		
		
		
		
		/*System.out.println("in do filter internal");
		System.out.println(request.getHeader("Authorization"));
		String requestHeader = request.getHeader("Authorization");
	      //Bearer 2352345235sdfrsfgsdfsdf
	      //logger.info(" Header :  {}", requestHeader);
	      String username = null;
	      String token = null;
	      if (requestHeader != null && requestHeader.startsWith("Bearer")) {
	          //looking good
	          token = requestHeader.substring(7);
	          try {

	              username = this.jwtUtils.getUserNameFromJwtToken(token);

	          } catch (Exception e) {
			      logger.error("Cannot set user authentication: {}", e);
			    }


	      } else {
	          logger.info("Invalid Header Value !! ");
	      }

	      System.out.println("between ifs");
	      //
	      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

	    	  System.out.println("in next if");
	          //fetch user detail from username
	          UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
	          Boolean validateToken = this.jwtUtils.validateJwtToken(token);
	          if (validateToken) {

	              //set the authentication
	              UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	              authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	              SecurityContextHolder.getContext().setAuthentication(authentication);


	          } else {
	              logger.info("Validation fails !!");
	          }


	      }
	      System.out.println("no existing filter");
	      filterChain.doFilter(request, response); */
		
	}
	  
	/*protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
		      String jwt = parseJwt(request);
		      if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
		        String username = jwtUtils.getUserNameFromJwtToken(jwt);

		        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		        
		        UsernamePasswordAuthenticationToken authentication = 
		            new UsernamePasswordAuthenticationToken(userDetails,
		                                                    null,
		                                                    userDetails.getAuthorities());
		        
		        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		        SecurityContextHolder.getContext().setAuthentication(authentication);
		      }
		    } catch (Exception e) {
		      logger.error("Cannot set user authentication: {}", e);
		    }

	}
	
	private String parseJwt(HttpServletRequestWrapper request) {
	    String jwt = jwtUtils.get
	    return jwt;
	  } */
	   /*@Override
	    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, Filter filterChain) throws ServletException, IOException {
	  String requestHeader = request.getHeader("Authorization");
      //Bearer 2352345235sdfrsfgsdfsdf
      //logger.info(" Header :  {}", requestHeader);
      String username = null;
      String token = null;
      if (requestHeader != null && requestHeader.startsWith("Bearer")) {
          //looking good
          token = requestHeader.substring(7);
          try {

              username = this.jwtUtils.getUsernameFromToken(token);

          } catch (IllegalArgumentException e) {
              logger.info("Illegal Argument while fetching the username !!");
              e.printStackTrace();
          } catch (ExpiredJwtException e) {
              logger.info("Given jwt token is expired !!");
              e.printStackTrace();
          } catch (MalformedJwtException e) {
              logger.info("Some changed has done in token !! Invalid Token");
              e.printStackTrace();
          } catch (Exception e) {
              e.printStackTrace();

          }


      } else {
          logger.info("Invalid Header Value !! ");
      }


      //
      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {


          //fetch user detail from username
          UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
          Boolean validateToken = this.jwtUtils.validateToken(token, userDetails);
          if (validateToken) {

              //set the authentication
              UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
              authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
              SecurityContextHolder.getContext().setAuthentication(authentication);


          } else {
              logger.info("Validation fails !!");
          }


      }

      filterChain.doFilter(request, response);
	   }*/
	  
	  

}
