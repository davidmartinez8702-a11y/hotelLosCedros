--
-- 1. CREACIÓN DE SECUENCIAS
--

CREATE SEQUENCE caracteristicas_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE categorias_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE checkins_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE comentarios_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE configuracions_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE cuentas_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE descuentos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE detalle_promos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE documentos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE facturas_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE failed_jobs_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE garantes_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE habitacion_caracteristicas_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE habitacion_eventos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE hospedajes_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE imagenes_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE jobs_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE migrations_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE pagos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE permissions_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE platillos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE promos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE reservas_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE roles_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE servicios_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE tipo_habitacions_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE tipo_pagos_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE transaccions_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE users_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

--
-- 2. CREACIÓN DE TABLAS (Sin FKs Inline)
--

CREATE TABLE public.users (
    id bigint DEFAULT nextval('users_id_seq'::regclass),
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    edad integer,
    sexo character varying(1),
    telefono character varying(255),
    profile_icon character varying(255),
    tipo_nacionalidad character varying(255) NOT NULL DEFAULT 'nacional',
    email character varying(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.caracteristicas (
    id bigint DEFAULT nextval('caracteristicas_id_seq'::regclass),
    nombre character varying(255) NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT caracteristicas_pkey PRIMARY KEY (id)
);

CREATE TABLE public.categorias (
    id bigint DEFAULT nextval('categorias_id_seq'::regclass),
    nombre character varying(100) NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT categorias_pkey PRIMARY KEY (id)
);

CREATE TABLE public.tipo_habitacions (
    id bigint DEFAULT nextval('tipo_habitacions_id_seq'::regclass),
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    estado character varying(255) NOT NULL DEFAULT 'activo',
    capacidad_adultos integer NOT NULL DEFAULT 0,
    capacidad_infantes integer NOT NULL DEFAULT 0,
    precio numeric(10,2) NOT NULL DEFAULT 0.00,
    capacidad_total integer NOT NULL DEFAULT 0,
    tipo character varying(255) NOT NULL DEFAULT 'habitacion',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT tipo_habitacions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.tipo_pagos (
    id bigint DEFAULT nextval('tipo_pagos_id_seq'::regclass),
    nombre character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT tipo_pagos_pkey PRIMARY KEY (id)
);

CREATE TABLE public.promos (
    id bigint DEFAULT nextval('promos_id_seq'::regclass),
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    estado character varying(255) NOT NULL DEFAULT 'activo',
    fecha_inicio date,
    fecha_fin date,
    image_url character varying(255),
    stock integer NOT NULL DEFAULT 0,
    precio_promo numeric(10,2) NOT NULL DEFAULT 0.00,
    precio_normal numeric(10,2) NOT NULL DEFAULT 0.00,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT promos_pkey PRIMARY KEY (id)
);

CREATE TABLE public.configuracions (
    id bigint DEFAULT nextval('configuracions_id_seq'::regclass),
    porcentaje_descuento character varying(255) NOT NULL,
    nit character varying(255) NOT NULL,
    ubicacion character varying(255),
    telefono character varying(255),
    email character varying(255),
    logo character varying(255),
    nombre_hotel character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT configuracions_pkey PRIMARY KEY (id)
);

-- Tablas de Spatie (Solo las principales)
CREATE TABLE public.permissions (
    id bigint DEFAULT nextval('permissions_id_seq'::regclass),
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT permissions_pkey PRIMARY KEY (id),
    CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name)
);

CREATE TABLE public.roles (
    id bigint DEFAULT nextval('roles_id_seq'::regclass),
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name)
);

-- Tablas de Laravel Base
CREATE TABLE public.failed_jobs (
    id bigint PRIMARY KEY DEFAULT nextval('failed_jobs_id_seq'::regclass),
    uuid character varying(255) NOT NULL UNIQUE,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE public.clientes (
    id bigint, 
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT clientes_pkey PRIMARY KEY (id),
    CONSTRAINT clientes_id_foreign FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE TABLE public.recepcionistas (
    id bigint, 
    direccion character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT recepcionistas_pkey PRIMARY KEY (id),
    CONSTRAINT recepcionistas_id_foreign FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE TABLE public.documentos (
    id bigint DEFAULT nextval('documentos_id_seq'::regclass),
    usuario_id bigint NOT NULL UNIQUE,
    tipo character varying(255) NOT NULL,
    documento character varying(255) NOT NULL UNIQUE,
    nacionalidad character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT documentos_pkey PRIMARY KEY (id),
    CONSTRAINT documentos_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE TABLE public.comentarios (
    id bigint DEFAULT nextval('comentarios_id_seq'::regclass),
    usuario_id bigint NOT NULL,
    contenido character varying(255) NOT NULL,
    calificacion integer NOT NULL DEFAULT 0,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT comentarios_pkey PRIMARY KEY (id),
    CONSTRAINT comentarios_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.users(id)
);

CREATE TABLE public.servicios (
    id bigint DEFAULT nextval('servicios_id_seq'::regclass),
    categoria_id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    precio numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT servicios_pkey PRIMARY KEY (id),
    CONSTRAINT servicios_categoria_id_foreign FOREIGN KEY (categoria_id) REFERENCES public.categorias(id)
);

CREATE TABLE public.platillos (
    id bigint DEFAULT nextval('platillos_id_seq'::regclass),
    categoria_id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    ingredientes character varying(255),
    image_url character varying(255),
    precio numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT platillos_pkey PRIMARY KEY (id),
    CONSTRAINT platillos_categoria_id_foreign FOREIGN KEY (categoria_id) REFERENCES public.categorias(id)
);

CREATE TABLE public.habitacion_eventos (
    id bigint DEFAULT nextval('habitacion_eventos_id_seq'::regclass),
    tipo_habitacion_id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    codigo integer NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT habitacion_eventos_pkey PRIMARY KEY (id);
    CONSTRAINT habitacion_eventos_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id)
);

CREATE TABLE public.habitacion_caracteristicas (
    id bigint DEFAULT nextval('habitacion_caracteristicas_id_seq'::regclass),
    tipo_habitacion_id bigint NOT NULL,
    caracteristica_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT habitacion_caracteristicas_pkey PRIMARY KEY (id),
    CONSTRAINT habitacion_caracteristicas_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id),
    CONSTRAINT habitacion_caracteristicas_caracteristica_id_foreign FOREIGN KEY (caracteristica_id) REFERENCES public.caracteristicas(id)
);

CREATE TABLE public.reservas (
    id bigint DEFAULT nextval('reservas_id_seq'::regclass),
    cliente_id bigint NOT NULL,
    promo_id bigint,
    total_cantidad_adultos integer NOT NULL DEFAULT 0,
    total_cantidad_infantes integer NOT NULL DEFAULT 0,
    fecha_reserva date NOT NULL,
    dias_estadia character varying(255) NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'pendiente',
    tipo_reserva character varying(100) NOT NULL,
    porcentaje_descuento numeric(8,2) NOT NULL DEFAULT 0.00,
    monto_total numeric(10,2) NOT NULL DEFAULT 0.00,
    pago_inicial numeric(10,2) NOT NULL DEFAULT 0.00,
    tipo_viaje character varying(100) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT reservas_pkey PRIMARY KEY (id),
    CONSTRAINT reservas_cliente_id_foreign FOREIGN KEY (cliente_id) REFERENCES public.clientes(id),
    CONSTRAINT reservas_promo_id_foreign FOREIGN KEY (promo_id) REFERENCES public.promos(id)
);

CREATE TABLE public.garantes (
    id bigint DEFAULT nextval('garantes_id_seq'::regclass),
    reserva_id bigint NOT NULL,
    tipo_tarjeta character varying(255) NOT NULL,
    nro_tarjeta character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT garantes_pkey PRIMARY KEY (id),
    CONSTRAINT garantes_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id)
);

CREATE TABLE public.hospedajes (
    id bigint DEFAULT nextval('hospedajes_id_seq'::regclass),
    reserva_id bigint NOT NULL,
    tipo_habitacion_id bigint NOT NULL,
    cantidad_adultos integer NOT NULL DEFAULT 0,
    cantidad_infantes integer NOT NULL DEFAULT 0,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT hospedajes_pkey PRIMARY KEY (id),
    CONSTRAINT hospedajes_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id),
    CONSTRAINT hospedajes_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id)
);

CREATE TABLE public.checkins (
    id bigint DEFAULT nextval('checkins_id_seq'::regclass),
    reserva_id bigint NOT NULL,
    recepcionista_id bigint NOT NULL,
    cliente_id bigint NOT NULL,
    habitacion_evento_id bigint NOT NULL,
    fecha_entrada date NOT NULL,
    fecha_salida date,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT checkins_pkey PRIMARY KEY (id),
    CONSTRAINT checkins_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id),
    CONSTRAINT checkins_recepcionista_id_foreign FOREIGN KEY (recepcionista_id) REFERENCES public.recepcionistas(id),
    CONSTRAINT checkins_cliente_id_foreign FOREIGN KEY (cliente_id) REFERENCES public.clientes(id),
    CONSTRAINT checkins_habitacion_evento_id_foreign FOREIGN KEY (habitacion_evento_id) REFERENCES public.habitacion_eventos(id)
);

CREATE TABLE public.cuentas (
    id bigint DEFAULT nextval('cuentas_id_seq'::regclass),
    checkin_id bigint NOT NULL,
    monto_total numeric(10,2) NOT NULL DEFAULT 0.00,
    monto_pagado numeric(10,2) NOT NULL DEFAULT 0.00,
    saldo numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(100) NOT NULL DEFAULT 'pendiente',
    fecha_pago date,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT cuentas_pkey PRIMARY KEY (id),
    CONSTRAINT cuentas_checkin_id_foreign FOREIGN KEY (checkin_id) REFERENCES public.checkins(id)
);

CREATE TABLE public.transaccions (
    id bigint DEFAULT nextval('transaccions_id_seq'::regclass),
    cuenta_id bigint NOT NULL,
    servicio_id bigint NOT NULL,
    platillo_id bigint NOT NULL,
    cantidad integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT transaccions_pkey PRIMARY KEY (id),
    CONSTRAINT transaccions_cuenta_id_foreign FOREIGN KEY (cuenta_id) REFERENCES public.cuentas(id),
    CONSTRAINT transaccions_servicio_id_foreign FOREIGN KEY (servicio_id) REFERENCES public.servicios(id),
    CONSTRAINT transaccions_platillo_id_foreign FOREIGN KEY (platillo_id) REFERENCES public.platillos(id)
);

CREATE TABLE public.facturas (
    id bigint DEFAULT nextval('facturas_id_seq'::regclass),
    cuenta_id bigint NOT NULL,
    reserva_id bigint NOT NULL,
    checkin_id bigint NOT NULL,
    tipo_pago_id bigint NOT NULL,
    monto_total numeric(10,2) NOT NULL DEFAULT 0.00,
    monto_relativo numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(100) NOT NULL DEFAULT 'pendiente',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT facturas_pkey PRIMARY KEY (id),
    CONSTRAINT facturas_cuenta_id_foreign FOREIGN KEY (cuenta_id) REFERENCES public.cuentas(id),
    CONSTRAINT facturas_reserva_id_foreign FOREIGN KEY (reserva_id) REFERENCES public.reservas(id),
    CONSTRAINT facturas_checkin_id_foreign FOREIGN KEY (checkin_id) REFERENCES public.checkins(id),
    CONSTRAINT facturas_tipo_pago_id_foreign FOREIGN KEY (tipo_pago_id) REFERENCES public.tipo_pagos(id)
);

CREATE TABLE public.pagos (
    id bigint DEFAULT nextval('pagos_id_seq'::regclass),
    pago_id character varying(255),
    factura_id bigint NOT NULL,
    monto numeric(10,2) NOT NULL DEFAULT 0.00,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT pagos_pkey PRIMARY KEY (id),
    CONSTRAINT pagos_factura_id_foreign FOREIGN KEY (factura_id) REFERENCES public.facturas(id)
);

CREATE TABLE public.detalle_promos (
    id bigint DEFAULT nextval('detalle_promos_id_seq'::regclass),
    promo_id bigint NOT NULL,
    tipo_habitacion_id bigint NOT NULL,
    servicio_id bigint NOT NULL,
    platillo_id bigint NOT NULL,
    detalle character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT detalle_promos_pkey PRIMARY KEY (id),
    CONSTRAINT detalle_promos_promo_id_foreign FOREIGN KEY (promo_id) REFERENCES public.promos(id),
    CONSTRAINT detalle_promos_tipo_habitacion_id_foreign FOREIGN KEY (tipo_habitacion_id) REFERENCES public.tipo_habitacions(id),
    CONSTRAINT detalle_promos_servicio_id_foreign FOREIGN KEY (servicio_id) REFERENCES public.servicios(id),
    CONSTRAINT detalle_promos_platillo_id_foreign FOREIGN KEY (platillo_id) REFERENCES public.platillos(id)
);

CREATE TABLE public.imagenes (
    id bigint PRIMARY KEY DEFAULT nextval('imagenes_id_seq'::regclass),
    url_image character varying(255) NOT NULL,
    imageable_type character varying(255) NOT NULL,
    imageable_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
CREATE INDEX imagenes_imageable_type_imageable_id_index ON public.imagenes USING btree (imageable_type, imageable_id);

--
-- 4. SPATIE PERMISSIONS (FKs Out-of-Line)
--

CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL,
    CONSTRAINT model_has_permissions_pkey PRIMARY KEY (permission_id, model_id, model_type),
    CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE
);
CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);

CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL,
    CONSTRAINT model_has_roles_pkey PRIMARY KEY (role_id, model_id, model_type),
    CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE
);
CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);

CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL,
    role_id bigint NOT NULL,
    CONSTRAINT role_has_permissions_pkey PRIMARY KEY (permission_id, role_id),
    CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE,
    CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE
);