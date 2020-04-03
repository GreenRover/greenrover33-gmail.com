package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Entity(name = "status")
@Validated
public class Status {
	@Id
	@GeneratedValue
	@NotNull
	@Schema(example = "1337", required = true)
	private Integer id = null;

	@NotNull
	@Schema(example = "Offen", required = true)
	private String name = null;
}
