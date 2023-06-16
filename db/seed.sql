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

-- Seed the table "users" with information using "INSERT INTO" and "VALUES"
INSERT INTO users (username, email, password)
VALUES 
    ('JohnDoe', 'johndoe@example.com', 'password123'),
    ('JaneSmith', 'janesmith@example.com', 'letmein'),
    ('RobertJohnson', 'robertjohnson@example.com', 'securepass');

-- Seed the table "drinkMenu" to establish the relationships
INSERT INTO userDrinkReviews (reviewId, userId, drinkId, rating, reviewText)
VALUES 
    (1, 1, 1, 4, 'Great drink! Loved the combination of tequila and orange juice.'),
    (2, 1, 2, 3, 'Classic cocktail with a nice balance of flavors.'),
    (3, 2, 3, 5, 'Refreshing and delicious. Perfect for summer.'),
    (4, 3, 4, 2, 'Not a fan of olives in my drink, but the gin was good.');