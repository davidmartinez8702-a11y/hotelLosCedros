import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CuentaController::agregar
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
export const agregar = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: agregar.url(args, options),
    method: 'post',
})

agregar.definition = {
    methods: ["post"],
    url: '/cuentas/{cuenta}/transacciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CuentaController::agregar
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
agregar.url = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return agregar.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::agregar
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
agregar.post = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: agregar.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CuentaController::agregar
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
    const agregarForm = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: agregar.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CuentaController::agregar
 * @see app/Http/Controllers/CuentaController.php:237
 * @route '/cuentas/{cuenta}/transacciones'
 */
        agregarForm.post = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: agregar.url(args, options),
            method: 'post',
        })
    
    agregar.form = agregarForm
/**
* @see \App\Http\Controllers\CuentaController::eliminar
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
export const eliminar = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminar.url(args, options),
    method: 'delete',
})

eliminar.definition = {
    methods: ["delete"],
    url: '/cuentas/{cuenta}/transacciones/{transaccion}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CuentaController::eliminar
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
eliminar.url = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return eliminar.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace('{transaccion}', parsedArgs.transaccion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::eliminar
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
eliminar.delete = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminar.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CuentaController::eliminar
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
    const eliminarForm = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: eliminar.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CuentaController::eliminar
 * @see app/Http/Controllers/CuentaController.php:289
 * @route '/cuentas/{cuenta}/transacciones/{transaccion}'
 */
        eliminarForm.delete = (args: { cuenta: number | { id: number }, transaccion: number | { id: number } } | [cuenta: number | { id: number }, transaccion: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: eliminar.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    eliminar.form = eliminarForm
const transacciones = {
    agregar: Object.assign(agregar, agregar),
eliminar: Object.assign(eliminar, eliminar),
}

export default transacciones