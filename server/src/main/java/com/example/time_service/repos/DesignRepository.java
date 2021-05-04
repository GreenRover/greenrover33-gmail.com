package com.example.time_service.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.time_service.model.Design;

@Repository
public interface DesignRepository extends JpaRepository<Design, Integer>{
		
}
