import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
export const informacion = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: informacion.url(options),
    method: 'get',
})

informacion.definition = {
    methods: ["get","head"],
    url: '/api/n8n/informacion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
informacion.url = (options?: RouteQueryOptions) => {
    return informacion.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
informacion.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: informacion.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
informacion.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: informacion.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
    const informacionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: informacion.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
        informacionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: informacion.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::informacion
 * @see app/Http/Controllers/Api/N8nHotelController.php:286
 * @route '/api/n8n/informacion'
 */
        informacionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: informacion.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    informacion.form = informacionForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
export const disponibilidad = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disponibilidad.url(options),
    method: 'get',
})

disponibilidad.definition = {
    methods: ["get","head"],
    url: '/api/n8n/disponibilidad',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
disponibilidad.url = (options?: RouteQueryOptions) => {
    return disponibilidad.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
disponibilidad.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disponibilidad.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
disponibilidad.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: disponibilidad.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
    const disponibilidadForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: disponibilidad.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
        disponibilidadForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: disponibilidad.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::disponibilidad
 * @see app/Http/Controllers/Api/N8nHotelController.php:37
 * @route '/api/n8n/disponibilidad'
 */
        disponibilidadForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: disponibilidad.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    disponibilidad.form = disponibilidadForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
export const listarHabitaciones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listarHabitaciones.url(options),
    method: 'get',
})

listarHabitaciones.definition = {
    methods: ["get","head"],
    url: '/api/n8n/habitaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
listarHabitaciones.url = (options?: RouteQueryOptions) => {
    return listarHabitaciones.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
listarHabitaciones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: listarHabitaciones.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
listarHabitaciones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: listarHabitaciones.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
    const listarHabitacionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: listarHabitaciones.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
        listarHabitacionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listarHabitaciones.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::listarHabitaciones
 * @see app/Http/Controllers/Api/N8nHotelController.php:134
 * @route '/api/n8n/habitaciones'
 */
        listarHabitacionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: listarHabitaciones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    listarHabitaciones.form = listarHabitacionesForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
export const promociones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: promociones.url(options),
    method: 'get',
})

promociones.definition = {
    methods: ["get","head"],
    url: '/api/n8n/promociones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
promociones.url = (options?: RouteQueryOptions) => {
    return promociones.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
promociones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: promociones.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
promociones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: promociones.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
    const promocionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: promociones.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
        promocionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: promociones.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::promociones
 * @see app/Http/Controllers/Api/N8nHotelController.php:178
 * @route '/api/n8n/promociones'
 */
        promocionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: promociones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    promociones.form = promocionesForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::calcularPrecio
 * @see app/Http/Controllers/Api/N8nHotelController.php:218
 * @route '/api/n8n/calcular-precio'
 */
export const calcularPrecio = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calcularPrecio.url(options),
    method: 'post',
})

calcularPrecio.definition = {
    methods: ["post"],
    url: '/api/n8n/calcular-precio',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::calcularPrecio
 * @see app/Http/Controllers/Api/N8nHotelController.php:218
 * @route '/api/n8n/calcular-precio'
 */
calcularPrecio.url = (options?: RouteQueryOptions) => {
    return calcularPrecio.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::calcularPrecio
 * @see app/Http/Controllers/Api/N8nHotelController.php:218
 * @route '/api/n8n/calcular-precio'
 */
calcularPrecio.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calcularPrecio.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::calcularPrecio
 * @see app/Http/Controllers/Api/N8nHotelController.php:218
 * @route '/api/n8n/calcular-precio'
 */
    const calcularPrecioForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: calcularPrecio.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::calcularPrecio
 * @see app/Http/Controllers/Api/N8nHotelController.php:218
 * @route '/api/n8n/calcular-precio'
 */
        calcularPrecioForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: calcularPrecio.url(options),
            method: 'post',
        })
    
    calcularPrecio.form = calcularPrecioForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
export const categorias = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categorias.url(options),
    method: 'get',
})

categorias.definition = {
    methods: ["get","head"],
    url: '/api/n8n/categorias',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
categorias.url = (options?: RouteQueryOptions) => {
    return categorias.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
categorias.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categorias.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
categorias.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categorias.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
    const categoriasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categorias.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
        categoriasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categorias.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::categorias
 * @see app/Http/Controllers/Api/N8nHotelController.php:503
 * @route '/api/n8n/categorias'
 */
        categoriasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categorias.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categorias.form = categoriasForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
export const servicios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: servicios.url(options),
    method: 'get',
})

servicios.definition = {
    methods: ["get","head"],
    url: '/api/n8n/servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
servicios.url = (options?: RouteQueryOptions) => {
    return servicios.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
servicios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: servicios.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
servicios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: servicios.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
    const serviciosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: servicios.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
        serviciosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: servicios.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::servicios
 * @see app/Http/Controllers/Api/N8nHotelController.php:340
 * @route '/api/n8n/servicios'
 */
        serviciosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: servicios.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    servicios.form = serviciosForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
export const detalleServicio = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detalleServicio.url(args, options),
    method: 'get',
})

detalleServicio.definition = {
    methods: ["get","head"],
    url: '/api/n8n/servicios/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
detalleServicio.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return detalleServicio.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
detalleServicio.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detalleServicio.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
detalleServicio.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detalleServicio.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
    const detalleServicioForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: detalleServicio.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
        detalleServicioForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detalleServicio.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::detalleServicio
 * @see app/Http/Controllers/Api/N8nHotelController.php:422
 * @route '/api/n8n/servicios/{id}'
 */
        detalleServicioForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detalleServicio.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    detalleServicio.form = detalleServicioForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
export const platillos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: platillos.url(options),
    method: 'get',
})

platillos.definition = {
    methods: ["get","head"],
    url: '/api/n8n/platillos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
platillos.url = (options?: RouteQueryOptions) => {
    return platillos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
platillos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: platillos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
platillos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: platillos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
    const platillosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: platillos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
        platillosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: platillos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::platillos
 * @see app/Http/Controllers/Api/N8nHotelController.php:382
 * @route '/api/n8n/platillos'
 */
        platillosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: platillos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    platillos.form = platillosForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
export const detallePlatillo = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detallePlatillo.url(args, options),
    method: 'get',
})

detallePlatillo.definition = {
    methods: ["get","head"],
    url: '/api/n8n/platillos/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
detallePlatillo.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return detallePlatillo.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
detallePlatillo.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detallePlatillo.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
detallePlatillo.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detallePlatillo.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
    const detallePlatilloForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: detallePlatillo.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
        detallePlatilloForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detallePlatillo.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\N8nHotelController::detallePlatillo
 * @see app/Http/Controllers/Api/N8nHotelController.php:461
 * @route '/api/n8n/platillos/{id}'
 */
        detallePlatilloForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: detallePlatillo.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    detallePlatillo.form = detallePlatilloForm
/**
* @see \App\Http\Controllers\Api\N8nHotelController::reservaCompleta
 * @see app/Http/Controllers/Api/N8nHotelController.php:543
 * @route '/api/n8n/reserva-completa'
 */
export const reservaCompleta = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reservaCompleta.url(options),
    method: 'post',
})

reservaCompleta.definition = {
    methods: ["post"],
    url: '/api/n8n/reserva-completa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\N8nHotelController::reservaCompleta
 * @see app/Http/Controllers/Api/N8nHotelController.php:543
 * @route '/api/n8n/reserva-completa'
 */
reservaCompleta.url = (options?: RouteQueryOptions) => {
    return reservaCompleta.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\N8nHotelController::reservaCompleta
 * @see app/Http/Controllers/Api/N8nHotelController.php:543
 * @route '/api/n8n/reserva-completa'
 */
reservaCompleta.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reservaCompleta.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\N8nHotelController::reservaCompleta
 * @see app/Http/Controllers/Api/N8nHotelController.php:543
 * @route '/api/n8n/reserva-completa'
 */
    const reservaCompletaForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reservaCompleta.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\N8nHotelController::reservaCompleta
 * @see app/Http/Controllers/Api/N8nHotelController.php:543
 * @route '/api/n8n/reserva-completa'
 */
        reservaCompletaForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reservaCompleta.url(options),
            method: 'post',
        })
    
    reservaCompleta.form = reservaCompletaForm
const N8nHotelController = { informacion, disponibilidad, listarHabitaciones, promociones, calcularPrecio, categorias, servicios, detalleServicio, platillos, detallePlatillo, reservaCompleta }

export default N8nHotelController