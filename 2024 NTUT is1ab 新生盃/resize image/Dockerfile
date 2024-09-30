FROM php:7-apache
COPY flag /flag
RUN chmod 400 /flag
COPY readflag.c /readflag.c
RUN gcc /readflag.c -o /readflag
RUN chmod 555 /readflag
RUN chmod u+s /readflag
COPY index.php /var/www/html/
RUN mkdir /var/www/html/uploads
RUN chmod 555 /var/www/html/index.php 
RUN chmod 555 /var/www/html/
RUN  chmod 777 /var/www/html/uploads
COPY .htaccess /var/www/html/uploads/.htaccess
USER www-data