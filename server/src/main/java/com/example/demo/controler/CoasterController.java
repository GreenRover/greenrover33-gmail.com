package com.example.demo.controler;

import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Coaster;
import com.example.demo.model.Typ;

@RestController
public class CoasterController {
	
	@GetMapping("static")
	public Coaster coasterStatic() {
		Coaster c = new Coaster();
		c.setId(43);
		c.setName("demo");
		c.setOpenedDate("2019-01-01");

		Typ t = new Typ();
		t.setId(1);
		t.setName("Stahl");
		c.setTyp(t);
		return c;
	}
	
	@SuppressWarnings("rawtypes")
	@PostMapping("test")
	public ResponseEntity coasterTest(@Valid @RequestBody Coaster c, final BindingResult br) {

		if (br.hasErrors()) {
			final String errors = br.getFieldErrors().stream() //
					.map(x -> x.getField() + " = " + x.getDefaultMessage()) //
					.collect(Collectors.joining("\n"));
			
			System.out.println(errors);

			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		c.setName("Hallo Home");
		
		return new ResponseEntity<>(c, HttpStatus.OK);
	}
}
