package com.knowit.erozgaar.security;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.knowit.erozgaar.security.MyUserDetailsService;

@Configuration
public class AppSecurityConfigurer {
	
	@Autowired
	private AuthEntryPointJwt point;
	
	@Bean
	AuthTokenFilter authTokenFilter() {
		return new AuthTokenFilter();
	};
	/*@Autowired
	AuthTokenFilter authTokenFilter;*/
	
	@Bean
	RestTemplate restTemplate(RestTemplateBuilder builder) {
	 
		return builder
			.setConnectTimeout(Duration.ofMillis(3000))
			.setReadTimeout(Duration.ofMillis(3000))
			.build();
	}
	
	
	@Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addExposedHeader("Authorization");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
	
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        /*http.csrf().disable()
        .authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers("/register").permitAll()
        .antMatchers("/user").hasAuthority("USER")
		.antMatchers("/admin").hasAuthority("ADMIN")
		.and()
		.formLogin();*/
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		http.csrf(csrf -> csrf.disable())
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		http.authorizeHttpRequests(authorize -> {
			authorize.requestMatchers("/").permitAll();
			authorize.requestMatchers("/login").permitAll();
			authorize.requestMatchers("/regWorker").permitAll();
			authorize.requestMatchers("/regProvider").permitAll();
			authorize.requestMatchers("/regVlc").permitAll();
			authorize.requestMatchers("/approve").permitAll();
			authorize.requestMatchers("/getWorkerRegRequests").permitAll();
			authorize.requestMatchers("/approveProvider").permitAll();
			authorize.requestMatchers("/getProviderRegRequests").permitAll();
			authorize.requestMatchers("/getAllJobs").permitAll();
			authorize.requestMatchers("/getAllJobsByVlc").permitAll();
			authorize.requestMatchers("/addJob").permitAll();
			authorize.requestMatchers("/addJobAllocation").permitAll();
			authorize.requestMatchers("/getProviderByUserId").permitAll();
			authorize.requestMatchers("/getUser").permitAll();
			authorize.requestMatchers("/approveWorker").permitAll();
			authorize.requestMatchers("/approveProvider").permitAll();
			authorize.requestMatchers("/approve").permitAll();
			authorize.requestMatchers("/getAvailableWorkers").permitAll();
			authorize.requestMatchers("/sendWorkers").permitAll();
			//allocateJob
			//getProviderByUserId
			//addJobAllocation
			//approveWorker
			//getAvailableWorker
			
			//update profile of worker
			authorize.requestMatchers("/getuserbyusername").permitAll();
			authorize.requestMatchers("/getuserbyid").permitAll();
			authorize.requestMatchers("/getuserworkerbyid").permitAll();
			authorize.requestMatchers("/updateWorker").permitAll();
			
			//update vlc
			authorize.requestMatchers("/getuservlcbyid").permitAll();
			authorize.requestMatchers("/updateVlc").permitAll();
			
			
			authorize.requestMatchers("/getuserproviderbyid").permitAll();
			authorize.requestMatchers("/updateProvider").permitAll();
			
			authorize.requestMatchers("/logout").permitAll();
			
			authorize.requestMatchers("/regDoctor").permitAll();
			authorize.requestMatchers("/getAllSps").permitAll();
			authorize.requestMatchers("/getAllSps").permitAll();
			authorize.requestMatchers("/uploadimg/**").permitAll();
			authorize.requestMatchers("/dotnetapi").permitAll();
			// authorize.requestMatchers("/getRegRequests").hasAuthority("ADMIN");
			authorize.requestMatchers("/approve").hasAuthority("ADMIN");
			authorize.requestMatchers("/getDoctor").hasAuthority("DOCTOR");
			//authorize.requestMatchers("/c").hasAuthority("USER");
			//authorize.requestMatchers("/admin").hasAnyAuthority("ADMIN","USER");
			
		});
		//.exceptionHandling(ex -> ex.authenticationEntryPoint(point))
        
		//http.cors(cors -> cors.configurationSource());
		
		
		return http.build();
    }
	
	@Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider  = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
         
        return authProvider;
    }
	
	@Bean
    UserDetailsService userDetailsService() {
        return new MyUserDetailsService();
    }
	
	/*protected void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(authenticationProvider());
		
	}*/
	
	@Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

}
