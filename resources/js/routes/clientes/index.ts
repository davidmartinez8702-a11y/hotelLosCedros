import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import misReservas from './mis-reservas'
import clasificar67d633 from './clasificar'
/**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/clientes/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClienteController::dashboard
 * @see app/Http/Controllers/ClienteController.php:72
 * @route '/clientes/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/clientes/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckinController::search
 * @see app/Http/Controllers/CheckinController.php:286
 * @route '/clientes/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificar
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
export const clasificar = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clasificar.url(args, options),
    method: 'post',
})

clasificar.definition = {
    methods: ["post"],
    url: '/clientes/{id}/clasificar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificar
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
clasificar.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return clasificar.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificar
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
clasificar.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clasificar.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificar
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
    const clasificarForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clasificar.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificar
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
        clasificarForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clasificar.url(args, options),
            method: 'post',
        })
    
    clasificar.form = clasificarForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
export const clasificaciones = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clasificaciones.url(options),
    method: 'get',
})

clasificaciones.definition = {
    methods: ["get","head"],
    url: '/clientes/clasificaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
clasificaciones.url = (options?: RouteQueryOptions) => {
    return clasificaciones.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
clasificaciones.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clasificaciones.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
clasificaciones.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clasificaciones.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
    const clasificacionesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: clasificaciones.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
        clasificacionesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clasificaciones.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificaciones
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
        clasificacionesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clasificaciones.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    clasificaciones.form = clasificacionesForm
const clientes = {
    misReservas: Object.assign(misReservas, misReservas),
dashboard: Object.assign(dashboard, dashboard),
search: Object.assign(search, search),
clasificar: Object.assign(clasificar, clasificar67d633),
clasificaciones: Object.assign(clasificaciones, clasificaciones),
}

export default clientes