import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
export const distribucion = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: distribucion.url(args, options),
    method: 'get',
})

distribucion.definition = {
    methods: ["get","head"],
    url: '/recepcion/{reserva}/reporte-distribucion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
distribucion.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return distribucion.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
distribucion.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: distribucion.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
distribucion.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: distribucion.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
    const distribucionForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: distribucion.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
        distribucionForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: distribucion.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::distribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
        distribucionForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: distribucion.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    distribucion.form = distribucionForm
/**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
export const asignacion = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: asignacion.url(args, options),
    method: 'get',
})

asignacion.definition = {
    methods: ["get","head"],
    url: '/recepcion/{reserva}/reporte-asignacion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
asignacion.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return asignacion.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
asignacion.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: asignacion.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
asignacion.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: asignacion.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
    const asignacionForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: asignacion.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
        asignacionForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: asignacion.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::asignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
        asignacionForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: asignacion.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    asignacion.form = asignacionForm
const reporte = {
    distribucion: Object.assign(distribucion, distribucion),
asignacion: Object.assign(asignacion, asignacion),
}

export default reporte