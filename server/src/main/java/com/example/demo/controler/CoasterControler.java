package com.example.demo.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.model.Coaster;
import com.example.demo.model.Typ;
import com.example.demo.repos.CoasterRepository;
import com.example.demo.repos.DesignRepository;
import com.example.demo.repos.LocationRepository;
import com.example.demo.repos.StatusRepository;
import com.example.demo.repos.TypRepository;
import com.example.demo.service.RcdbScraper;

@Controller
public class CoasterControler {
	@Autowired
	private CoasterRepository coasterRepository;
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

	@ResponseBody
	@GetMapping("/scrapeCoaster/{from}/{to}/toDb")
	public List<Coaster> scrapeCoasterToDb( //
			@PathVariable("from") Integer from, //
			@PathVariable("to") Integer to) {

		List<Coaster> scrape = rcdbScraper.scrape(from, to);

		locationRepository.saveAll(rcdbScraper.getLocations().values());
		typRepository.saveAll(rcdbScraper.getTyps().values());
		designRepository.saveAll(rcdbScraper.getDesigns().values());
		statusRepository.saveAll(rcdbScraper.getStatus().values());

		coasterRepository.saveAll(scrape);

		return scrape;
	}
	
	
	@ResponseBody
	@GetMapping("/scrapeCoaster/{from}/{to}")
	public List<Coaster> scrapeCoasterToDisplay( //
			@PathVariable("from") Integer from, //
			@PathVariable("to") Integer to) {

		List<Coaster> scrape = rcdbScraper.scrape(from, to);

		return scrape;
	}

	@ResponseBody
	@GetMapping("/coaster/static")
	public Coaster coasterStatic() {
		Coaster c = new Coaster();
		c.setId(43);
		c.setName("demo");
		c.setOpened("2019-01-01");

		Typ t = new Typ();
		t.setId(1);
		t.setName("Stahl");
		c.setTyp(t);
		return c;
	}

}
