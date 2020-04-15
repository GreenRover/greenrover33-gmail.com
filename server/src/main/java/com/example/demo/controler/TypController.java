package com.example.demo.controler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.Typ;
import com.example.demo.repos.TypRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "typ")
@Controller
@RequestMapping("/typ")
public class TypController extends CrudController<Typ> {
	
	public TypController(TypRepository repository) {
		super(repository);
	}
	
}
