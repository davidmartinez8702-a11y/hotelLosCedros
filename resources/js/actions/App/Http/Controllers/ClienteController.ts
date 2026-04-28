import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
export const dashboardCliente = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboardCliente.url(options),
    method: 'get',
})

dashboardCliente.definition = {
    methods: ["get","head"],
    url: '/clientes/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
dashboardCliente.url = (options?: RouteQueryOptions) => {
    return dashboardCliente.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
dashboardCliente.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboardCliente.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
dashboardCliente.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboardCliente.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
    const dashboardClienteForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboardCliente.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
        dashboardClienteForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboardCliente.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClienteController::dashboardCliente
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
        dashboardClienteForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboardCliente.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboardCliente.form = dashboardClienteForm
const ClienteController = { dashboardCliente }

export default ClienteController