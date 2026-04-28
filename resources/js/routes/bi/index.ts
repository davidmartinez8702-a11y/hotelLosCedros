import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import api from './api'
/**
 * @see routes/web.php:187
 * @route '/BI'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/BI',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:187
 * @route '/BI'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:187
 * @route '/BI'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:187
 * @route '/BI'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:187
 * @route '/BI'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:187
 * @route '/BI'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:187
 * @route '/BI'
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
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
export const indexDinamico = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexDinamico.url(options),
    method: 'get',
})

indexDinamico.definition = {
    methods: ["get","head"],
    url: '/BI-dinamico',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
indexDinamico.url = (options?: RouteQueryOptions) => {
    return indexDinamico.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
indexDinamico.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexDinamico.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
indexDinamico.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexDinamico.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
    const indexDinamicoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexDinamico.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
        indexDinamicoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexDinamico.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:191
 * @route '/BI-dinamico'
 */
        indexDinamicoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexDinamico.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexDinamico.form = indexDinamicoForm
/**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
export const indexV2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexV2.url(options),
    method: 'get',
})

indexV2.definition = {
    methods: ["get","head"],
    url: '/BI-v2',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
indexV2.url = (options?: RouteQueryOptions) => {
    return indexV2.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
indexV2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexV2.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
indexV2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexV2.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
    const indexV2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexV2.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
        indexV2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexV2.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:196
 * @route '/BI-v2'
 */
        indexV2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexV2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexV2.form = indexV2Form
const bi = {
    index: Object.assign(index, index),
indexDinamico: Object.assign(indexDinamico, indexDinamico),
indexV2: Object.assign(indexV2, indexV2),
api: Object.assign(api, api),
}

export default bi