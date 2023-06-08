#!/bin/bash

echo "The requirements are:
1. The system should have a postgres database with the database name as swe_prod and the password for the postgres user should be admin.
2. The system should have python3.
3. The system should have node."

read -p "Do you want to Continue? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

pip3 install -r requirements.txt # Install all the requirements to run the backend
python3 emarket/manage.py runserver & # To run the server

cd emarket/client # Go to client directory
npm install # Install all the node modules required for react and client
npm start & # Starts the server

echo "Open http://localhost:3000/ in your browser"
