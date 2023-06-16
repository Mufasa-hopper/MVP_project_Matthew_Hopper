-- Seed the table "goodDrinks" with information using "INSERT INTO" and "VALUES"
INSERT INTO goodDrinks (drinkName, liquorBase, addOns, if_ice)
VALUES 
    ('Tequila Sunrise', 'Tequila', 'orange juice, and grenadine syrup', true),
    ('Old Fashioned', 'Whiskey', 'sugar cube, bitters, orange slice, and a cherry', true),
    ('Dark and Stormy', 'Rum', 'ginger beer, and lime', true),
    ('Martini', 'Gin', 'dry vermouth, lemon twist, and olives', false),
    ('Mojito', 'Rum', 'fresh mint leaves, lime juice, simple syrup, and club soda', true),
    ('Cosmopolitan', 'Vodka', 'cranberry juice, lime juice, and triple sec', false),
    ('Margarita', 'Tequila', 'lime juice, triple sec, and salt rim', true),
    ('Whiskey Sour', 'Whiskey', 'lemon juice, simple syrup, and a cherry', true),
    ('Piña Colada', 'Rum', 'pineapple juice, coconut cream, and a pineapple wedge', true);

-- Seed the table "bars" with information using "INSERT INTO" and "VALUES"
INSERT INTO bars (barName, yearEstablished)
VALUES ('Hops Pub', 2000);

-- Seed the table "drinkMenu" to establish the relationships
INSERT INTO drinkMenu (goodDrinkId, barId)
VALUES (1, 1), (2, 1), (3, 1), (4, 1);