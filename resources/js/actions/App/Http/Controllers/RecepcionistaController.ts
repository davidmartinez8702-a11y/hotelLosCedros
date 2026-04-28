import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
export const dashboardRecepcionista = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboardRecepcionista.url(options),
    method: 'get',
})

dashboardRecepcionista.definition = {
    methods: ["get","head"],
    url: '/recepcionista/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
dashboardRecepcionista.url = (options?: RouteQueryOptions) => {
    return dashboardRecepcionista.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
dashboardRecepcionista.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboardRecepcionista.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
dashboardRecepcionista.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboardRecepcionista.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
    const dashboardRecepcionistaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboardRecepcionista.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
        dashboardRecepcionistaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboardRecepcionista.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RecepcionistaController::dashboardRecepcionista
 * @see app/Http/Controllers/RecepcionistaController.php:18
 * @route '/recepcionista/dashboard'
 */
        dashboardRecepcionistaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboardRecepcionista.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboardRecepcionista.form = dashboardRecepcionistaForm
const RecepcionistaController = { dashboardRecepcionista }

export default RecepcionistaController