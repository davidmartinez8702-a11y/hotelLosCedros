import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/predicciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::index
 * @see app/Http/Controllers/PrediccionController.php:14
 * @route '/predicciones'
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
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
export const demanda = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demanda.url(args, options),
    method: 'get',
})

demanda.definition = {
    methods: ["get","head"],
    url: '/predicciones/demanda/{dias}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
demanda.url = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dias: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dias: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dias: args.dias,
                }

    return demanda.definition.url
            .replace('{dias}', parsedArgs.dias.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
demanda.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demanda.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
demanda.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: demanda.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
    const demandaForm = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: demanda.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
        demandaForm.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: demanda.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::demanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
        demandaForm.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: demanda.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    demanda.form = demandaForm
/**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
export const ingresos = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ingresos.url(args, options),
    method: 'get',
})

ingresos.definition = {
    methods: ["get","head"],
    url: '/predicciones/ingresos/{dias}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
ingresos.url = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dias: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dias: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dias: args.dias,
                }

    return ingresos.definition.url
            .replace('{dias}', parsedArgs.dias.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
ingresos.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ingresos.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
ingresos.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ingresos.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
    const ingresosForm = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ingresos.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
        ingresosForm.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ingresos.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::ingresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
        ingresosForm.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ingresos.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ingresos.form = ingresosForm
/**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
export const cancelaciones = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancelaciones.url(args, options),
    method: 'get',
})

cancelaciones.definition = {
    methods: ["get","head"],
    url: '/predicciones/cancelaciones/{dias}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
cancelaciones.url = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dias: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    dias: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dias: args.dias,
                }

    return cancelaciones.definition.url
            .replace('{dias}', parsedArgs.dias.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
cancelaciones.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancelaciones.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
cancelaciones.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancelaciones.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
    const cancelacionesForm = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancelaciones.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
        cancelacionesForm.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancelaciones.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::cancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
        cancelacionesForm.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancelaciones.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cancelaciones.form = cancelacionesForm
/**
* @see \App\Http\Controllers\PrediccionController::reporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
export const reporte = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reporte.url(options),
    method: 'post',
})

reporte.definition = {
    methods: ["post"],
    url: '/predicciones/reporte',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PrediccionController::reporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
reporte.url = (options?: RouteQueryOptions) => {
    return reporte.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::reporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
reporte.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reporte.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PrediccionController::reporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
    const reporteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reporte.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::reporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
        reporteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reporte.url(options),
            method: 'post',
        })
    
    reporte.form = reporteForm
const predicciones = {
    index: Object.assign(index, index),
demanda: Object.assign(demanda, demanda),
ingresos: Object.assign(ingresos, ingresos),
cancelaciones: Object.assign(cancelaciones, cancelaciones),
reporte: Object.assign(reporte, reporte),
}

export default predicciones