package com.knowit.erozgaar.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.SecurityQuestion;


@Repository
public interface SecurityQuestionRepository extends JpaRepository<SecurityQuestion, Integer> {
    

}
