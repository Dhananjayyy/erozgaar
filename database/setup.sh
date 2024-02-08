#!/bin/bash

username="root"
password="@DhananjayXX4X"
db="testerozgaar"

mysql --user="$username" --password="$password" <<EOF
DROP DATABASE IF EXISTS $db;
CREATE DATABASE $db;
USE $db;
SOURCE tables.sql;
SOURCE data.sql;
EOF
echo "Database setup complete"