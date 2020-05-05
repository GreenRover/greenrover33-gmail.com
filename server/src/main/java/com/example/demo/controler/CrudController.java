package com.example.demo.controler;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.demo.api.GenericError;
import com.example.demo.model.HavingPK;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;

@Controller
@SuppressWarnings("rawtypes")
@AllArgsConstructor
public abstract class CrudController<T extends HavingPK> {
	private final JpaRepository<T, Integer> repository;

	@GetMapping(path = "")
	@ResponseBody
	@Operation(description = "Receive a list of objects")
	public List<T> list() {
		return repository.findAll();
	}

	@GetMapping(path = "paged")
	@ResponseBody
	@Operation(description = "Receive a list of objects, paged")
	public Page<T> paged( //
			@Parameter(description = "The page to show.", required = true) @RequestParam(value = "page", defaultValue = "1") int page, //
			@Parameter(description = "The items per page.", required = true) @RequestParam(value = "items", defaultValue = "25") int itemsPerPage //
	) {

		return repository.findAll(PageRequest.of(page, itemsPerPage, Sort.by("name")));
	}

	@GetMapping(path = "{id}")
	@ResponseBody
	@Operation(description = "Get single object")
	public T get( //
			@Parameter(description = "The id to get.", required = true) @PathVariable("id") int id) {
		return repository.findById(id).get();
	}

	@PostMapping(path = "")
	@ResponseBody
	@Operation(description = "Create new object")
	@ApiResponses(value = { //
			@ApiResponse(responseCode = "201", description = "object was succesfull created"), //
			@ApiResponse(responseCode = "400", description = "the given input is invalid", content = @Content(schema = @Schema(implementation = String.class))), //
			@ApiResponse(responseCode = "500", description = "something unexpected went verry wrong.", content = @Content(schema = @Schema(implementation = GenericError.class))) //
	})
	public ResponseEntity create( //
			@Valid @RequestBody T newObject) {

		newObject.setId(null);
		repository.save(newObject);

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PutMapping(path = "{id}")
	@ResponseBody
	@Operation(description = "Update an object")
	@ApiResponses(value = { //
			@ApiResponse(responseCode = "200", description = "object was succesfull updated"), //
			@ApiResponse(responseCode = "400", description = "the given input is invalid", content = @Content(schema = @Schema(implementation = String.class))), //
			@ApiResponse(responseCode = "404", description = "object dosent exist"), //
			@ApiResponse(responseCode = "500", description = "something unexpected went verry wrong.", content = @Content(schema = @Schema(implementation = GenericError.class))) //
	})
	public ResponseEntity update( //
			@Parameter(description = "The id of the object to update.", required = true) @PathVariable("id") int id, //
			@Valid @RequestBody T object) {
		
		if (!repository.findById(id).isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		object.setId(id);
		repository.save(object);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping(path = "{id}")
	@ResponseBody
	@Operation(description = "Delete an object")
	@ApiResponses(value = { //
			@ApiResponse(responseCode = "200", description = "object was succesfull deleted"), //
			@ApiResponse(responseCode = "404", description = "object dosent exist"), //
			@ApiResponse(responseCode = "500", description = "something unexpected went verry wrong.", content = @Content(schema = @Schema(implementation = GenericError.class))) //
	})
	public ResponseEntity delete( //
			@Parameter(description = "The id of the object to delete.", required = true) @PathVariable("id") int id) {
		
		if (!repository.findById(id).isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		repository.deleteById(id);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ResponseEntity<List<FieldError>> validationError(MethodArgumentNotValidException ex) {
		BindingResult result = ex.getBindingResult();
		return new ResponseEntity<>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
	}
}
