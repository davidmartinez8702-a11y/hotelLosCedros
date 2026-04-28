import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/recepcion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
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
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/recepcion/reservas/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
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
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
const show624def85b760484ee26d2357882432d8 = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show624def85b760484ee26d2357882432d8.url(args, options),
    method: 'get',
})

show624def85b760484ee26d2357882432d8.definition = {
    methods: ["get","head"],
    url: '/recepcion/reservas/{reserva}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
show624def85b760484ee26d2357882432d8.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show624def85b760484ee26d2357882432d8.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
show624def85b760484ee26d2357882432d8.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show624def85b760484ee26d2357882432d8.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
show624def85b760484ee26d2357882432d8.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show624def85b760484ee26d2357882432d8.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
    const show624def85b760484ee26d2357882432d8Form = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show624def85b760484ee26d2357882432d8.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
        show624def85b760484ee26d2357882432d8Form.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show624def85b760484ee26d2357882432d8.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
        show624def85b760484ee26d2357882432d8Form.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show624def85b760484ee26d2357882432d8.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show624def85b760484ee26d2357882432d8.form = show624def85b760484ee26d2357882432d8Form
    /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
const show828142cbe347d40ea495bf537d27befd = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show828142cbe347d40ea495bf537d27befd.url(args, options),
    method: 'get',
})

show828142cbe347d40ea495bf537d27befd.definition = {
    methods: ["get","head"],
    url: '/clientes/{reserva}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
show828142cbe347d40ea495bf537d27befd.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show828142cbe347d40ea495bf537d27befd.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
show828142cbe347d40ea495bf537d27befd.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show828142cbe347d40ea495bf537d27befd.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
show828142cbe347d40ea495bf537d27befd.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show828142cbe347d40ea495bf537d27befd.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
    const show828142cbe347d40ea495bf537d27befdForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show828142cbe347d40ea495bf537d27befd.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
        show828142cbe347d40ea495bf537d27befdForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show828142cbe347d40ea495bf537d27befd.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/clientes/{reserva}'
 */
        show828142cbe347d40ea495bf537d27befdForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show828142cbe347d40ea495bf537d27befd.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show828142cbe347d40ea495bf537d27befd.form = show828142cbe347d40ea495bf537d27befdForm

export const show = {
    '/recepcion/reservas/{reserva}': show624def85b760484ee26d2357882432d8,
    '/clientes/{reserva}': show828142cbe347d40ea495bf537d27befd,
}

/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
export const edit = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/recepcion/reservas/{reserva}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
edit.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
edit.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
edit.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
    const editForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
        editForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
        editForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
export const generarReporteDistribucion = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarReporteDistribucion.url(args, options),
    method: 'get',
})

generarReporteDistribucion.definition = {
    methods: ["get","head"],
    url: '/recepcion/{reserva}/reporte-distribucion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
generarReporteDistribucion.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return generarReporteDistribucion.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
generarReporteDistribucion.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarReporteDistribucion.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
generarReporteDistribucion.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generarReporteDistribucion.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
    const generarReporteDistribucionForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generarReporteDistribucion.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
        generarReporteDistribucionForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarReporteDistribucion.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::generarReporteDistribucion
 * @see app/Http/Controllers/ReservaController.php:253
 * @route '/recepcion/{reserva}/reporte-distribucion'
 */
        generarReporteDistribucionForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarReporteDistribucion.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generarReporteDistribucion.form = generarReporteDistribucionForm
/**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
export const generarReporteAsignacion = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarReporteAsignacion.url(args, options),
    method: 'get',
})

generarReporteAsignacion.definition = {
    methods: ["get","head"],
    url: '/recepcion/{reserva}/reporte-asignacion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
generarReporteAsignacion.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return generarReporteAsignacion.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
generarReporteAsignacion.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarReporteAsignacion.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
generarReporteAsignacion.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generarReporteAsignacion.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
    const generarReporteAsignacionForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generarReporteAsignacion.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
        generarReporteAsignacionForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarReporteAsignacion.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::generarReporteAsignacion
 * @see app/Http/Controllers/ReservaController.php:315
 * @route '/recepcion/{reserva}/reporte-asignacion'
 */
        generarReporteAsignacionForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarReporteAsignacion.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generarReporteAsignacion.form = generarReporteAsignacionForm
/**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
export const misReservas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: misReservas.url(options),
    method: 'get',
})

misReservas.definition = {
    methods: ["get","head"],
    url: '/clientes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
misReservas.url = (options?: RouteQueryOptions) => {
    return misReservas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
misReservas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: misReservas.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
misReservas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: misReservas.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
    const misReservasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: misReservas.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
        misReservasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: misReservas.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::misReservas
 * @see app/Http/Controllers/ReservaController.php:182
 * @route '/clientes'
 */
        misReservasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: misReservas.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    misReservas.form = misReservasForm
const ReservaController = { index, create, show, edit, generarReporteDistribucion, generarReporteAsignacion, misReservas }

export default ReservaController