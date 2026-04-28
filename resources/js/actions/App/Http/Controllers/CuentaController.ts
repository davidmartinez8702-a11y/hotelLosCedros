import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cuentas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CuentaController::index
 * @see app/Http/Controllers/CuentaController.php:21
 * @route '/cuentas'
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
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
export const create = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/cuentas/{checkin}/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
create.url = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { checkin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { checkin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    checkin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        checkin: typeof args.checkin === 'object'
                ? args.checkin.id
                : args.checkin,
                }

    return create.definition.url
            .replace('{checkin}', parsedArgs.checkin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
create.get = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
create.head = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
    const createForm = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
        createForm.get = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CuentaController::create
 * @see app/Http/Controllers/CuentaController.php:57
 * @route '/cuentas/{checkin}/create'
 */
        createForm.head = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\CuentaController::store
 * @see app/Http/Controllers/CuentaController.php:107
 * @route '/cuentas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cuentas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CuentaController::store
 * @see app/Http/Controllers/CuentaController.php:107
 * @route '/cuentas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::store
 * @see app/Http/Controllers/CuentaController.php:107
 * @route '/cuentas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CuentaController::store
 * @see app/Http/Controllers/CuentaController.php:107
 * @route '/cuentas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CuentaController::store
 * @see app/Http/Controllers/CuentaController.php:107
 * @route '/cuentas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
export const show = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/cuentas/{cuenta}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
show.url = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cuenta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cuenta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cuenta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cuenta: typeof args.cuenta === 'object'
                ? args.cuenta.id
                : args.cuenta,
                }

    return show.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
show.get = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
show.head = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
    const showForm = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
        showForm.get = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CuentaController::show
 * @see app/Http/Controllers/CuentaController.php:132
 * @route '/cuentas/{cuenta}'
 */
        showForm.head = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
export const generarReporte = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarReporte.url(args, options),
    method: 'get',
})

generarReporte.definition = {
    methods: ["get","head"],
    url: '/cuentas/{cuenta}/reportes/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
generarReporte.url = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cuenta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cuenta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cuenta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cuenta: typeof args.cuenta === 'object'
                ? args.cuenta.id
                : args.cuenta,
                }

    return generarReporte.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
generarReporte.get = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generarReporte.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
generarReporte.head = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generarReporte.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
    const generarReporteForm = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generarReporte.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
        generarReporteForm.get = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarReporte.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CuentaController::generarReporte
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
        generarReporteForm.head = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generarReporte.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generarReporte.form = generarReporteForm
/**
* @see \App\Http\Controllers\CuentaController::agregarTransacciones
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
export const agregarTransacciones = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: agregarTransacciones.url(args, options),
    method: 'post',
})

agregarTransacciones.definition = {
    methods: ["post"],
    url: '/cuentas/{cuenta}/transacciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CuentaController::agregarTransacciones
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
agregarTransacciones.url = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cuenta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cuenta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cuenta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cuenta: typeof args.cuenta === 'object'
                ? args.cuenta.id
                : args.cuenta,
                }

    return agregarTransacciones.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::agregarTransacciones
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
agregarTransacciones.post = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: agregarTransacciones.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CuentaController::agregarTransacciones
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
    const agregarTransaccionesForm = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: agregarTransacciones.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CuentaController::agregarTransacciones
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
        agregarTransaccionesForm.post = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: agregarTransacciones.url(args, options),
            method: 'post',
        })
    
    agregarTransacciones.form = agregarTransaccionesForm
/**
* @see \App\Http\Controllers\CuentaController::eliminarTransaccion
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
export const eliminarTransaccion = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminarTransaccion.url(args, options),
    method: 'delete',
})

eliminarTransaccion.definition = {
    methods: ["delete"],
    url: '/cuentas/{cuenta}/transacciones/{transaccion}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CuentaController::eliminarTransaccion
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
eliminarTransaccion.url = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    cuenta: args[0],
                    transaccion: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cuenta: typeof args.cuenta === 'object'
                ? args.cuenta.id
                : args.cuenta,
                                transaccion: typeof args.transaccion === 'object'
                ? args.transaccion.id
                : args.transaccion,
                }

    return eliminarTransaccion.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace('{transaccion}', parsedArgs.transaccion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::eliminarTransaccion
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
eliminarTransaccion.delete = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminarTransaccion.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CuentaController::eliminarTransaccion
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
    const eliminarTransaccionForm = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: eliminarTransaccion.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CuentaController::eliminarTransaccion
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
        eliminarTransaccionForm.delete = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: eliminarTransaccion.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    eliminarTransaccion.form = eliminarTransaccionForm
const CuentaController = { index, create, store, show, generarReporte, agregarTransacciones, eliminarTransaccion }

export default CuentaController