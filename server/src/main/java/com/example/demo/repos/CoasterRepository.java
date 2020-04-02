package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Coaster;

@Repository
public interface CoasterRepository extends JpaRepository<Coaster, Integer>{
		
}
