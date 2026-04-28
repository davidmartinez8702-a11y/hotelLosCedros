import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import imagenes from './imagenes'
/**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tipoHabitacion',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoHabitacionController::index
 * @see app/Http/Controllers/TipoHabitacionController.php:16
 * @route '/tipoHabitacion'
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
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tipoHabitacion/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoHabitacionController::create
 * @see app/Http/Controllers/TipoHabitacionController.php:89
 * @route '/tipoHabitacion/create'
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
* @see \App\Http\Controllers\TipoHabitacionController::store
 * @see app/Http/Controllers/TipoHabitacionController.php:55
 * @route '/tipoHabitacion'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tipoHabitacion',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::store
 * @see app/Http/Controllers/TipoHabitacionController.php:55
 * @route '/tipoHabitacion'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::store
 * @see app/Http/Controllers/TipoHabitacionController.php:55
 * @route '/tipoHabitacion'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::store
 * @see app/Http/Controllers/TipoHabitacionController.php:55
 * @route '/tipoHabitacion'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::store
 * @see app/Http/Controllers/TipoHabitacionController.php:55
 * @route '/tipoHabitacion'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
export const show = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tipoHabitacion/{tipoHabitacion}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
show.url = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipoHabitacion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tipoHabitacion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tipoHabitacion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipoHabitacion: typeof args.tipoHabitacion === 'object'
                ? args.tipoHabitacion.id
                : args.tipoHabitacion,
                }

    return show.definition.url
            .replace('{tipoHabitacion}', parsedArgs.tipoHabitacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
show.get = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
show.head = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
    const showForm = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
        showForm.get = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoHabitacionController::show
 * @see app/Http/Controllers/TipoHabitacionController.php:108
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
        showForm.head = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
export const edit = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tipoHabitacion/{tipoHabitacion}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
edit.url = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipoHabitacion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tipoHabitacion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tipoHabitacion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipoHabitacion: typeof args.tipoHabitacion === 'object'
                ? args.tipoHabitacion.id
                : args.tipoHabitacion,
                }

    return edit.definition.url
            .replace('{tipoHabitacion}', parsedArgs.tipoHabitacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
edit.get = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
edit.head = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
    const editForm = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
        editForm.get = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoHabitacionController::edit
 * @see app/Http/Controllers/TipoHabitacionController.php:135
 * @route '/tipoHabitacion/{tipoHabitacion}/edit'
 */
        editForm.head = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TipoHabitacionController::update
 * @see app/Http/Controllers/TipoHabitacionController.php:148
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
export const update = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/tipoHabitacion/{tipoHabitacion}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::update
 * @see app/Http/Controllers/TipoHabitacionController.php:148
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
update.url = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipoHabitacion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tipoHabitacion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tipoHabitacion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipoHabitacion: typeof args.tipoHabitacion === 'object'
                ? args.tipoHabitacion.id
                : args.tipoHabitacion,
                }

    return update.definition.url
            .replace('{tipoHabitacion}', parsedArgs.tipoHabitacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::update
 * @see app/Http/Controllers/TipoHabitacionController.php:148
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
update.put = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::update
 * @see app/Http/Controllers/TipoHabitacionController.php:148
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
    const updateForm = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::update
 * @see app/Http/Controllers/TipoHabitacionController.php:148
 * @route '/tipoHabitacion/{tipoHabitacion}'
 */
        updateForm.put = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
export const galeria = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: galeria.url(args, options),
    method: 'get',
})

galeria.definition = {
    methods: ["get","head"],
    url: '/tipoHabitacion/{tipoHabitacion}/galeria',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
galeria.url = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tipoHabitacion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tipoHabitacion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tipoHabitacion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tipoHabitacion: typeof args.tipoHabitacion === 'object'
                ? args.tipoHabitacion.id
                : args.tipoHabitacion,
                }

    return galeria.definition.url
            .replace('{tipoHabitacion}', parsedArgs.tipoHabitacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
galeria.get = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: galeria.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
galeria.head = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: galeria.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
    const galeriaForm = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: galeria.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
        galeriaForm.get = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: galeria.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TipoHabitacionController::galeria
 * @see app/Http/Controllers/TipoHabitacionController.php:188
 * @route '/tipoHabitacion/{tipoHabitacion}/galeria'
 */
        galeriaForm.head = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: galeria.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    galeria.form = galeriaForm
const tipoHabitacion = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
galeria: Object.assign(galeria, galeria),
imagenes: Object.assign(imagenes, imagenes),
}

export default tipoHabitacion