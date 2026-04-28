import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
export const validarDatosSuficientes = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validarDatosSuficientes.url(options),
    method: 'get',
})

validarDatosSuficientes.definition = {
    methods: ["get","head"],
    url: '/kmeans/validar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
validarDatosSuficientes.url = (options?: RouteQueryOptions) => {
    return validarDatosSuficientes.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
validarDatosSuficientes.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: validarDatosSuficientes.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
validarDatosSuficientes.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: validarDatosSuficientes.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
    const validarDatosSuficientesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: validarDatosSuficientes.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
        validarDatosSuficientesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validarDatosSuficientes.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::validarDatosSuficientes
 * @see app/Http/Controllers/ClasificacionClienteController.php:330
 * @route '/kmeans/validar'
 */
        validarDatosSuficientesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: validarDatosSuficientes.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    validarDatosSuficientes.form = validarDatosSuficientesForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarCliente
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
export const clasificarCliente = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clasificarCliente.url(args, options),
    method: 'post',
})

clasificarCliente.definition = {
    methods: ["post"],
    url: '/clientes/{id}/clasificar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarCliente
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
clasificarCliente.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return clasificarCliente.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarCliente
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
clasificarCliente.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clasificarCliente.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarCliente
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
    const clasificarClienteForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clasificarCliente.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarCliente
 * @see app/Http/Controllers/ClasificacionClienteController.php:22
 * @route '/clientes/{id}/clasificar'
 */
        clasificarClienteForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clasificarCliente.url(args, options),
            method: 'post',
        })
    
    clasificarCliente.form = clasificarClienteForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarClientesEnLote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
export const clasificarClientesEnLote = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clasificarClientesEnLote.url(options),
    method: 'post',
})

clasificarClientesEnLote.definition = {
    methods: ["post"],
    url: '/clientes/clasificar-lote',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarClientesEnLote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
clasificarClientesEnLote.url = (options?: RouteQueryOptions) => {
    return clasificarClientesEnLote.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarClientesEnLote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
clasificarClientesEnLote.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clasificarClientesEnLote.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarClientesEnLote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
    const clasificarClientesEnLoteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clasificarClientesEnLote.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::clasificarClientesEnLote
 * @see app/Http/Controllers/ClasificacionClienteController.php:126
 * @route '/clientes/clasificar-lote'
 */
        clasificarClientesEnLoteForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clasificarClientesEnLote.url(options),
            method: 'post',
        })
    
    clasificarClientesEnLote.form = clasificarClientesEnLoteForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
export const verClasificacionesGuardadas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verClasificacionesGuardadas.url(options),
    method: 'get',
})

verClasificacionesGuardadas.definition = {
    methods: ["get","head"],
    url: '/clientes/clasificaciones',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
verClasificacionesGuardadas.url = (options?: RouteQueryOptions) => {
    return verClasificacionesGuardadas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
verClasificacionesGuardadas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verClasificacionesGuardadas.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
verClasificacionesGuardadas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verClasificacionesGuardadas.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
    const verClasificacionesGuardadasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verClasificacionesGuardadas.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
        verClasificacionesGuardadasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verClasificacionesGuardadas.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::verClasificacionesGuardadas
 * @see app/Http/Controllers/ClasificacionClienteController.php:720
 * @route '/clientes/clasificaciones'
 */
        verClasificacionesGuardadasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verClasificacionesGuardadas.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verClasificacionesGuardadas.form = verClasificacionesGuardadasForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
export const estadisticas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadisticas.url(options),
    method: 'get',
})

estadisticas.definition = {
    methods: ["get","head"],
    url: '/kmeans/estadisticas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
estadisticas.url = (options?: RouteQueryOptions) => {
    return estadisticas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
estadisticas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: estadisticas.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
estadisticas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: estadisticas.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
    const estadisticasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: estadisticas.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
        estadisticasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estadisticas.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::estadisticas
 * @see app/Http/Controllers/ClasificacionClienteController.php:675
 * @route '/kmeans/estadisticas'
 */
        estadisticasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: estadisticas.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    estadisticas.form = estadisticasForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
export const probarConDatosHardcodeados = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: probarConDatosHardcodeados.url(options),
    method: 'get',
})

probarConDatosHardcodeados.definition = {
    methods: ["get","head"],
    url: '/kmeans/test-hardcoded',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
probarConDatosHardcodeados.url = (options?: RouteQueryOptions) => {
    return probarConDatosHardcodeados.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
probarConDatosHardcodeados.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: probarConDatosHardcodeados.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
probarConDatosHardcodeados.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: probarConDatosHardcodeados.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
    const probarConDatosHardcodeadosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: probarConDatosHardcodeados.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
        probarConDatosHardcodeadosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: probarConDatosHardcodeados.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::probarConDatosHardcodeados
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/test-hardcoded'
 */
        probarConDatosHardcodeadosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: probarConDatosHardcodeados.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    probarConDatosHardcodeados.form = probarConDatosHardcodeadosForm
/**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
export const verLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verLogs.url(options),
    method: 'get',
})

verLogs.definition = {
    methods: ["get","head"],
    url: '/kmeans/logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
verLogs.url = (options?: RouteQueryOptions) => {
    return verLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
verLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
verLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verLogs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
    const verLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verLogs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
        verLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verLogs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClasificacionClienteController::verLogs
 * @see app/Http/Controllers/ClasificacionClienteController.php:0
 * @route '/kmeans/logs'
 */
        verLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verLogs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verLogs.form = verLogsForm
const ClasificacionClienteController = { validarDatosSuficientes, clasificarCliente, clasificarClientesEnLote, verClasificacionesGuardadas, estadisticas, probarConDatosHardcodeados, verLogs }

export default ClasificacionClienteController