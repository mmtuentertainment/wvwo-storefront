#!/bin/bash
# Initialize multiple PostgreSQL databases for WV Wild Outdoors

set -e
set -u

function create_user_and_database() {
    local database=$1
    local user=$2
    local password=$3
    echo "Creating user '$user' and database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $user WITH PASSWORD '$password';
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $user;
        \c $database
        GRANT ALL ON SCHEMA public TO $user;
EOSQL
}

# Create Directus database and user
create_user_and_database "wv_wild_dev" "directus_dev" "Gyg56nUVkyAD0HqCEIzCw"

# Create Ghost database and user
create_user_and_database "wv_wild_ghost_dev" "ghost_dev" "Ou3ner3uPDYY99kUA8sQ"

# Create Listmonk database and user
create_user_and_database "wv_wild_listmonk_dev" "listmonk_dev" "00rY7ONGhlgvAgEzIfQMw"

# Create Mixpost database and user
create_user_and_database "wv_wild_mixpost_dev" "mixpost_dev" "MJbclW1K3uvNGXxXC75Qg"

echo "All databases and users created successfully!"
