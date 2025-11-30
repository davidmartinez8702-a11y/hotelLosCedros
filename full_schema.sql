--
-- PostgreSQL database dump
--

\restrict lv3u59d9dYMCJZrS7WFMIiDQPOD5x2JzYHwE6aDK1O578mEc94ai4gYUNwMURbe

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO postgres;

--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO postgres;

--
-- Name: caracteristicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caracteristicas (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.caracteristicas OWNER TO postgres;

--
-- Name: caracteristicas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caracteristicas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.caracteristicas_id_seq OWNER TO postgres;

--
-- Name: caracteristicas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caracteristicas_id_seq OWNED BY public.caracteristicas.id;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO postgres;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: checkins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checkins (
    id bigint NOT NULL,
    reserva_id bigint NOT NULL,
    recepcionista_id bigint NOT NULL,
    cliente_id bigint NOT NULL,
    habitacion_evento_id bigint NOT NULL,
    fecha_entrada date NOT NULL,
    fecha_salida date,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.checkins OWNER TO postgres;

--
-- Name: checkins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.checkins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.checkins_id_seq OWNER TO postgres;

--
-- Name: checkins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.checkins_id_seq OWNED BY public.checkins.id;


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- Name: comentarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentarios (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    contenido character varying(255) NOT NULL,
    calificacion integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.comentarios OWNER TO postgres;

--
-- Name: comentarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comentarios_id_seq OWNER TO postgres;

--
-- Name: comentarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;


--
-- Name: configuracions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuracions (
    id bigint NOT NULL,
    porcentaje_descuento character varying(255) NOT NULL,
    nit character varying(255) NOT NULL,
    ubicacion character varying(255),
    telefono character varying(255),
    email character varying(255),
    logo character varying(255),
    nombre_hotel character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.configuracions OWNER TO postgres;

--
-- Name: configuracions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.configuracions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.configuracions_id_seq OWNER TO postgres;

--
-- Name: configuracions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.configuracions_id_seq OWNED BY public.configuracions.id;


--
-- Name: cuentas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cuentas (
    id bigint NOT NULL,
    checkin_id bigint NOT NULL,
    monto_total numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    monto_pagado numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    saldo numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    estado character varying(100) DEFAULT 'pendiente'::character varying NOT NULL,
    fecha_pago date,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.cuentas OWNER TO postgres;

--
-- Name: cuentas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cuentas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cuentas_id_seq OWNER TO postgres;

--
-- Name: cuentas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cuentas_id_seq OWNED BY public.cuentas.id;


--
-- Name: descuentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.descuentos (
    id bigint NOT NULL,
    descripcion character varying(255),
    porcentaje integer DEFAULT 0 NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    fecha_creacion date,
    fecha_fin date,
    image_url character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.descuentos OWNER TO postgres;

--
-- Name: descuentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.descuentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.descuentos_id_seq OWNER TO postgres;

--
-- Name: descuentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.descuentos_id_seq OWNED BY public.descuentos.id;


--
-- Name: detalle_promos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_promos (
    id bigint NOT NULL,
    promo_id bigint NOT NULL,
    tipo_habitacion_id bigint NOT NULL,
    servicio_id bigint NOT NULL,
    platillo_id bigint NOT NULL,
    detalle character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.detalle_promos OWNER TO postgres;

--
-- Name: detalle_promos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_promos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_promos_id_seq OWNER TO postgres;

--
-- Name: detalle_promos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_promos_id_seq OWNED BY public.detalle_promos.id;


--
-- Name: documentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documentos (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    tipo character varying(255) NOT NULL,
    documento character varying(255) NOT NULL,
    nacionalidad character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.documentos OWNER TO postgres;

--
-- Name: documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documentos_id_seq OWNER TO postgres;

--
-- Name: documentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documentos_id_seq OWNED BY public.documentos.id;


--
-- Name: facturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facturas (
    id bigint NOT NULL,
    cuenta_id bigint NOT NULL,
    reserva_id bigint NOT NULL,
    checkin_id bigint NOT NULL,
    tipo_pago_id bigint NOT NULL,
    monto_total numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    monto_relativo numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    estado character varying(100) DEFAULT 'pendiente'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.facturas OWNER TO postgres;

--
-- Name: facturas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facturas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facturas_id_seq OWNER TO postgres;

--
-- Name: facturas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facturas_id_seq OWNED BY public.facturas.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: garantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.garantes (
    id bigint NOT NULL,
    reserva_id bigint NOT NULL,
    tipo_tarjeta character varying(255) NOT NULL,
    nro_tarjeta character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.garantes OWNER TO postgres;

--
-- Name: garantes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.garantes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.garantes_id_seq OWNER TO postgres;

--
-- Name: garantes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.garantes_id_seq OWNED BY public.garantes.id;


--
-- Name: habitacion_caracteristicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.habitacion_caracteristicas (
    id bigint NOT NULL,
    tipo_habitacion_id bigint NOT NULL,
    caracteristica_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.habitacion_caracteristicas OWNER TO postgres;

--
-- Name: habitacion_caracteristicas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.habitacion_caracteristicas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.habitacion_caracteristicas_id_seq OWNER TO postgres;

--
-- Name: habitacion_caracteristicas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.habitacion_caracteristicas_id_seq OWNED BY public.habitacion_caracteristicas.id;


--
-- Name: habitacion_eventos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.habitacion_eventos (
    id bigint NOT NULL,
    tipo_habitacion_id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    codigo integer NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.habitacion_eventos OWNER TO postgres;

--
-- Name: habitacion_eventos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.habitacion_eventos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.habitacion_eventos_id_seq OWNER TO postgres;

--
-- Name: habitacion_eventos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.habitacion_eventos_id_seq OWNED BY public.habitacion_eventos.id;


--
-- Name: hospedajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospedajes (
    id bigint NOT NULL,
    reserva_id bigint NOT NULL,
    tipo_habitacion_id bigint NOT NULL,
    cantidad_adultos integer DEFAULT 0 NOT NULL,
    cantidad_infantes integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.hospedajes OWNER TO postgres;

--
-- Name: hospedajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hospedajes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hospedajes_id_seq OWNER TO postgres;

--
-- Name: hospedajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hospedajes_id_seq OWNED BY public.hospedajes.id;


--
-- Name: imagenes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagenes (
    id bigint NOT NULL,
    url_image character varying(255) NOT NULL,
    imageable_type character varying(255) NOT NULL,
    imageable_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.imagenes OWNER TO postgres;

--
-- Name: imagenes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagenes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagenes_id_seq OWNER TO postgres;

--
-- Name: imagenes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imagenes_id_seq OWNED BY public.imagenes.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO postgres;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: model_has_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


ALTER TABLE public.model_has_permissions OWNER TO postgres;

--
-- Name: model_has_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL
);


ALTER TABLE public.model_has_roles OWNER TO postgres;

--
-- Name: pagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagos (
    id bigint NOT NULL,
    pago_id character varying(255),
    factura_id bigint NOT NULL,
    monto numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.pagos OWNER TO postgres;

--
-- Name: pagos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagos_id_seq OWNER TO postgres;

--
-- Name: pagos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagos_id_seq OWNED BY public.pagos.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: platillos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platillos (
    id bigint NOT NULL,
    categoria_id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    ingredientes character varying(255),
    image_url character varying(255),
    precio numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.platillos OWNER TO postgres;

--
-- Name: platillos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.platillos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.platillos_id_seq OWNER TO postgres;

--
-- Name: platillos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.platillos_id_seq OWNED BY public.platillos.id;


--
-- Name: promos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promos (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    fecha_inicio date,
    fecha_fin date,
    image_url character varying(255),
    stock integer DEFAULT 0 NOT NULL,
    precio_promo numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    precio_normal numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.promos OWNER TO postgres;

--
-- Name: promos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promos_id_seq OWNER TO postgres;

--
-- Name: promos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promos_id_seq OWNED BY public.promos.id;


--
-- Name: recepcionistas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recepcionistas (
    id bigint NOT NULL,
    direccion character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.recepcionistas OWNER TO postgres;

--
-- Name: reservas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservas (
    id bigint NOT NULL,
    cliente_id bigint NOT NULL,
    promo_id bigint,
    total_cantidad_adultos integer DEFAULT 0 NOT NULL,
    total_cantidad_infantes integer DEFAULT 0 NOT NULL,
    fecha_reserva date NOT NULL,
    dias_estadia character varying(255) NOT NULL,
    estado character varying(255) DEFAULT 'pendiente'::character varying NOT NULL,
    tipo_reserva character varying(100) NOT NULL,
    porcentaje_descuento numeric(8,2) DEFAULT '0'::numeric NOT NULL,
    monto_total numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    pago_inicial numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    tipo_viaje character varying(100) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.reservas OWNER TO postgres;

--
-- Name: reservas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservas_id_seq OWNER TO postgres;

--
-- Name: reservas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservas_id_seq OWNED BY public.reservas.id;


--
-- Name: role_has_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.role_has_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicios (
    id bigint NOT NULL,
    categoria_id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    precio numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.servicios OWNER TO postgres;

--
-- Name: servicios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicios_id_seq OWNER TO postgres;

--
-- Name: servicios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicios_id_seq OWNED BY public.servicios.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: tipo_habitacions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_habitacions (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    capacidad_adultos integer DEFAULT 0 NOT NULL,
    capacidad_infantes integer DEFAULT 0 NOT NULL,
    precio numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    capacidad_total integer DEFAULT 0 NOT NULL,
    tipo character varying(255) DEFAULT 'habitacion'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tipo_habitacions OWNER TO postgres;

--
-- Name: tipo_habitacions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_habitacions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_habitacions_id_seq OWNER TO postgres;

--
-- Name: tipo_habitacions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_habitacions_id_seq OWNED BY public.tipo_habitacions.id;


--
-- Name: tipo_pagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_pagos (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tipo_pagos OWNER TO postgres;

--
-- Name: tipo_pagos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_pagos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_pagos_id_seq OWNER TO postgres;

--
-- Name: tipo_pagos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_pagos_id_seq OWNED BY public.tipo_pagos.id;


--
-- Name: transaccions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaccions (
    id bigint NOT NULL,
    cuenta_id bigint NOT NULL,
    servicio_id bigint NOT NULL,
    platillo_id bigint NOT NULL,
    cantidad integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.transaccions OWNER TO postgres;

--
-- Name: transaccions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaccions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaccions_id_seq OWNER TO postgres;

--
-- Name: transaccions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaccions_id_seq OWNED BY public.transaccions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    edad integer,
    sexo character varying(1),
    telefono character varying(255),
    profile_icon character varying(255),
    tipo_nacionalidad character varying(255) DEFAULT 'nacional'::character varying NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    two_factor_secret text,
    two_factor_recovery_codes text,
    two_factor_confirmed_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: caracteristicas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas ALTER COLUMN id SET DEFAULT nextval('public.caracteristicas_id_seq'::regclass);


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: checkins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkins ALTER COLUMN id SET DEFAULT nextval('public.checkins_id_seq'::regclass);


--
-- Name: comentarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);


--
-- Name: configuracions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracions ALTER COLUMN id SET DEFAULT nextval('public.configuracions_id_seq'::regclass);


--
-- Name: cuentas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuentas ALTER COLUMN id SET DEFAULT nextval('public.cuentas_id_seq'::regclass);


--
-- Name: descuentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.descuentos ALTER COLUMN id SET DEFAULT nextval('public.descuentos_id_seq'::regclass);


--
-- Name: detalle_promos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_promos ALTER COLUMN id SET DEFAULT nextval('public.detalle_promos_id_seq'::regclass);


--
-- Name: documentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos ALTER COLUMN id SET DEFAULT nextval('public.documentos_id_seq'::regclass);


--
-- Name: facturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas ALTER COLUMN id SET DEFAULT nextval('public.facturas_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: garantes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.garantes ALTER COLUMN id SET DEFAULT nextval('public.garantes_id_seq'::regclass);


--
-- Name: habitacion_caracteristicas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_caracteristicas ALTER COLUMN id SET DEFAULT nextval('public.habitacion_caracteristicas_id_seq'::regclass);


--
-- Name: habitacion_eventos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_eventos ALTER COLUMN id SET DEFAULT nextval('public.habitacion_eventos_id_seq'::regclass);


--
-- Name: hospedajes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospedajes ALTER COLUMN id SET DEFAULT nextval('public.hospedajes_id_seq'::regclass);


--
-- Name: imagenes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes ALTER COLUMN id SET DEFAULT nextval('public.imagenes_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: pagos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos ALTER COLUMN id SET DEFAULT nextval('public.pagos_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: platillos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platillos ALTER COLUMN id SET DEFAULT nextval('public.platillos_id_seq'::regclass);


--
-- Name: promos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promos ALTER COLUMN id SET DEFAULT nextval('public.promos_id_seq'::regclass);


--
-- Name: reservas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas ALTER COLUMN id SET DEFAULT nextval('public.reservas_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: servicios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios ALTER COLUMN id SET DEFAULT nextval('public.servicios_id_seq'::regclass);


--
-- Name: tipo_habitacions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_habitacions ALTER COLUMN id SET DEFAULT nextval('public.tipo_habitacions_id_seq'::regclass);


--
-- Name: tipo_pagos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_pagos ALTER COLUMN id SET DEFAULT nextval('public.tipo_pagos_id_seq'::regclass);


--
-- Name: transaccions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccions ALTER COLUMN id SET DEFAULT nextval('public.transaccions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: caracteristicas caracteristicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas
    ADD CONSTRAINT caracteristicas_pkey PRIMARY KEY (id);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: checkins checkins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkins
    ADD CONSTRAINT checkins_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: comentarios comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);


--
-- Name: configuracions configuracions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracions
    ADD CONSTRAINT configuracions_pkey PRIMARY KEY (id);


--
-- Name: cuentas cuentas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuentas
    ADD CONSTRAINT cuentas_pkey PRIMARY KEY (id);


--
-- Name: descuentos descuentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.descuentos
    ADD CONSTRAINT descuentos_pkey PRIMARY KEY (id);


--
-- Name: detalle_promos detalle_promos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_promos
    ADD CONSTRAINT detalle_promos_pkey PRIMARY KEY (id);


--
-- Name: documentos documentos_documento_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_documento_unique UNIQUE (documento);


--
-- Name: documentos documentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_pkey PRIMARY KEY (id);


--
-- Name: documentos documentos_usuario_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_usuario_id_unique UNIQUE (usuario_id);


--
-- Name: facturas facturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: garantes garantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.garantes
    ADD CONSTRAINT garantes_pkey PRIMARY KEY (id);


--
-- Name: habitacion_caracteristicas habitacion_caracteristicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_caracteristicas
    ADD CONSTRAINT habitacion_caracteristicas_pkey PRIMARY KEY (id);


--
-- Name: habitacion_eventos habitacion_eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_eventos
    ADD CONSTRAINT habitacion_eventos_pkey PRIMARY KEY (id);


--
-- Name: hospedajes hospedajes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospedajes
    ADD CONSTRAINT hospedajes_pkey PRIMARY KEY (id);


--
-- Name: imagenes imagenes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagenes
    ADD CONSTRAINT imagenes_pkey PRIMARY KEY (id);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: model_has_permissions model_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_pkey PRIMARY KEY (permission_id, model_id, model_type);


--
-- Name: model_has_roles model_has_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_pkey PRIMARY KEY (role_id, model_id, model_type);


--
-- Name: pagos pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: permissions permissions_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: platillos platillos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platillos
    ADD CONSTRAINT platillos_pkey PRIMARY KEY (id);


--
-- Name: promos promos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promos
    ADD CONSTRAINT promos_pkey PRIMARY KEY (id);


--
-- Name: recepcionistas recepcionistas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recepcionistas
    ADD CONSTRAINT recepcionistas_pkey PRIMARY KEY (id);


--
-- Name: reservas reservas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (id);


--
-- Name: role_has_permissions role_has_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_pkey PRIMARY KEY (permission_id, role_id);


--
-- Name: roles roles_name_guard_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: tipo_habitacions tipo_habitacions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_habitacions
    ADD CONSTRAINT tipo_habitacions_pkey PRIMARY KEY (id);


--
-- Name: tipo_pagos tipo_pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_pagos
    ADD CONSTRAINT tipo_pagos_pkey PRIMARY KEY (id);


--
-- Name: transaccions transaccions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccions
    ADD CONSTRAINT transaccions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: imagenes_imageable_type_imageable_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX imagenes_imageable_type_imageable_id_index ON public.imagenes USING btree (imageable_type, imageable_id);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: model_has_permissions_model_id_model_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);


--
-- Name: model_has_roles_model_id_model_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: checkins checkins_cliente_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkins
    ADD CONSTRAINT checkins_cliente_id_foreign FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);


--
-- Name: checkins checkins_habitacion_evento_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkins
    ADD CONSTRAINT checkins_habitacion_evento_id_foreign FOREIGN KEY (habitacion_evento_id) REFERENCES public.habitacion_eventos(id);


--
-- Name: checkins checkins_recepcionista_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkins
    ADD CONSTRAINT checkins_recepcionista_id_foreign FOREIGN KEY (recepcionista_id) REFERENCES public.recepcionistas(id);


--
-- Name: checkins checkins_reserva_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkins
    ADD CONSTRAINT checkins_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id);


--
-- Name: clientes clientes_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_id_foreign FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comentarios comentarios_usuario_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.users(id);


--
-- Name: cuentas cuentas_checkin_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuentas
    ADD CONSTRAINT cuentas_checkin_id_foreign FOREIGN KEY (checkin_id) REFERENCES public.checkins(id);


--
-- Name: detalle_promos detalle_promos_platillo_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_promos
    ADD CONSTRAINT detalle_promos_platillo_id_foreign FOREIGN KEY (platillo_id) REFERENCES public.platillos(id);


--
-- Name: detalle_promos detalle_promos_promo_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_promos
    ADD CONSTRAINT detalle_promos_promo_id_foreign FOREIGN KEY (promo_id) REFERENCES public.promos(id);


--
-- Name: detalle_promos detalle_promos_servicio_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_promos
    ADD CONSTRAINT detalle_promos_servicio_id_foreign FOREIGN KEY (servicio_id) REFERENCES public.servicios(id);


--
-- Name: detalle_promos detalle_promos_tipo_habitacion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_promos
    ADD CONSTRAINT detalle_promos_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id);


--
-- Name: documentos documentos_usuario_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: facturas facturas_checkin_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_checkin_id_foreign FOREIGN KEY (checkin_id) REFERENCES public.checkins(id);


--
-- Name: facturas facturas_cuenta_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_cuenta_id_foreign FOREIGN KEY (cuenta_id) REFERENCES public.cuentas(id);


--
-- Name: facturas facturas_reserva_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id);


--
-- Name: facturas facturas_tipo_pago_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_tipo_pago_id_foreign FOREIGN KEY (tipo_pago_id) REFERENCES public.tipo_pagos(id);


--
-- Name: garantes garantes_reserva_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.garantes
    ADD CONSTRAINT garantes_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id);


--
-- Name: habitacion_caracteristicas habitacion_caracteristicas_caracteristica_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_caracteristicas
    ADD CONSTRAINT habitacion_caracteristicas_caracteristica_id_foreign FOREIGN KEY (caracteristica_id) REFERENCES public.caracteristicas(id);


--
-- Name: habitacion_caracteristicas habitacion_caracteristicas_tipo_habitacion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_caracteristicas
    ADD CONSTRAINT habitacion_caracteristicas_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id);


--
-- Name: habitacion_eventos habitacion_eventos_tipo_habitacion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.habitacion_eventos
    ADD CONSTRAINT habitacion_eventos_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id);


--
-- Name: hospedajes hospedajes_reserva_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospedajes
    ADD CONSTRAINT hospedajes_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id);


--
-- Name: hospedajes hospedajes_tipo_habitacion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospedajes
    ADD CONSTRAINT hospedajes_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id);


--
-- Name: model_has_permissions model_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_has_permissions
    ADD CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: model_has_roles model_has_roles_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_has_roles
    ADD CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: pagos pagos_factura_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_factura_id_foreign FOREIGN KEY (factura_id) REFERENCES public.facturas(id);


--
-- Name: platillos platillos_categoria_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platillos
    ADD CONSTRAINT platillos_categoria_id_foreign FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);


--
-- Name: recepcionistas recepcionistas_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recepcionistas
    ADD CONSTRAINT recepcionistas_id_foreign FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reservas reservas_cliente_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_cliente_id_foreign FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);


--
-- Name: reservas reservas_promo_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_promo_id_foreign FOREIGN KEY (promo_id) REFERENCES public.promos(id);


--
-- Name: role_has_permissions role_has_permissions_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: role_has_permissions role_has_permissions_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_has_permissions
    ADD CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: servicios servicios_categoria_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_categoria_id_foreign FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);


--
-- Name: transaccions transaccions_cuenta_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccions
    ADD CONSTRAINT transaccions_cuenta_id_foreign FOREIGN KEY (cuenta_id) REFERENCES public.cuentas(id);


--
-- Name: transaccions transaccions_platillo_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccions
    ADD CONSTRAINT transaccions_platillo_id_foreign FOREIGN KEY (platillo_id) REFERENCES public.platillos(id);


--
-- Name: transaccions transaccions_servicio_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccions
    ADD CONSTRAINT transaccions_servicio_id_foreign FOREIGN KEY (servicio_id) REFERENCES public.servicios(id);


--
-- PostgreSQL database dump complete
--

\unrestrict lv3u59d9dYMCJZrS7WFMIiDQPOD5x2JzYHwE6aDK1O578mEc94ai4gYUNwMURbe

