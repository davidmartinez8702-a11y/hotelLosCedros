import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/recepcion/checkins',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckinController::index
 * @see app/Http/Controllers/CheckinController.php:21
 * @route '/recepcion/checkins'
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
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
export const create = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/recepcion/{reserva}/checkins/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
create.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
create.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
create.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
    const createForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
        createForm.get = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckinController::create
 * @see app/Http/Controllers/CheckinController.php:101
 * @route '/recepcion/{reserva}/checkins/create'
 */
        createForm.head = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
export const show = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/recepcion/checkins/{checkin}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
show.url = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { checkin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { checkin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    checkin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        checkin: typeof args.checkin === 'object'
                ? args.checkin.id
                : args.checkin,
                }

    return show.definition.url
            .replace('{checkin}', parsedArgs.checkin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
show.get = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
show.head = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
    const showForm = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
        showForm.get = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckinController::show
 * @see app/Http/Controllers/CheckinController.php:406
 * @route '/recepcion/checkins/{checkin}'
 */
        showForm.head = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
export const edit = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/recepcion/checkins/{checkin}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
edit.url = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { checkin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { checkin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    checkin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        checkin: typeof args.checkin === 'object'
                ? args.checkin.id
                : args.checkin,
                }

    return edit.definition.url
            .replace('{checkin}', parsedArgs.checkin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
edit.get = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
edit.head = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
    const editForm = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
        editForm.get = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CheckinController::edit
 * @see app/Http/Controllers/CheckinController.php:472
 * @route '/recepcion/checkins/{checkin}/edit'
 */
        editForm.head = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\CheckinController::update
 * @see app/Http/Controllers/CheckinController.php:524
 * @route '/recepcion/checkins/{checkin}'
 */
export const update = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/recepcion/checkins/{checkin}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CheckinController::update
 * @see app/Http/Controllers/CheckinController.php:524
 * @route '/recepcion/checkins/{checkin}'
 */
update.url = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { checkin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { checkin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    checkin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        checkin: typeof args.checkin === 'object'
                ? args.checkin.id
                : args.checkin,
                }

    return update.definition.url
            .replace('{checkin}', parsedArgs.checkin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::update
 * @see app/Http/Controllers/CheckinController.php:524
 * @route '/recepcion/checkins/{checkin}'
 */
update.put = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CheckinController::update
 * @see app/Http/Controllers/CheckinController.php:524
 * @route '/recepcion/checkins/{checkin}'
 */
    const updateForm = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckinController::update
 * @see app/Http/Controllers/CheckinController.php:524
 * @route '/recepcion/checkins/{checkin}'
 */
        updateForm.put = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CheckinController::store
 * @see app/Http/Controllers/CheckinController.php:314
 * @route '/recepcion/checkins/{reserva}/store'
 */
export const store = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/recepcion/checkins/{reserva}/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckinController::store
 * @see app/Http/Controllers/CheckinController.php:314
 * @route '/recepcion/checkins/{reserva}/store'
 */
store.url = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{reserva}', parsedArgs.reserva.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::store
 * @see app/Http/Controllers/CheckinController.php:314
 * @route '/recepcion/checkins/{reserva}/store'
 */
store.post = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CheckinController::store
 * @see app/Http/Controllers/CheckinController.php:314
 * @route '/recepcion/checkins/{reserva}/store'
 */
    const storeForm = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckinController::store
 * @see app/Http/Controllers/CheckinController.php:314
 * @route '/recepcion/checkins/{reserva}/store'
 */
        storeForm.post = (args: { reserva: number | { id: number } } | [reserva: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CheckinController::destroy
 * @see app/Http/Controllers/CheckinController.php:582
 * @route '/recepcion/checkins/{checkin}'
 */
export const destroy = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/recepcion/checkins/{checkin}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CheckinController::destroy
 * @see app/Http/Controllers/CheckinController.php:582
 * @route '/recepcion/checkins/{checkin}'
 */
destroy.url = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { checkin: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { checkin: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    checkin: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        checkin: typeof args.checkin === 'object'
                ? args.checkin.id
                : args.checkin,
                }

    return destroy.definition.url
            .replace('{checkin}', parsedArgs.checkin.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::destroy
 * @see app/Http/Controllers/CheckinController.php:582
 * @route '/recepcion/checkins/{checkin}'
 */
destroy.delete = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CheckinController::destroy
 * @see app/Http/Controllers/CheckinController.php:582
 * @route '/recepcion/checkins/{checkin}'
 */
    const destroyForm = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckinController::destroy
 * @see app/Http/Controllers/CheckinController.php:582
 * @route '/recepcion/checkins/{checkin}'
 */
        destroyForm.delete = (args: { checkin: number | { id: number } } | [checkin: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const checkins = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default checkins