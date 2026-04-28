import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ClasificacionClienteController::lote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
export const lote = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lote.url(options),
    method: 'post',
})

lote.definition = {
    methods: ["post"],
    url: '/clientes/clasificar-lote',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::lote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
lote.url = (options?: RouteQueryOptions) => {
    return lote.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::lote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
lote.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lote.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::lote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
    const loteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lote.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::lote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
        loteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lote.url(options),
            method: 'post',
        })
    
    lote.form = loteForm
const clasificar = {
    lote: Object.assign(lote, lote),
}

export default clasificar