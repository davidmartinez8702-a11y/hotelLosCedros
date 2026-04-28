FROM richarvey/nginx-php-fpm:latest
WORKDIR /var/www/html

# Opc
COPY . .
# Instala dependencias de Composer
RUN composer install --no-dev --optimize-autoloader

# Instala dependencias de Node y compila assets
RUN npm ci && npm run build

# Opcional: cache de configuración y rutas
RUN php artisan config:cache && php artisan route:cache

# Image config
ENV SKIP_COMPOSER=1
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1

# Laravel config
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER=1

# CMD ["/start.sh"]