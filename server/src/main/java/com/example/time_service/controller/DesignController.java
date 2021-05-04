package com.example.time_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.time_service.model.Design;
import com.example.time_service.repos.DesignRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "design")
@Controller
@RequestMapping("/design")
public class DesignController extends CrudController<Design> {
	
	public DesignController(DesignRepository repository) {
		super(repository);
	}
	
}
