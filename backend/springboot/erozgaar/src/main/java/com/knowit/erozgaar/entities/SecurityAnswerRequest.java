package com.knowit.erozgaar.entities;

public class SecurityAnswerRequest {
    private int userId;
    private String answer;

    public SecurityAnswerRequest() {
    }

    public SecurityAnswerRequest(int userId, String answer) {
        this.userId = userId;
        this.answer = answer;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "SecurityAnswerRequest [userId=" + userId + ", answer=" + answer + "]";
    }

    
}