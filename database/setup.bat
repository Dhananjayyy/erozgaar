@echo off
set "username=root"
set "password=root"
set "db=erozgaar"

(
    echo DROP DATABASE IF EXISTS %db%;
    echo CREATE DATABASE %db%;
    echo USE %db%;
    echo SOURCE tables.sql;
    echo SOURCE data.sql;	
    echo SOURCE triggers.sql;
    echo SOURCE procedures.sql;
) | mysql --user=%username% --password=%password%

echo Database setup complete
