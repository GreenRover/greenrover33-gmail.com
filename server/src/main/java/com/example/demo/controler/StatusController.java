package com.example.demo.controler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.Status;
import com.example.demo.repos.StatusRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "status")
@Controller
@RequestMapping("/status")
public class StatusController extends CrudController<Status> {
	
	public StatusController(StatusRepository repository) {
		super(repository);
	}
	
}
