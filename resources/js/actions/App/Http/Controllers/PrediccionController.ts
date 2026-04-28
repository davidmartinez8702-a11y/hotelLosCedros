import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
export const predecirDemanda = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: predecirDemanda.url(args, options),
    method: 'get',
})

predecirDemanda.definition = {
    methods: ["get","head"],
    url: '/predicciones/demanda/{dias}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
predecirDemanda.url = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return predecirDemanda.definition.url
            .replace('{dias}', parsedArgs.dias.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
predecirDemanda.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: predecirDemanda.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
predecirDemanda.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: predecirDemanda.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
    const predecirDemandaForm = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: predecirDemanda.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
        predecirDemandaForm.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: predecirDemanda.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::predecirDemanda
 * @see app/Http/Controllers/PrediccionController.php:19
 * @route '/predicciones/demanda/{dias}'
 */
        predecirDemandaForm.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: predecirDemanda.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    predecirDemanda.form = predecirDemandaForm
/**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
export const predecirIngresos = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: predecirIngresos.url(args, options),
    method: 'get',
})

predecirIngresos.definition = {
    methods: ["get","head"],
    url: '/predicciones/ingresos/{dias}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
predecirIngresos.url = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return predecirIngresos.definition.url
            .replace('{dias}', parsedArgs.dias.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
predecirIngresos.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: predecirIngresos.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
predecirIngresos.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: predecirIngresos.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
    const predecirIngresosForm = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: predecirIngresos.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
        predecirIngresosForm.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: predecirIngresos.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::predecirIngresos
 * @see app/Http/Controllers/PrediccionController.php:45
 * @route '/predicciones/ingresos/{dias}'
 */
        predecirIngresosForm.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: predecirIngresos.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    predecirIngresos.form = predecirIngresosForm
/**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
export const predecirCancelaciones = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: predecirCancelaciones.url(args, options),
    method: 'get',
})

predecirCancelaciones.definition = {
    methods: ["get","head"],
    url: '/predicciones/cancelaciones/{dias}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
predecirCancelaciones.url = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return predecirCancelaciones.definition.url
            .replace('{dias}', parsedArgs.dias.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
predecirCancelaciones.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: predecirCancelaciones.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
predecirCancelaciones.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: predecirCancelaciones.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
    const predecirCancelacionesForm = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: predecirCancelaciones.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
        predecirCancelacionesForm.get = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: predecirCancelaciones.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrediccionController::predecirCancelaciones
 * @see app/Http/Controllers/PrediccionController.php:71
 * @route '/predicciones/cancelaciones/{dias}'
 */
        predecirCancelacionesForm.head = (args: { dias: string | number } | [dias: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: predecirCancelaciones.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    predecirCancelaciones.form = predecirCancelacionesForm
/**
* @see \App\Http\Controllers\PrediccionController::generarReporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
export const generarReporte = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generarReporte.url(options),
    method: 'post',
})

generarReporte.definition = {
    methods: ["post"],
    url: '/predicciones/reporte',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PrediccionController::generarReporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
generarReporte.url = (options?: RouteQueryOptions) => {
    return generarReporte.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrediccionController::generarReporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
generarReporte.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generarReporte.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PrediccionController::generarReporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
    const generarReporteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generarReporte.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PrediccionController::generarReporte
 * @see app/Http/Controllers/PrediccionController.php:97
 * @route '/predicciones/reporte'
 */
        generarReporteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generarReporte.url(options),
            method: 'post',
        })
    
    generarReporte.form = generarReporteForm
const PrediccionController = { index, predecirDemanda, predecirIngresos, predecirCancelaciones, generarReporte }

export default PrediccionController