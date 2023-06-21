-- Drop the table "goodDrinks" if it exists
DROP TABLE IF EXISTS goodDrinks;

-- Drop the table "userDrinkReviews" if it exists
DROP TABLE IF EXISTS userDrinkReviews;

-- Create the table "goodDrinks"
CREATE TABLE goodDrinks (
    id serial PRIMARY KEY,
    drinkName varchar,
    liquorBase varchar,
    addOns varchar,
    if_ice boolean
);

-- Create the table "userDrinkReviews"
CREATE TABLE userDrinkReviews (
    id serial PRIMARY KEY,
    userId int,
    drinkId int,
    rating int,
    reviewText varchar(500),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (drinkId) REFERENCES goodDrinks(id)
);