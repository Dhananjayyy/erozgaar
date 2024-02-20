@echo off
set "username=root"
set "password=govind"
set "db=testerozgaar"

(
    echo DROP DATABASE IF EXISTS %db%;
    echo CREATE DATABASE %db%;
    echo USE %db%;
    echo SOURCE tables.sql;
    echo SOURCE data.sql;	
    echo SOURCE triggers.sql;
) | mysql --user=%username% --password=%password%

echo Database setup complete
