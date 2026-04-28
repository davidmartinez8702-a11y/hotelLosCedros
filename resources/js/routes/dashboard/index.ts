import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
export const administrador = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: administrador.url(options),
    method: 'get',
})

administrador.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
administrador.url = (options?: RouteQueryOptions) => {
    return administrador.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
administrador.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: administrador.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
administrador.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: administrador.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
    const administradorForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: administrador.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
        administradorForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: administrador.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::administrador
 * @see app/Http/Controllers/AuthController.php:11
 * @route '/admin/dashboard'
 */
        administradorForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: administrador.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    administrador.form = administradorForm
/**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
export const recepcion = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recepcion.url(options),
    method: 'get',
})

recepcion.definition = {
    methods: ["get","head"],
    url: '/recepcion/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
recepcion.url = (options?: RouteQueryOptions) => {
    return recepcion.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
recepcion.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recepcion.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
recepcion.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recepcion.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
    const recepcionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: recepcion.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
        recepcionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recepcion.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::recepcion
 * @see app/Http/Controllers/AuthController.php:17
 * @route '/recepcion/dashboard'
 */
        recepcionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: recepcion.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    recepcion.form = recepcionForm
/**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
export const cliente = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cliente.url(options),
    method: 'get',
})

cliente.definition = {
    methods: ["get","head"],
    url: '/cliente/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
cliente.url = (options?: RouteQueryOptions) => {
    return cliente.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
cliente.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cliente.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
cliente.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cliente.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
    const clienteForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cliente.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
        clienteForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cliente.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::cliente
 * @see app/Http/Controllers/AuthController.php:23
 * @route '/cliente/dashboard'
 */
        clienteForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cliente.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cliente.form = clienteForm
const dashboard = {
    administrador: Object.assign(administrador, administrador),
recepcion: Object.assign(recepcion, recepcion),
cliente: Object.assign(cliente, cliente),
}

export default dashboard