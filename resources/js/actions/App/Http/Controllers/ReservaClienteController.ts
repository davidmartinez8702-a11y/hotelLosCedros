import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reservas/cliente',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reservas/cliente/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
export const confirmacion = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmacion.url(options),
    method: 'get',
})

confirmacion.definition = {
    methods: ["get","head"],
    url: '/reservas/cliente/confirmacion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
confirmacion.url = (options?: RouteQueryOptions) => {
    return confirmacion.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
confirmacion.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmacion.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
confirmacion.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmacion.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
    const confirmacionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirmacion.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
        confirmacionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmacion.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
        confirmacionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmacion.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirmacion.form = confirmacionForm
/**
* @see \App\Http\Controllers\ReservaClienteController::buscarDisponibilidad
 * @see app/Http/Controllers/ReservaClienteController.php:32
 * @route '/api/reservas/cliente/disponibilidad'
 */
export const buscarDisponibilidad = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buscarDisponibilidad.url(options),
    method: 'post',
})

buscarDisponibilidad.definition = {
    methods: ["post"],
    url: '/api/reservas/cliente/disponibilidad',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::buscarDisponibilidad
 * @see app/Http/Controllers/ReservaClienteController.php:32
 * @route '/api/reservas/cliente/disponibilidad'
 */
buscarDisponibilidad.url = (options?: RouteQueryOptions) => {
    return buscarDisponibilidad.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::buscarDisponibilidad
 * @see app/Http/Controllers/ReservaClienteController.php:32
 * @route '/api/reservas/cliente/disponibilidad'
 */
buscarDisponibilidad.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buscarDisponibilidad.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::buscarDisponibilidad
 * @see app/Http/Controllers/ReservaClienteController.php:32
 * @route '/api/reservas/cliente/disponibilidad'
 */
    const buscarDisponibilidadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: buscarDisponibilidad.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::buscarDisponibilidad
 * @see app/Http/Controllers/ReservaClienteController.php:32
 * @route '/api/reservas/cliente/disponibilidad'
 */
        buscarDisponibilidadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: buscarDisponibilidad.url(options),
            method: 'post',
        })
    
    buscarDisponibilidad.form = buscarDisponibilidadForm
/**
* @see \App\Http\Controllers\ReservaClienteController::calcularPrecio
 * @see app/Http/Controllers/ReservaClienteController.php:94
 * @route '/api/reservas/cliente/calcular-precio'
 */
export const calcularPrecio = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calcularPrecio.url(options),
    method: 'post',
})

calcularPrecio.definition = {
    methods: ["post"],
    url: '/api/reservas/cliente/calcular-precio',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::calcularPrecio
 * @see app/Http/Controllers/ReservaClienteController.php:94
 * @route '/api/reservas/cliente/calcular-precio'
 */
calcularPrecio.url = (options?: RouteQueryOptions) => {
    return calcularPrecio.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::calcularPrecio
 * @see app/Http/Controllers/ReservaClienteController.php:94
 * @route '/api/reservas/cliente/calcular-precio'
 */
calcularPrecio.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calcularPrecio.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::calcularPrecio
 * @see app/Http/Controllers/ReservaClienteController.php:94
 * @route '/api/reservas/cliente/calcular-precio'
 */
    const calcularPrecioForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: calcularPrecio.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::calcularPrecio
 * @see app/Http/Controllers/ReservaClienteController.php:94
 * @route '/api/reservas/cliente/calcular-precio'
 */
        calcularPrecioForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: calcularPrecio.url(options),
            method: 'post',
        })
    
    calcularPrecio.form = calcularPrecioForm
/**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
export const obtenerPromociones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: obtenerPromociones.url(options),
    method: 'get',
})

obtenerPromociones.definition = {
    methods: ["get","head"],
    url: '/api/reservas/cliente/promociones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
obtenerPromociones.url = (options?: RouteQueryOptions) => {
    return obtenerPromociones.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
obtenerPromociones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: obtenerPromociones.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
obtenerPromociones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: obtenerPromociones.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
    const obtenerPromocionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: obtenerPromociones.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
        obtenerPromocionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: obtenerPromociones.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::obtenerPromociones
 * @see app/Http/Controllers/ReservaClienteController.php:496
 * @route '/api/reservas/cliente/promociones'
 */
        obtenerPromocionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: obtenerPromociones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    obtenerPromociones.form = obtenerPromocionesForm
/**
* @see \App\Http\Controllers\ReservaClienteController::store
 * @see app/Http/Controllers/ReservaClienteController.php:158
 * @route '/api/reservas/cliente'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/reservas/cliente',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::store
 * @see app/Http/Controllers/ReservaClienteController.php:158
 * @route '/api/reservas/cliente'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::store
 * @see app/Http/Controllers/ReservaClienteController.php:158
 * @route '/api/reservas/cliente'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::store
 * @see app/Http/Controllers/ReservaClienteController.php:158
 * @route '/api/reservas/cliente'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::store
 * @see app/Http/Controllers/ReservaClienteController.php:158
 * @route '/api/reservas/cliente'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ReservaClienteController::reenviarEmail
 * @see app/Http/Controllers/ReservaClienteController.php:646
 * @route '/api/reservas/{reserva}/reenviar-email'
 */
export const reenviarEmail = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reenviarEmail.url(args, options),
    method: 'post',
})

reenviarEmail.definition = {
    methods: ["post"],
    url: '/api/reservas/{reserva}/reenviar-email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::reenviarEmail
 * @see app/Http/Controllers/ReservaClienteController.php:646
 * @route '/api/reservas/{reserva}/reenviar-email'
 */
reenviarEmail.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reserva: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reserva: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reserva: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reserva: typeof args.reserva === 'object'
                ? args.reserva.id
                : args.reserva,
                }

    return reenviarEmail.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::reenviarEmail
 * @see app/Http/Controllers/ReservaClienteController.php:646
 * @route '/api/reservas/{reserva}/reenviar-email'
 */
reenviarEmail.post = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reenviarEmail.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::reenviarEmail
 * @see app/Http/Controllers/ReservaClienteController.php:646
 * @route '/api/reservas/{reserva}/reenviar-email'
 */
    const reenviarEmailForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reenviarEmail.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::reenviarEmail
 * @see app/Http/Controllers/ReservaClienteController.php:646
 * @route '/api/reservas/{reserva}/reenviar-email'
 */
        reenviarEmailForm.post = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reenviarEmail.url(args, options),
            method: 'post',
        })
    
    reenviarEmail.form = reenviarEmailForm
const ReservaClienteController = { index, create, confirmacion, buscarDisponibilidad, calcularPrecio, obtenerPromociones, store, reenviarEmail }

export default ReservaClienteController