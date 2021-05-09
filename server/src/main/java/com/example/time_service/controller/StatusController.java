package com.example.time_service.controller;

import java.util.Date;

import com.example.time_service.model.Status;
import com.example.time_service.repos.StatusRepository;
import com.example.time_service.service.TimeService;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "status")
@RestController
@RequestMapping("/status")
public class StatusController extends CrudController<Status> {

    private final TimeService timeService;

    public StatusController(StatusRepository repository, TimeService timeService) {
        super(repository);
        this.timeService = timeService;
    }

    @GetMapping(path = "/time")
    public String getTime() {
        return "It is: " + new Date(timeService.getTimestmap());
    }

}
