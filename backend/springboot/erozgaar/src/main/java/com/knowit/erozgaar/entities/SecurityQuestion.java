package com.knowit.erozgaar.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "security_questions")
public class SecurityQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "security_question_id")
    private int securityQuestionId;
    
    @Column(name = "question")
    private String question;

    public SecurityQuestion() {
        super();
    }

    public SecurityQuestion(int securityQuestionId, String question) {
        this.securityQuestionId = securityQuestionId;
        this.question = question;
    }

    public int getSecurityQuestionId() {
        return securityQuestionId;
    }

    public void setSecurityQuestionId(int securityQuestionId) {
        this.securityQuestionId = securityQuestionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @Override
    public String toString() {
        return "SecurityQuestion [securityQuestionId=" + securityQuestionId + ", question=" + question + "]";
    }
}