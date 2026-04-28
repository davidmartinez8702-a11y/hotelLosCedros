import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import test from './test'
/**
 * @see routes/web.php:375
 * @route '/kmeans'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kmeans',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:375
 * @route '/kmeans'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:375
 * @route '/kmeans'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:375
 * @route '/kmeans'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:375
 * @route '/kmeans'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:375
 * @route '/kmeans'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:375
 * @route '/kmeans'
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
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
export const validar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validar.url(options),
    method: 'get',
})

validar.definition = {
    methods: ["get","head"],
    url: '/kmeans/validar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
validar.url = (options?: RouteQueryOptions) => {
    return validar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
validar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
validar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: validar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
    const validarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: validar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
        validarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::validar
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
        validarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    validar.form = validarForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
export const estadisticas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadisticas.url(options),
    method: 'get',
})

estadisticas.definition = {
    methods: ["get","head"],
    url: '/kmeans/estadisticas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
estadisticas.url = (options?: RouteQueryOptions) => {
    return estadisticas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
estadisticas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadisticas.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
estadisticas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: estadisticas.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
    const estadisticasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: estadisticas.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
        estadisticasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estadisticas.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
        estadisticasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estadisticas.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    estadisticas.form = estadisticasForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
export const logs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})

logs.definition = {
    methods: ["get","head"],
    url: '/kmeans/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
logs.url = (options?: RouteQueryOptions) => {
    return logs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
logs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
logs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
    const logsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: logs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
        logsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: logs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::logs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
        logsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: logs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    logs.form = logsForm
const kmeans = {
    index: Object.assign(index, index),
validar: Object.assign(validar, validar),
estadisticas: Object.assign(estadisticas, estadisticas),
test: Object.assign(test, test),
logs: Object.assign(logs, logs),
}

export default kmeans