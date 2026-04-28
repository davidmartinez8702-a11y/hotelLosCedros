import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/promos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PromoController::index
 * @see app/Http/Controllers/PromoController.php:22
 * @route '/promos'
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
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/promos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PromoController::create
 * @see app/Http/Controllers/PromoController.php:76
 * @route '/promos/create'
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
* @see \App\Http\Controllers\PromoController::store
 * @see app/Http/Controllers/PromoController.php:89
 * @route '/promos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/promos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PromoController::store
 * @see app/Http/Controllers/PromoController.php:89
 * @route '/promos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::store
 * @see app/Http/Controllers/PromoController.php:89
 * @route '/promos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PromoController::store
 * @see app/Http/Controllers/PromoController.php:89
 * @route '/promos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PromoController::store
 * @see app/Http/Controllers/PromoController.php:89
 * @route '/promos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
export const show = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/promos/{promo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
show.url = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { promo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { promo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    promo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        promo: typeof args.promo === 'object'
                ? args.promo.id
                : args.promo,
                }

    return show.definition.url
            .replace('{promo}', parsedArgs.promo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
show.get = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
show.head = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
    const showForm = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
        showForm.get = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PromoController::show
 * @see app/Http/Controllers/PromoController.php:178
 * @route '/promos/{promo}'
 */
        showForm.head = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
export const edit = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/promos/{promo}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
edit.url = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { promo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { promo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    promo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        promo: typeof args.promo === 'object'
                ? args.promo.id
                : args.promo,
                }

    return edit.definition.url
            .replace('{promo}', parsedArgs.promo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
edit.get = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
edit.head = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
    const editForm = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
        editForm.get = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PromoController::edit
 * @see app/Http/Controllers/PromoController.php:276
 * @route '/promos/{promo}/edit'
 */
        editForm.head = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
export const update = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/promos/{promo}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
update.url = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { promo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { promo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    promo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        promo: typeof args.promo === 'object'
                ? args.promo.id
                : args.promo,
                }

    return update.definition.url
            .replace('{promo}', parsedArgs.promo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
update.put = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
update.patch = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
    const updateForm = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
        updateForm.put = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PromoController::update
 * @see app/Http/Controllers/PromoController.php:292
 * @route '/promos/{promo}'
 */
        updateForm.patch = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\PromoController::destroy
 * @see app/Http/Controllers/PromoController.php:377
 * @route '/promos/{promo}'
 */
export const destroy = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/promos/{promo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PromoController::destroy
 * @see app/Http/Controllers/PromoController.php:377
 * @route '/promos/{promo}'
 */
destroy.url = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { promo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { promo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    promo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        promo: typeof args.promo === 'object'
                ? args.promo.id
                : args.promo,
                }

    return destroy.definition.url
            .replace('{promo}', parsedArgs.promo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::destroy
 * @see app/Http/Controllers/PromoController.php:377
 * @route '/promos/{promo}'
 */
destroy.delete = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PromoController::destroy
 * @see app/Http/Controllers/PromoController.php:377
 * @route '/promos/{promo}'
 */
    const destroyForm = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PromoController::destroy
 * @see app/Http/Controllers/PromoController.php:377
 * @route '/promos/{promo}'
 */
        destroyForm.delete = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\PromoController::toggle
 * @see app/Http/Controllers/PromoController.php:399
 * @route '/promos/{promo}/toggle'
 */
export const toggle = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/promos/{promo}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PromoController::toggle
 * @see app/Http/Controllers/PromoController.php:399
 * @route '/promos/{promo}/toggle'
 */
toggle.url = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { promo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { promo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    promo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        promo: typeof args.promo === 'object'
                ? args.promo.id
                : args.promo,
                }

    return toggle.definition.url
            .replace('{promo}', parsedArgs.promo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::toggle
 * @see app/Http/Controllers/PromoController.php:399
 * @route '/promos/{promo}/toggle'
 */
toggle.post = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PromoController::toggle
 * @see app/Http/Controllers/PromoController.php:399
 * @route '/promos/{promo}/toggle'
 */
    const toggleForm = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PromoController::toggle
 * @see app/Http/Controllers/PromoController.php:399
 * @route '/promos/{promo}/toggle'
 */
        toggleForm.post = (args: { promo: number | { id: number } } | [promo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\PromoController::validarCodigo
 * @see app/Http/Controllers/PromoController.php:410
 * @route '/promos/validar-codigo'
 */
export const validarCodigo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validarCodigo.url(options),
    method: 'post',
})

validarCodigo.definition = {
    methods: ["post"],
    url: '/promos/validar-codigo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PromoController::validarCodigo
 * @see app/Http/Controllers/PromoController.php:410
 * @route '/promos/validar-codigo'
 */
validarCodigo.url = (options?: RouteQueryOptions) => {
    return validarCodigo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::validarCodigo
 * @see app/Http/Controllers/PromoController.php:410
 * @route '/promos/validar-codigo'
 */
validarCodigo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validarCodigo.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PromoController::validarCodigo
 * @see app/Http/Controllers/PromoController.php:410
 * @route '/promos/validar-codigo'
 */
    const validarCodigoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: validarCodigo.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PromoController::validarCodigo
 * @see app/Http/Controllers/PromoController.php:410
 * @route '/promos/validar-codigo'
 */
        validarCodigoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: validarCodigo.url(options),
            method: 'post',
        })
    
    validarCodigo.form = validarCodigoForm
/**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
export const disponibles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disponibles.url(options),
    method: 'get',
})

disponibles.definition = {
    methods: ["get","head"],
    url: '/promos/disponibles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
disponibles.url = (options?: RouteQueryOptions) => {
    return disponibles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
disponibles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: disponibles.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
disponibles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: disponibles.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
    const disponiblesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: disponibles.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
        disponiblesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: disponibles.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PromoController::disponibles
 * @see app/Http/Controllers/PromoController.php:446
 * @route '/promos/disponibles'
 */
        disponiblesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: disponibles.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    disponibles.form = disponiblesForm
const promos = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggle: Object.assign(toggle, toggle),
validarCodigo: Object.assign(validarCodigo, validarCodigo),
disponibles: Object.assign(disponibles, disponibles),
}

export default promos