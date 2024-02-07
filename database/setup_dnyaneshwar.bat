@echo off
set "username=root"
set "password=govind"
set "db=erozgaar"

(
    echo DROP DATABASE IF EXISTS %db%;
    echo CREATE DATABASE %db%;
    echo USE %db%;
    echo SOURCE tables.sql;
) | mysql --user=%username% --password=%password%

echo Database setup complete
