package com.example.time_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.time_service.model.Typ;
import com.example.time_service.repos.TypRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "typ")
@Controller
@RequestMapping("/typ")
public class TypController extends CrudController<Typ> {
	
	public TypController(TypRepository repository) {
		super(repository);
	}
	
}
