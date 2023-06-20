-- Drop the table "drinkMenu" if it exists
-- I figured out that if you want to test the "DROP TABLE IF EXISTS" then you should drop the join table first. If you try to drop one of the tables that the JOIN tables depends on you will get an error.
DROP TABLE IF EXISTS userDrinkReviews;
-- Drop the table "goodDrinks" if it exists
DROP TABLE IF EXISTS goodDrinks;
-- Drop the table "users" if it exists
DROP TABLE IF EXISTS users;

-- Create the table "goodDrinks"
CREATE TABLE goodDrinks (
    id serial PRIMARY KEY,
    drinkName varchar,
    liquorBase varchar,
    addOns varchar,
    if_ice boolean
);

-- Create the table "users"
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar,
    password varchar(25)
);

-- Create the join table "userDrinkReviews"
CREATE TABLE userDrinkReviews (
    reviewId serial,
    userId int,
    drinkId int,
    rating int,
    reviewText varchar(500),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (drinkId) REFERENCES goodDrinks(id)
);
