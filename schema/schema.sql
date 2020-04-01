CREATE SEQUENCE public.typ_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.typ_id_seq OWNER TO doadmin;
CREATE TABLE public.typ
(
    id integer NOT NULL DEFAULT nextval('typ_id_seq'::regclass),
    name character varying(512)[] COLLATE pg_catalog."default",
    CONSTRAINT typ_pkey PRIMARY KEY (id)
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.typ OWNER to doadmin;

CREATE SEQUENCE public.status_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.status_id_seq OWNER TO doadmin;
CREATE TABLE public.status
(
    id integer NOT NULL DEFAULT nextval('status_id_seq'::regclass),
    name character varying(512)[] COLLATE pg_catalog."default",
    CONSTRAINT status_pkey PRIMARY KEY (id)
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.status OWNER to doadmin;

CREATE SEQUENCE public.location_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.location_id_seq OWNER TO doadmin;
CREATE TABLE public.location
(
    id integer NOT NULL DEFAULT nextval('location_id_seq'::regclass),
    name character varying(512)[] COLLATE pg_catalog."default",
    CONSTRAINT location_pkey PRIMARY KEY (id)
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.location OWNER to doadmin;

CREATE SEQUENCE public.design_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public.design_id_seq OWNER TO doadmin;
CREATE TABLE public.design
(
    id integer NOT NULL DEFAULT nextval('design_id_seq'::regclass),
    name character varying(512)[] COLLATE pg_catalog."default",
    CONSTRAINT design_pkey PRIMARY KEY (id)
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.design OWNER to doadmin;

CREATE SEQUENCE public.coaster_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.coaster_id_seq OWNER TO doadmin;
CREATE TABLE public.coaster
(
    id integer NOT NULL DEFAULT nextval('coaster_id_seq'::regclass),
    name character varying(512)[] COLLATE pg_catalog."default" NOT NULL,
    opened character varying(512)[] COLLATE pg_catalog."default",
    location integer NOT NULL,
    typ integer,
    design integer,
    status integer,
    CONSTRAINT coaster_pkey PRIMARY KEY (id),
    CONSTRAINT coaster_fk_design FOREIGN KEY (design)
        REFERENCES public.design (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT coaster_fk_location FOREIGN KEY (location)
        REFERENCES public.location (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT coaster_fk_status FOREIGN KEY (status)
        REFERENCES public.status (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT coaster_fk_typ FOREIGN KEY (typ)
        REFERENCES public.typ (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (OIDS = FALSE) TABLESPACE pg_default;
ALTER TABLE public.coaster OWNER to doadmin;

CREATE INDEX fki_coaster_fk_design
    ON public.coaster USING btree
    (design ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX fki_coaster_fk_location
    ON public.coaster USING btree
    (location ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX fki_coaster_fk_status
    ON public.coaster USING btree
    (status ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX fki_coaster_fk_typ
    ON public.coaster USING btree
    (typ ASC NULLS LAST)
    TABLESPACE pg_default;