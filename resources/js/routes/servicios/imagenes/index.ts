import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ServicioController::subir
 * @see app/Http/Controllers/ServicioController.php:159
 * @route '/servicios/{servicio}/imagenes'
 */
export const subir = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subir.url(args, options),
    method: 'post',
})

subir.definition = {
    methods: ["post"],
    url: '/servicios/{servicio}/imagenes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServicioController::subir
 * @see app/Http/Controllers/ServicioController.php:159
 * @route '/servicios/{servicio}/imagenes'
 */
subir.url = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return subir.definition.url
            .replace('{servicio}', parsedArgs.servicio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServicioController::subir
 * @see app/Http/Controllers/ServicioController.php:159
 * @route '/servicios/{servicio}/imagenes'
 */
subir.post = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: subir.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServicioController::subir
 * @see app/Http/Controllers/ServicioController.php:159
 * @route '/servicios/{servicio}/imagenes'
 */
    const subirForm = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: subir.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServicioController::subir
 * @see app/Http/Controllers/ServicioController.php:159
 * @route '/servicios/{servicio}/imagenes'
 */
        subirForm.post = (args: { servicio: number | { id: number } } | [servicio: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: subir.url(args, options),
            method: 'post',
        })
    
    subir.form = subirForm
/**
* @see \App\Http\Controllers\ServicioController::eliminar
 * @see app/Http/Controllers/ServicioController.php:178
 * @route '/servicios/imagenes/{imagen}'
 */
export const eliminar = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminar.url(args, options),
    method: 'delete',
})

eliminar.definition = {
    methods: ["delete"],
    url: '/servicios/imagenes/{imagen}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServicioController::eliminar
 * @see app/Http/Controllers/ServicioController.php:178
 * @route '/servicios/imagenes/{imagen}'
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
* @see \App\Http\Controllers\ServicioController::eliminar
 * @see app/Http/Controllers/ServicioController.php:178
 * @route '/servicios/imagenes/{imagen}'
 */
eliminar.delete = (args: { imagen: number | { id: number } } | [imagen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: eliminar.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServicioController::eliminar
 * @see app/Http/Controllers/ServicioController.php:178
 * @route '/servicios/imagenes/{imagen}'
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
* @see \App\Http\Controllers\ServicioController::eliminar
 * @see app/Http/Controllers/ServicioController.php:178
 * @route '/servicios/imagenes/{imagen}'
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