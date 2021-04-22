# dice-app-API+MongoDB+JWT

## Prove your luck by rolling the magic dice with this api. 

### installation:
    - npm install
    - insert your database configuration data in the dbConfig.js file located in the 'config' folder

### usage:

    Start app with << npm start >>

### generate token:
    - the token allows you to visit all the routes below
    - make sure to generate one by visiting http://localhost:3000/login and by inserting the correct
        username and password in the req body. You can copy and paste this: { "username": "fakeone", "pwd": "123abc" }
    - insert the token in the headers before clicking send 
    - in the header insert Authorization: Bearer <your generated token> 


### routes
------------- 
#### POST: /players:

    You can create a new player in two ways:
        - Anonymous: just create a body with an empty username like {"username":""}
        - Custom : choose your user but be careful, it can be already taken {"username":"your name"}

#### PUT /players:

    If you want to update an existing user create a body like this: {
    "old_username": "<your old user>",
    "new_username": "<your new user>"}

#### POST /players/{id}/games/:

    To play a game, insert your user associated id and you're ready to roll the dices!

#### DELETE /players/{id}/games:

    To delete all of your games, just insert your user associated id! 

#### GET /players/:

    This gives you back all the players and theirs associated success rate

#### GET /players/{id}/games:

    It returns all the games played by the user with the id you provide

#### GET /players/ranking: 

    It return the average success rate calculated among every players'

#### GET /players/ranking/loser:

    It returns the player with the lowest score

#### GET /players/ranking/winner:

    It returns the player with the best score

