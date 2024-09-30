FROM php:7.3-fpm
COPY flag /flag
RUN chmod 400 /flag
COPY readflag.c /readflag.c
RUN gcc /readflag.c -o /readflag
RUN chmod 555 /readflag
RUN chmod u+s /readflag
USER www-data