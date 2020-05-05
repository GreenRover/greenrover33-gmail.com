package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.BatchSize;
import org.springframework.validation.annotation.Validated;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Entity(name = "location")
@BatchSize(size = 1000)
@Validated
public class Location implements HavingPK {
	@Id
	@GeneratedValue
	@Schema(example = "1337", required = true)
	private Integer id = null;

	@NotNull
	@Schema(example = "Some where over the rainbow", required = true)
	@Size(min = 3, max = 50)
	private String name = null;
}
