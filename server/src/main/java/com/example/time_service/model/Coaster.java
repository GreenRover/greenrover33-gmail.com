package com.example.time_service.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import org.springframework.validation.annotation.Validated;

@Entity(name = "coaster")
@Validated
@Data
@Schema(description = "A roaler coaster")
public class Coaster implements HavingPK {
	@Id
	@GeneratedValue
	@NotNull
	@Schema(example = "1337", required = true)
	private Integer id = null;
	
	@NotNull
	@Size(min = 3, max = 15)
	@Schema(example = "Silverstar", required = true, description = "The name of the roaler coaster")
	private String name = null;
	
	@Schema(example = "2020-20", description = "The opening date of this roaler coaster" )
	@JsonProperty("opened_date")
	@Column(name="opened")
	private String openedDate = null;

	@Valid
	@ManyToOne(cascade = CascadeType.MERGE, fetch =  FetchType.EAGER)
	private Location location = null;

	@Valid
	@ManyToOne(cascade = CascadeType.MERGE, fetch =  FetchType.EAGER)
	private Typ typ = null;

	@Valid
	@ManyToOne(cascade = CascadeType.MERGE, fetch =  FetchType.EAGER)
	private Design design = null;

	@Valid
	@ManyToOne(cascade = CascadeType.MERGE, fetch =  FetchType.EAGER)
	private Status status = null;
}
