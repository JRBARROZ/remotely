FROM laravelsail/php80-composer

WORKDIR /remotely

COPY . .

EXPOSE 8000

# RUN composer update
# RUN composer install

RUN apt-get install php-mysql

CMD ["php" , "--version"]
# CMD ["php","artisan","migrate:refresh"]

