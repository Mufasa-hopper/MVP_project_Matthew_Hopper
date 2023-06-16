-- Drop the table "goodDrinks" if it exists
DROP TABLE IF EXISTS goodDrinks;
-- Drop the table "bars" if it exists
DROP TABLE IF EXISTS bars;
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

-- Create the table "bars"
CREATE TABLE bars (
    id serial,
    barName varchar,
    yearEstablished int
);

-- Create the join table "drinkMenu"
CREATE TABLE drinkMenu (
    goodDrinkId int,
    barId int,
    FOREIGN KEY (goodDrinkId) REFERENCES goodDrinks(id),
    FOREIGN KEY (barId) REFERENCES bars(id)
);

