import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ChatN8nController::send
 * @see app/Http/Controllers/Api/ChatN8nController.php:20
 * @route '/api/chat/send'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/api/chat/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ChatN8nController::send
 * @see app/Http/Controllers/Api/ChatN8nController.php:20
 * @route '/api/chat/send'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ChatN8nController::send
 * @see app/Http/Controllers/Api/ChatN8nController.php:20
 * @route '/api/chat/send'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ChatN8nController::send
 * @see app/Http/Controllers/Api/ChatN8nController.php:20
 * @route '/api/chat/send'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ChatN8nController::send
 * @see app/Http/Controllers/Api/ChatN8nController.php:20
 * @route '/api/chat/send'
 */
        sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(options),
            method: 'post',
        })
    
    send.form = sendForm
const chat = {
    send: Object.assign(send, send),
}

export default chat