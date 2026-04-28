import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import imagenes from './imagenes'
/**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/servicios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServicioController::index
 * @see app/Http/Controllers/ServicioController.php:17
 * @route '/servicios'
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
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/servicios/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServicioController::create
 * @see app/Http/Controllers/ServicioController.php:50
 * @route '/servicios/create'
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
* @see \App\Http\Controllers\ServicioController::store
 * @see app/Http/Controllers/ServicioController.php:61
 * @route '/servicios'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/servicios',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServicioController::store
 * @see app/Http/Controllers/ServicioController.php:61
 * @route '/servicios'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::store
 * @see app/Http/Controllers/ServicioController.php:61
 * @route '/servicios'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServicioController::store
 * @see app/Http/Controllers/ServicioController.php:61
 * @route '/servicios'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServicioController::store
 * @see app/Http/Controllers/ServicioController.php:61
 * @route '/servicios'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
export const show = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/servicios/{servicio}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
show.url = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { servicio: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { servicio: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    servicio: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        servicio: typeof args.servicio === 'object'
                ? args.servicio.id
                : args.servicio,
                }

    return show.definition.url
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
show.get = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
show.head = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
    const showForm = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
        showForm.get = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServicioController::show
 * @see app/Http/Controllers/ServicioController.php:80
 * @route '/servicios/{servicio}'
 */
        showForm.head = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
export const edit = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/servicios/{servicio}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
edit.url = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { servicio: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { servicio: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    servicio: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        servicio: typeof args.servicio === 'object'
                ? args.servicio.id
                : args.servicio,
                }

    return edit.definition.url
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
edit.get = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
edit.head = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
    const editForm = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
        editForm.get = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServicioController::edit
 * @see app/Http/Controllers/ServicioController.php:103
 * @route '/servicios/{servicio}/edit'
 */
        editForm.head = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ServicioController::update
 * @see app/Http/Controllers/ServicioController.php:117
 * @route '/servicios/{servicio}'
 */
export const update = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/servicios/{servicio}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ServicioController::update
 * @see app/Http/Controllers/ServicioController.php:117
 * @route '/servicios/{servicio}'
 */
update.url = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { servicio: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { servicio: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    servicio: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        servicio: typeof args.servicio === 'object'
                ? args.servicio.id
                : args.servicio,
                }

    return update.definition.url
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::update
 * @see app/Http/Controllers/ServicioController.php:117
 * @route '/servicios/{servicio}'
 */
update.put = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ServicioController::update
 * @see app/Http/Controllers/ServicioController.php:117
 * @route '/servicios/{servicio}'
 */
    const updateForm = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServicioController::update
 * @see app/Http/Controllers/ServicioController.php:117
 * @route '/servicios/{servicio}'
 */
        updateForm.put = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
export const galeria = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: galeria.url(args, options),
    method: 'get',
})

galeria.definition = {
    methods: ["get","head"],
    url: '/servicios/{servicio}/galeria',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
galeria.url = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { servicio: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { servicio: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    servicio: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        servicio: typeof args.servicio === 'object'
                ? args.servicio.id
                : args.servicio,
                }

    return galeria.definition.url
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
galeria.get = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: galeria.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
galeria.head = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: galeria.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
    const galeriaForm = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: galeria.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
        galeriaForm.get = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: galeria.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServicioController::galeria
 * @see app/Http/Controllers/ServicioController.php:140
 * @route '/servicios/{servicio}/galeria'
 */
        galeriaForm.head = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: galeria.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    galeria.form = galeriaForm
const servicios = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
galeria: Object.assign(galeria, galeria),
imagenes: Object.assign(imagenes, imagenes),
}

export default servicios