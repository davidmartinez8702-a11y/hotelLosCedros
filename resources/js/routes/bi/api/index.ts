import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
export const evolucionServicios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evolucionServicios.url(options),
    method: 'get',
})

evolucionServicios.definition = {
    methods: ["get","head"],
    url: '/api/bi/evolucion-servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
evolucionServicios.url = (options?: RouteQueryOptions) => {
    return evolucionServicios.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
evolucionServicios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evolucionServicios.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
evolucionServicios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: evolucionServicios.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
    const evolucionServiciosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: evolucionServicios.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
        evolucionServiciosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: evolucionServicios.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BIController::evolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
        evolucionServiciosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: evolucionServicios.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    evolucionServicios.form = evolucionServiciosForm
/**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
export const usoServicios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usoServicios.url(options),
    method: 'get',
})

usoServicios.definition = {
    methods: ["get","head"],
    url: '/api/bi/uso-servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
usoServicios.url = (options?: RouteQueryOptions) => {
    return usoServicios.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
usoServicios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usoServicios.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
usoServicios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usoServicios.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
    const usoServiciosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: usoServicios.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
        usoServiciosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usoServicios.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BIController::usoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
        usoServiciosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usoServicios.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    usoServicios.form = usoServiciosForm
const api = {
    evolucionServicios: Object.assign(evolucionServicios, evolucionServicios),
usoServicios: Object.assign(usoServicios, usoServicios),
}

export default api