import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
export const adminDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminDashboard.url(options),
    method: 'get',
})

adminDashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
adminDashboard.url = (options?: RouteQueryOptions) => {
    return adminDashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
adminDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminDashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
adminDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminDashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
    const adminDashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminDashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
        adminDashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminDashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::adminDashboard
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
        adminDashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminDashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminDashboard.form = adminDashboardForm
/**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
export const recepcionDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recepcionDashboard.url(options),
    method: 'get',
})

recepcionDashboard.definition = {
    methods: ["get","head"],
    url: '/recepcion/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
recepcionDashboard.url = (options?: RouteQueryOptions) => {
    return recepcionDashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
recepcionDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recepcionDashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
recepcionDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recepcionDashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
    const recepcionDashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: recepcionDashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
        recepcionDashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recepcionDashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::recepcionDashboard
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
        recepcionDashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recepcionDashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    recepcionDashboard.form = recepcionDashboardForm
/**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
export const clientDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clientDashboard.url(options),
    method: 'get',
})

clientDashboard.definition = {
    methods: ["get","head"],
    url: '/cliente/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
clientDashboard.url = (options?: RouteQueryOptions) => {
    return clientDashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
clientDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clientDashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
clientDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clientDashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
    const clientDashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: clientDashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
        clientDashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clientDashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::clientDashboard
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
        clientDashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clientDashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    clientDashboard.form = clientDashboardForm
const AuthController = { adminDashboard, recepcionDashboard, clientDashboard }

export default AuthController