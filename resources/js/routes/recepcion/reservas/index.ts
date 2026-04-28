import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/recepcion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::index
 * @see app/Http/Controllers/ReservaController.php:14
 * @route '/recepcion'
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
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/recepcion/reservas/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::create
 * @see app/Http/Controllers/ReservaController.php:68
 * @route '/recepcion/reservas/create'
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
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
export const show = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/recepcion/reservas/{reserva}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
show.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reserva: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reserva: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reserva: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reserva: typeof args.reserva === 'object'
                ? args.reserva.id
                : args.reserva,
                }

    return show.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
show.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
show.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
    const showForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
        showForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::show
 * @see app/Http/Controllers/ReservaController.php:84
 * @route '/recepcion/reservas/{reserva}'
 */
        showForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
export const edit = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/recepcion/reservas/{reserva}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
edit.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reserva: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reserva: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reserva: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reserva: typeof args.reserva === 'object'
                ? args.reserva.id
                : args.reserva,
                }

    return edit.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
edit.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
edit.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
    const editForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
        editForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReservaController::edit
 * @see app/Http/Controllers/ReservaController.php:158
 * @route '/recepcion/reservas/{reserva}/edit'
 */
        editForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
const reservas = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
}

export default reservas