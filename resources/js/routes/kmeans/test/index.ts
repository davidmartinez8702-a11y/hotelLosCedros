import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
export const hardcoded = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hardcoded.url(options),
    method: 'get',
})

hardcoded.definition = {
    methods: ["get","head"],
    url: '/kmeans/test-hardcoded',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
hardcoded.url = (options?: RouteQueryOptions) => {
    return hardcoded.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
hardcoded.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hardcoded.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
hardcoded.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hardcoded.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
    const hardcodedForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: hardcoded.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
        hardcodedForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: hardcoded.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::hardcoded
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
        hardcodedForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: hardcoded.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    hardcoded.form = hardcodedForm
const test = {
    hardcoded: Object.assign(hardcoded, hardcoded),
}

export default test