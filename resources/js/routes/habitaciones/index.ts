import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CheckinController::updateEstado
 * @see app/Http/Controllers/CheckinController.php:244
 * @route '/habitaciones/estado'
 */
export const updateEstado = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEstado.url(options),
    method: 'put',
})

updateEstado.definition = {
    methods: ["put"],
    url: '/habitaciones/estado',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CheckinController::updateEstado
 * @see app/Http/Controllers/CheckinController.php:244
 * @route '/habitaciones/estado'
 */
updateEstado.url = (options?: RouteQueryOptions) => {
    return updateEstado.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckinController::updateEstado
 * @see app/Http/Controllers/CheckinController.php:244
 * @route '/habitaciones/estado'
 */
updateEstado.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateEstado.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CheckinController::updateEstado
 * @see app/Http/Controllers/CheckinController.php:244
 * @route '/habitaciones/estado'
 */
    const updateEstadoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateEstado.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CheckinController::updateEstado
 * @see app/Http/Controllers/CheckinController.php:244
 * @route '/habitaciones/estado'
 */
        updateEstadoForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateEstado.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateEstado.form = updateEstadoForm
/**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/habitaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HabitacionEventoController::index
 * @see app/Http/Controllers/HabitacionEventoController.php:17
 * @route '/habitaciones'
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
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/habitaciones/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HabitacionEventoController::create
 * @see app/Http/Controllers/HabitacionEventoController.php:80
 * @route '/habitaciones/create'
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
* @see \App\Http\Controllers\HabitacionEventoController::store
 * @see app/Http/Controllers/HabitacionEventoController.php:95
 * @route '/habitaciones'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/habitaciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::store
 * @see app/Http/Controllers/HabitacionEventoController.php:95
 * @route '/habitaciones'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::store
 * @see app/Http/Controllers/HabitacionEventoController.php:95
 * @route '/habitaciones'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::store
 * @see app/Http/Controllers/HabitacionEventoController.php:95
 * @route '/habitaciones'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::store
 * @see app/Http/Controllers/HabitacionEventoController.php:95
 * @route '/habitaciones'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
export const show = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/habitaciones/{habitacione}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
show.url = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { habitacione: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { habitacione: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    habitacione: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        habitacione: typeof args.habitacione === 'object'
                ? args.habitacione.id
                : args.habitacione,
                }

    return show.definition.url
            .replace('{habitacione}', parsedArgs.habitacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
show.get = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
show.head = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
    const showForm = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
        showForm.get = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HabitacionEventoController::show
 * @see app/Http/Controllers/HabitacionEventoController.php:121
 * @route '/habitaciones/{habitacione}'
 */
        showForm.head = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
export const edit = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/habitaciones/{habitacione}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
edit.url = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { habitacione: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { habitacione: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    habitacione: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        habitacione: typeof args.habitacione === 'object'
                ? args.habitacione.id
                : args.habitacione,
                }

    return edit.definition.url
            .replace('{habitacione}', parsedArgs.habitacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
edit.get = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
edit.head = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
    const editForm = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
        editForm.get = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HabitacionEventoController::edit
 * @see app/Http/Controllers/HabitacionEventoController.php:201
 * @route '/habitaciones/{habitacione}/edit'
 */
        editForm.head = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
export const update = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/habitaciones/{habitacione}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
update.url = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { habitacione: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { habitacione: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    habitacione: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        habitacione: typeof args.habitacione === 'object'
                ? args.habitacione.id
                : args.habitacione,
                }

    return update.definition.url
            .replace('{habitacione}', parsedArgs.habitacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
update.put = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
update.patch = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
    const updateForm = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
        updateForm.put = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\HabitacionEventoController::update
 * @see app/Http/Controllers/HabitacionEventoController.php:216
 * @route '/habitaciones/{habitacione}'
 */
        updateForm.patch = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HabitacionEventoController::destroy
 * @see app/Http/Controllers/HabitacionEventoController.php:249
 * @route '/habitaciones/{habitacione}'
 */
export const destroy = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/habitaciones/{habitacione}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::destroy
 * @see app/Http/Controllers/HabitacionEventoController.php:249
 * @route '/habitaciones/{habitacione}'
 */
destroy.url = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { habitacione: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { habitacione: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    habitacione: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        habitacione: typeof args.habitacione === 'object'
                ? args.habitacione.id
                : args.habitacione,
                }

    return destroy.definition.url
            .replace('{habitacione}', parsedArgs.habitacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::destroy
 * @see app/Http/Controllers/HabitacionEventoController.php:249
 * @route '/habitaciones/{habitacione}'
 */
destroy.delete = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::destroy
 * @see app/Http/Controllers/HabitacionEventoController.php:249
 * @route '/habitaciones/{habitacione}'
 */
    const destroyForm = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::destroy
 * @see app/Http/Controllers/HabitacionEventoController.php:249
 * @route '/habitaciones/{habitacione}'
 */
        destroyForm.delete = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HabitacionEventoController::cambiarEstado
 * @see app/Http/Controllers/HabitacionEventoController.php:266
 * @route '/habitaciones/{habitacione}/cambiar-estado'
 */
export const cambiarEstado = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cambiarEstado.url(args, options),
    method: 'post',
})

cambiarEstado.definition = {
    methods: ["post"],
    url: '/habitaciones/{habitacione}/cambiar-estado',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::cambiarEstado
 * @see app/Http/Controllers/HabitacionEventoController.php:266
 * @route '/habitaciones/{habitacione}/cambiar-estado'
 */
cambiarEstado.url = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { habitacione: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { habitacione: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    habitacione: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        habitacione: typeof args.habitacione === 'object'
                ? args.habitacione.id
                : args.habitacione,
                }

    return cambiarEstado.definition.url
            .replace('{habitacione}', parsedArgs.habitacione.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::cambiarEstado
 * @see app/Http/Controllers/HabitacionEventoController.php:266
 * @route '/habitaciones/{habitacione}/cambiar-estado'
 */
cambiarEstado.post = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cambiarEstado.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::cambiarEstado
 * @see app/Http/Controllers/HabitacionEventoController.php:266
 * @route '/habitaciones/{habitacione}/cambiar-estado'
 */
    const cambiarEstadoForm = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cambiarEstado.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::cambiarEstado
 * @see app/Http/Controllers/HabitacionEventoController.php:266
 * @route '/habitaciones/{habitacione}/cambiar-estado'
 */
        cambiarEstadoForm.post = (args: { habitacione: number | { id: number } } | [habitacione: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cambiarEstado.url(args, options),
            method: 'post',
        })
    
    cambiarEstado.form = cambiarEstadoForm
/**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/habitaciones-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HabitacionEventoController::dashboard
 * @see app/Http/Controllers/HabitacionEventoController.php:280
 * @route '/habitaciones-dashboard'
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
const habitaciones = {
    updateEstado: Object.assign(updateEstado, updateEstado),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
cambiarEstado: Object.assign(cambiarEstado, cambiarEstado),
dashboard: Object.assign(dashboard, dashboard),
}

export default habitaciones