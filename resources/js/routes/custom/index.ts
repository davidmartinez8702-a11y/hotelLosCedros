import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\CustomAuthController::login
 * @see app/Http/Controllers/Auth/CustomAuthController.php:17
 * @route '/custom-login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/custom-login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\CustomAuthController::login
 * @see app/Http/Controllers/Auth/CustomAuthController.php:17
 * @route '/custom-login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\CustomAuthController::login
 * @see app/Http/Controllers/Auth/CustomAuthController.php:17
 * @route '/custom-login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\CustomAuthController::login
 * @see app/Http/Controllers/Auth/CustomAuthController.php:17
 * @route '/custom-login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\CustomAuthController::login
 * @see app/Http/Controllers/Auth/CustomAuthController.php:17
 * @route '/custom-login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Auth\CustomAuthController::register
 * @see app/Http/Controllers/Auth/CustomAuthController.php:68
 * @route '/custom-register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/custom-register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\CustomAuthController::register
 * @see app/Http/Controllers/Auth/CustomAuthController.php:68
 * @route '/custom-register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\CustomAuthController::register
 * @see app/Http/Controllers/Auth/CustomAuthController.php:68
 * @route '/custom-register'
 */
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\CustomAuthController::register
 * @see app/Http/Controllers/Auth/CustomAuthController.php:68
 * @route '/custom-register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\CustomAuthController::register
 * @see app/Http/Controllers/Auth/CustomAuthController.php:68
 * @route '/custom-register'
 */
        registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(options),
            method: 'post',
        })
    
    register.form = registerForm
const custom = {
    login: Object.assign(login, login),
register: Object.assign(register, register),
}

export default custom