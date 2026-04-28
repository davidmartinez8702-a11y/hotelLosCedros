import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/platillos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatilloController::index
 * @see app/Http/Controllers/PlatilloController.php:18
 * @route '/platillos'
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
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/platillos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatilloController::create
 * @see app/Http/Controllers/PlatilloController.php:54
 * @route '/platillos/create'
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
* @see \App\Http\Controllers\PlatilloController::store
 * @see app/Http/Controllers/PlatilloController.php:68
 * @route '/platillos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/platillos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlatilloController::store
 * @see app/Http/Controllers/PlatilloController.php:68
 * @route '/platillos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatilloController::store
 * @see app/Http/Controllers/PlatilloController.php:68
 * @route '/platillos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PlatilloController::store
 * @see app/Http/Controllers/PlatilloController.php:68
 * @route '/platillos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatilloController::store
 * @see app/Http/Controllers/PlatilloController.php:68
 * @route '/platillos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
export const show = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/platillos/{platillo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
show.url = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { platillo: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    platillo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        platillo: args.platillo,
                }

    return show.definition.url
            .replace('{platillo}', parsedArgs.platillo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
show.get = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
show.head = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
    const showForm = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
        showForm.get = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatilloController::show
 * @see app/Http/Controllers/PlatilloController.php:98
 * @route '/platillos/{platillo}'
 */
        showForm.head = (args: { platillo: string | number } | [platillo: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
export const edit = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/platillos/{platillo}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
edit.url = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { platillo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { platillo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    platillo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        platillo: typeof args.platillo === 'object'
                ? args.platillo.id
                : args.platillo,
                }

    return edit.definition.url
            .replace('{platillo}', parsedArgs.platillo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
edit.get = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
edit.head = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
    const editForm = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
        editForm.get = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatilloController::edit
 * @see app/Http/Controllers/PlatilloController.php:123
 * @route '/platillos/{platillo}/edit'
 */
        editForm.head = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PlatilloController::update
 * @see app/Http/Controllers/PlatilloController.php:138
 * @route '/platillos/{platillo}'
 */
export const update = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/platillos/{platillo}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlatilloController::update
 * @see app/Http/Controllers/PlatilloController.php:138
 * @route '/platillos/{platillo}'
 */
update.url = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { platillo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { platillo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    platillo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        platillo: typeof args.platillo === 'object'
                ? args.platillo.id
                : args.platillo,
                }

    return update.definition.url
            .replace('{platillo}', parsedArgs.platillo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatilloController::update
 * @see app/Http/Controllers/PlatilloController.php:138
 * @route '/platillos/{platillo}'
 */
update.post = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PlatilloController::update
 * @see app/Http/Controllers/PlatilloController.php:138
 * @route '/platillos/{platillo}'
 */
    const updateForm = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatilloController::update
 * @see app/Http/Controllers/PlatilloController.php:138
 * @route '/platillos/{platillo}'
 */
        updateForm.post = (args: { platillo: number | { id: number } } | [platillo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const PlatilloController = { index, create, store, show, edit, update }

export default PlatilloController