import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TipoHabitacionController::subir
 * @see app/Http/Controllers/TipoHabitacionController.php:206
 * @route '/tipoHabitacion/{tipoHabitacion}/imagenes'
 */
export const subir = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subir.url(args, options),
    method: 'post',
})

subir.definition = {
    methods: ["post"],
    url: '/tipoHabitacion/{tipoHabitacion}/imagenes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::subir
 * @see app/Http/Controllers/TipoHabitacionController.php:206
 * @route '/tipoHabitacion/{tipoHabitacion}/imagenes'
 */
subir.url = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return subir.definition.url
            .replace('{tipoHabitacion}', parsedArgs.tipoHabitacion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::subir
 * @see app/Http/Controllers/TipoHabitacionController.php:206
 * @route '/tipoHabitacion/{tipoHabitacion}/imagenes'
 */
subir.post = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subir.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::subir
 * @see app/Http/Controllers/TipoHabitacionController.php:206
 * @route '/tipoHabitacion/{tipoHabitacion}/imagenes'
 */
    const subirForm = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: subir.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::subir
 * @see app/Http/Controllers/TipoHabitacionController.php:206
 * @route '/tipoHabitacion/{tipoHabitacion}/imagenes'
 */
        subirForm.post = (args: { tipoHabitacion: number | { id: number } } | [tipoHabitacion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: subir.url(args, options),
            method: 'post',
        })
    
    subir.form = subirForm
/**
* @see \App\Http\Controllers\TipoHabitacionController::eliminar
 * @see app/Http/Controllers/TipoHabitacionController.php:223
 * @route '/tipoHabitacion/imagenes/{imagen}'
 */
export const eliminar = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminar.url(args, options),
    method: 'delete',
})

eliminar.definition = {
    methods: ["delete"],
    url: '/tipoHabitacion/imagenes/{imagen}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TipoHabitacionController::eliminar
 * @see app/Http/Controllers/TipoHabitacionController.php:223
 * @route '/tipoHabitacion/imagenes/{imagen}'
 */
eliminar.url = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imagen: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { imagen: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    imagen: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imagen: typeof args.imagen === 'object'
                ? args.imagen.id
                : args.imagen,
                }

    return eliminar.definition.url
            .replace('{imagen}', parsedArgs.imagen.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TipoHabitacionController::eliminar
 * @see app/Http/Controllers/TipoHabitacionController.php:223
 * @route '/tipoHabitacion/imagenes/{imagen}'
 */
eliminar.delete = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminar.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TipoHabitacionController::eliminar
 * @see app/Http/Controllers/TipoHabitacionController.php:223
 * @route '/tipoHabitacion/imagenes/{imagen}'
 */
    const eliminarForm = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: eliminar.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TipoHabitacionController::eliminar
 * @see app/Http/Controllers/TipoHabitacionController.php:223
 * @route '/tipoHabitacion/imagenes/{imagen}'
 */
        eliminarForm.delete = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: eliminar.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    eliminar.form = eliminarForm
const imagenes = {
    subir: Object.assign(subir, subir),
eliminar: Object.assign(eliminar, eliminar),
}

export default imagenes