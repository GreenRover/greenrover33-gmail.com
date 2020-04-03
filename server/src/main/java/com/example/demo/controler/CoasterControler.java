package com.example.demo.controler;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.Coaster;
import com.example.demo.model.Typ;
import com.example.demo.repos.CoasterRepository;
import com.example.demo.repos.DesignRepository;
import com.example.demo.repos.LocationRepository;
import com.example.demo.repos.StatusRepository;
import com.example.demo.repos.TypRepository;
import com.example.demo.service.RcdbScraper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "coaster")
@Controller
@RequestMapping("/coaster")
public class CoasterControler extends CrudControler<Coaster> {
	
	private final CoasterRepository coasterRepository;
	
	@Autowired
	private TypRepository typRepository;
	@Autowired
	private DesignRepository designRepository;
	@Autowired
	private LocationRepository locationRepository;
	@Autowired
	private StatusRepository statusRepository;

	@Autowired
	private RcdbScraper rcdbScraper;

	
	public CoasterControler(CoasterRepository coasterRepository) {
		super(coasterRepository);
		this.coasterRepository = coasterRepository;
	}
	
	@Operation(description = "Parse rcdb.com and save to database.", tags={ "rcdb" })
	@ResponseBody
	@GetMapping("/scrape/{from}/{to}/toDb")
	public List<Coaster> scrapeCoasterToDb( //
			@Parameter(description = "The id of the first page, to scrape.",required=true) @PathVariable("from") Integer from, //
			@Parameter(description = "The id of the last page, to scrape.",required=true) @PathVariable("to") Integer to) {

		List<Coaster> scrape = rcdbScraper.scrape(from, to);

		locationRepository.saveAll(rcdbScraper.getLocations().values());
		typRepository.saveAll(rcdbScraper.getTyps().values());
		designRepository.saveAll(rcdbScraper.getDesigns().values());
		statusRepository.saveAll(rcdbScraper.getStatus().values());

		coasterRepository.saveAll(scrape);

		return scrape;
	}
	
	@Operation(description = "Parse rcdb.com", tags={ "rcdb" })
	@ResponseBody
	@GetMapping("/scrape/{from}/{to}")
	public List<Coaster> scrapeCoasterToDisplay( //
			@Parameter(description = "The id of the first page, to scrape.",required=true) @PathVariable("from") Integer from, //
			@Parameter(description = "The id of the last page, to scrape.",required=true) @PathVariable("to") Integer to) {

		List<Coaster> scrape = rcdbScraper.scrape(from, to);

		return scrape;
	}

	@Operation(description = "Return JSON of a static coaster.")
	@ResponseBody
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
	
	@Operation(description = "Receive a coaster, change name and output if if there are no errors.")
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
		
		return new ResponseEntity<>(c, HttpStatus.NOT_FOUND);
	}
}
