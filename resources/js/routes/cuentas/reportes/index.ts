import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
export const pdf = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/cuentas/{cuenta}/reportes/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
pdf.url = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cuenta: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cuenta: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cuenta: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cuenta: typeof args.cuenta === 'object'
                ? args.cuenta.id
                : args.cuenta,
                }

    return pdf.definition.url
            .replace('{cuenta}', parsedArgs.cuenta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
pdf.get = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
pdf.head = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
    const pdfForm = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
        pdfForm.get = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CuentaController::pdf
 * @see app/Http/Controllers/CuentaController.php:368
 * @route '/cuentas/{cuenta}/reportes/pdf'
 */
        pdfForm.head = (args: { cuenta: number | { id: number } } | [cuenta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
const reportes = {
    pdf: Object.assign(pdf, pdf),
}

export default reportes