import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/reservas/cliente',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::index
 * @see app/Http/Controllers/ReservaClienteController.php:514
 * @route '/reservas/cliente'
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
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/reservas/cliente/crear',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::create
 * @see app/Http/Controllers/ReservaClienteController.php:522
 * @route '/reservas/cliente/crear'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
export const confirmacion = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmacion.url(options),
    method: 'get',
})

confirmacion.definition = {
    methods: ["get","head"],
    url: '/reservas/cliente/confirmacion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
confirmacion.url = (options?: RouteQueryOptions) => {
    return confirmacion.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
confirmacion.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmacion.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
confirmacion.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmacion.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
    const confirmacionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirmacion.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
        confirmacionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmacion.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaClienteController::confirmacion
 * @see app/Http/Controllers/ReservaClienteController.php:578
 * @route '/reservas/cliente/confirmacion'
 */
        confirmacionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmacion.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirmacion.form = confirmacionForm
const cliente = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
confirmacion: Object.assign(confirmacion, confirmacion),
}

export default cliente