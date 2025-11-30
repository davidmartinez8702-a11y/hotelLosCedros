--
-- NOTA: No se requiere la sección CREATE SEQUENCE, ya que el tipo BIGSERIAL
--       automáticamente crea la secuencia interna para cada tabla.
--

--
-- 1. CREACIÓN DE TABLAS PRINCIPALES (Usando BIGSERIAL para el ID)
--

CREATE TABLE public.users (
    id BIGSERIAL PRIMARY KEY,
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
    
);

CREATE TABLE public.caracteristicas (
    id BIGSERIAL PRIMARY KEY,
    nombre character varying(255) NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.categorias (
    id BIGSERIAL PRIMARY KEY,
    nombre character varying(100) NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.tipo_habitacions (
    id BIGSERIAL PRIMARY KEY,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    estado character varying(255) NOT NULL DEFAULT 'activo',
    capacidad_adultos integer NOT NULL DEFAULT 0,
    capacidad_infantes integer NOT NULL DEFAULT 0,
    precio numeric(10,2) NOT NULL DEFAULT 0.00,
    capacidad_total integer NOT NULL DEFAULT 0,
    tipo character varying(255) NOT NULL DEFAULT 'habitacion',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.tipo_pagos (
    id BIGSERIAL PRIMARY KEY,
    nombre character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.promos (
    id BIGSERIAL PRIMARY KEY,
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
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.configuracions (
    id BIGSERIAL PRIMARY KEY,
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

-- Tablas de Laravel/Spatie
CREATE TABLE public.failed_jobs (
    id BIGSERIAL PRIMARY KEY,
    uuid character varying(255) NOT NULL UNIQUE,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.permissions (
    id BIGSERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT permissions_name_guard_name_unique UNIQUE (name, guard_name)
);

CREATE TABLE public.roles (
    id BIGSERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    guard_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT roles_name_guard_name_unique UNIQUE (name, guard_name)
);

----------------------------------------------------------------------------------------------------

--
-- 2. CREACIÓN DE TABLAS DEPENDIENTES (FKs Inline con REFERENCES)
--

-- Clientes y Recepcionistas (ID es PK y FK al mismo tiempo)
CREATE TABLE public.clientes (
    id bigint PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.recepcionistas (
    id bigint PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    direccion character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.documentos (
    id BIGSERIAL PRIMARY KEY,
    usuario_id bigint NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    tipo character varying(255) NOT NULL,
    documento character varying(255) NOT NULL UNIQUE,
    nacionalidad character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.comentarios (
    id BIGSERIAL PRIMARY KEY,
    usuario_id bigint NOT NULL REFERENCES public.users(id),
    contenido character varying(255) NOT NULL,
    calificacion integer NOT NULL DEFAULT 0,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.servicios (
    id BIGSERIAL PRIMARY KEY,
    categoria_id bigint NOT NULL REFERENCES public.categorias(id),
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    precio numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.platillos (
    id BIGSERIAL PRIMARY KEY,
    categoria_id bigint NOT NULL REFERENCES public.categorias(id),
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    ingredientes character varying(255),
    image_url character varying(255),
    precio numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.habitacion_eventos (
    id BIGSERIAL PRIMARY KEY,
    tipo_habitacion_id bigint NOT NULL REFERENCES public.tipo_habitacions(id),
    nombre character varying(255) NOT NULL,
    codigo integer NOT NULL,
    estado character varying(255) NOT NULL DEFAULT 'activo',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.habitacion_caracteristicas (
    id BIGSERIAL PRIMARY KEY,
    tipo_habitacion_id bigint NOT NULL REFERENCES public.tipo_habitacions(id),
    caracteristica_id bigint NOT NULL REFERENCES public.caracteristicas(id),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.reservas (
    id BIGSERIAL PRIMARY KEY,
    cliente_id bigint NOT NULL REFERENCES public.clientes(id),
    promo_id bigint REFERENCES public.promos(id),
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
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.garantes (
    id BIGSERIAL PRIMARY KEY,
    reserva_id bigint NOT NULL REFERENCES public.reservas(id),
    tipo_tarjeta character varying(255) NOT NULL,
    nro_tarjeta character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.hospedajes (
    id BIGSERIAL PRIMARY KEY,
    reserva_id bigint NOT NULL REFERENCES public.reservas(id),
    tipo_habitacion_id bigint NOT NULL REFERENCES public.tipo_habitacions(id),
    cantidad_adultos integer NOT NULL DEFAULT 0,
    cantidad_infantes integer NOT NULL DEFAULT 0,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.checkins (
    id BIGSERIAL PRIMARY KEY,
    reserva_id bigint NOT NULL REFERENCES public.reservas(id),
    recepcionista_id bigint NOT NULL REFERENCES public.recepcionistas(id),
    cliente_id bigint NOT NULL REFERENCES public.clientes(id),
    habitacion_evento_id bigint NOT NULL REFERENCES public.habitacion_eventos(id),
    fecha_entrada date NOT NULL,
    fecha_salida date,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.cuentas (
    id BIGSERIAL PRIMARY KEY,
    checkin_id bigint NOT NULL REFERENCES public.checkins(id),
    monto_total numeric(10,2) NOT NULL DEFAULT 0.00,
    monto_pagado numeric(10,2) NOT NULL DEFAULT 0.00,
    saldo numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(100) NOT NULL DEFAULT 'pendiente',
    fecha_pago date,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.transaccions (
    id BIGSERIAL PRIMARY KEY,
    cuenta_id bigint NOT NULL REFERENCES public.cuentas(id),
    servicio_id bigint NOT NULL REFERENCES public.servicios(id),
    platillo_id bigint NOT NULL REFERENCES public.platillos(id),
    cantidad integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.facturas (
    id BIGSERIAL PRIMARY KEY,
    cuenta_id bigint NOT NULL REFERENCES public.cuentas(id),
    reserva_id bigint NOT NULL REFERENCES public.reservas(id),
    checkin_id bigint NOT NULL REFERENCES public.checkins(id),
    tipo_pago_id bigint NOT NULL REFERENCES public.tipo_pagos(id),
    monto_total numeric(10,2) NOT NULL DEFAULT 0.00,
    monto_relativo numeric(10,2) NOT NULL DEFAULT 0.00,
    estado character varying(100) NOT NULL DEFAULT 'pendiente',
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.pagos (
    id BIGSERIAL PRIMARY KEY,
    pago_id character varying(255),
    factura_id bigint NOT NULL REFERENCES public.facturas(id),
    monto numeric(10,2) NOT NULL DEFAULT 0.00,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.detalle_promos (
    id BIGSERIAL PRIMARY KEY,
    promo_id bigint NOT NULL REFERENCES public.promos(id),
    tipo_habitacion_id bigint NOT NULL REFERENCES public.tipo_habitacions(id),
    servicio_id bigint NOT NULL REFERENCES public.servicios(id),
    platillo_id bigint NOT NULL REFERENCES public.platillos(id),
    detalle character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);

CREATE TABLE public.imagenes (
    id BIGSERIAL PRIMARY KEY,
    url_image character varying(255) NOT NULL,
    imageable_type character varying(255) NOT NULL,
    imageable_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
CREATE INDEX imagenes_imageable_type_imageable_id_index ON public.imagenes USING btree (imageable_type, imageable_id);

--
-- 3. SPATIE PERMISSIONS (Tablas M:M)
--

CREATE TABLE public.model_has_permissions (
    permission_id bigint NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL,
    PRIMARY KEY (permission_id, model_id, model_type)
);
CREATE INDEX model_has_permissions_model_id_model_type_index ON public.model_has_permissions USING btree (model_id, model_type);

CREATE TABLE public.model_has_roles (
    role_id bigint NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    model_type character varying(255) NOT NULL,
    model_id bigint NOT NULL,
    PRIMARY KEY (role_id, model_id, model_type)
);
CREATE INDEX model_has_roles_model_id_model_type_index ON public.model_has_roles USING btree (model_id, model_type);

CREATE TABLE public.role_has_permissions (
    permission_id bigint NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    role_id bigint NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (permission_id, role_id)
);