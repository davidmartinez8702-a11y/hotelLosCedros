import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
export const getEvolucionServicios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEvolucionServicios.url(options),
    method: 'get',
})

getEvolucionServicios.definition = {
    methods: ["get","head"],
    url: '/api/bi/evolucion-servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
getEvolucionServicios.url = (options?: RouteQueryOptions) => {
    return getEvolucionServicios.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
getEvolucionServicios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getEvolucionServicios.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
getEvolucionServicios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getEvolucionServicios.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
    const getEvolucionServiciosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getEvolucionServicios.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
        getEvolucionServiciosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getEvolucionServicios.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BIController::getEvolucionServicios
 * @see app/Http/Controllers/BIController.php:19
 * @route '/api/bi/evolucion-servicios'
 */
        getEvolucionServiciosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getEvolucionServicios.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getEvolucionServicios.form = getEvolucionServiciosForm
/**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
export const getUsoServicios = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUsoServicios.url(options),
    method: 'get',
})

getUsoServicios.definition = {
    methods: ["get","head"],
    url: '/api/bi/uso-servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
getUsoServicios.url = (options?: RouteQueryOptions) => {
    return getUsoServicios.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
getUsoServicios.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getUsoServicios.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
getUsoServicios.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getUsoServicios.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
    const getUsoServiciosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getUsoServicios.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
        getUsoServiciosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getUsoServicios.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BIController::getUsoServicios
 * @see app/Http/Controllers/BIController.php:220
 * @route '/api/bi/uso-servicios'
 */
        getUsoServiciosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getUsoServicios.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getUsoServicios.form = getUsoServiciosForm
const BIController = { getEvolucionServicios, getUsoServicios }

export default BIController