package com.knowit.erozgaar.controllers;

import com.knowit.erozgaar.entities.SecurityAnswerRequest;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.services.SecurityQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityQuestionController {

    @Autowired
    private SecurityQuestionService securityQuestionService;

    @PostMapping("/checkAnswer")
    public boolean checkSecurityAnswer(@RequestBody SecurityAnswerRequest request) {
        int userId = request.getUserId();
        String answer = request.getAnswer();
        User user = securityQuestionService.getUserWithSecurityQuestionById(userId);
        return user != null && user.getAnswer().equals(answer);
    }
}

