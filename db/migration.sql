-- Drop the table "goodDrinks" if it exists
DROP TABLE IF EXISTS goodDrinks;
-- Drop the table "users" if it exists
DROP TABLE IF EXISTS users;
-- Drop the table "drinkMenu" if it exists
DROP TABLE IF EXISTS drinkMenu;

-- Create the table "goodDrinks"
CREATE TABLE goodDrinks (
    id serial,
    drinkName varchar,
    liquorBase varchar,
    addOns varchar,
    if_ice boolean
);

-- Create the table "users"
CREATE TABLE users (
    id serial,
    username varchar,
    email varchar,
    password varchar(25)
);

-- Create the join table "drinkMenu"
CREATE TABLE userDrinkReviews (
    reviewId serial,
    userId int,
    drinkId int,
    rating int,
    reviewText varchar(500),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (drinkId) REFERENCES goodDrinks(id)
);
