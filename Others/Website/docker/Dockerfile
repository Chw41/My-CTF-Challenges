FROM php:7.2.10-fpm

RUN docker-php-ext-install pdo pdo_mysql
RUN sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list
RUN sed -i 's|security.debian.org|archive.debian.org/|g' /etc/apt/sources.list
RUN sed -i '/stretch-updates/d' /etc/apt/sources.list

RUN apt-get update -y && apt-get install -y libpng-dev
RUN docker-php-ext-install gd

COPY readflag.c /readflag.c
RUN sed -i 's/{FLAG}/\/flag/g' /readflag.c
RUN echo 'FLAG{fake_flag}' > /flag
RUN chmod 0400 /flag && chown root:root /flag
RUN chmod 0444 /readflag.c && gcc /readflag.c -o /readflag
RUN chown root:root /readflag && chmod 4555 /readflag

RUN rm -rf /readflag.c