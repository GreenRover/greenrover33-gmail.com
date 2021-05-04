package com.example.time_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.time_service.model.Status;
import com.example.time_service.repos.StatusRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "status")
@Controller
@RequestMapping("/status")
public class StatusController extends CrudController<Status> {
	
	public StatusController(StatusRepository repository) {
		super(repository);
	}
	
}
