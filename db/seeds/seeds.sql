INSERT INTO employees (firstName, lastName, email, pin, is_admin, start_date)
VALUES ('Cam', 'Brown', 'cameron-brown@live.com', '1111',  TRUE, CLOCK_TIMESTAMP()),
('Michael', 'Krishna', 'test@test.com', 2222,  TRUE, CLOCK_TIMESTAMP()),
('Marcel', 'Mueller', 'mail.marcelm@gmail.com', 4444,  TRUE, CLOCK_TIMESTAMP());

INSERT INTO categories (name, is_food)
VALUES('Beer', false),
('Wine', false),
('Cocktail', false),
('Spirit', false),
('Appetizers', TRUE),
('Mains', TRUE),
('Deserts', TRUE);

INSERT INTO menu_items (category_id, name, price, description, quantity, is_active)
VALUES (1, 'Fat Tug', 5.75, 'A Hoppy IPA', 100, TRUE),
 (1, 'Guinness', 8.75, 'A dark irish stout', 100, TRUE),
 (1, 'Bomber Lager', 4.75, 'A Light Lager', 100, TRUE),
 (1, 'Twin Sails Dat Juice', 6.75, 'A refreshing pale ale', 100, TRUE),
 (1, 'Philips Blue Buck', 5.75, 'A nice pale ale', 100, TRUE),
 (2, 'Red Wine', 5.75, 'A nice red wine', 100, TRUE),
 (2, 'White Wine', 5.75, 'A nice white wine', 100, TRUE),
 (2, 'Rose Wine', 5.75, 'A nice rose wine', 100, TRUE),
 (2, 'Sparkling Wine', 8.75, 'A nice sparkling wine', 100, TRUE),
 (2, 'Expensice Champagne', 100, 'A really nice Champagne', 100, TRUE),
 (3, 'Whiskey Sour', 12, 'A refreshing whiskey drink', 100, TRUE),
 (3, 'Old Fashion', 15, 'A strong whiskey drink', 100, TRUE),
 (3, 'Cosmopolition', 12, 'A fruit cocktail', 100, TRUE),
 (3, 'Bee''s Knees', 13, 'A nice cocktail', 100, TRUE),
 (3, 'French 75', 14, 'A sparkling cocktail', 100, TRUE),
 (3, 'Daiquiri', 12, 'A classic rum cocktail', 100, TRUE),
 (4, 'Rum', 8, 'Well rum', 100, TRUE),
 (4, 'Vodka', 8, 'Well vodka', 100, TRUE),
 (4, 'Whiskey', 8, 'Well whiskey', 100, TRUE),
 (4, 'Gin', 8, 'Well gin', 100, TRUE),
 (4, 'Cognac', 8, 'Well cognac', 100, TRUE),
 (5, 'French Fries', 5, 'The best french fries', 100, TRUE),
 (5, 'Spring Rolls', 9, 'Delicious spring rolls', 100, TRUE),
 (5, 'Popcorn Shrimp', 12, 'Poppin popcorn shrimp ', 100, TRUE),
 (5, 'Poutine', 9, 'Canada''s very own', 100, TRUE),
 (5, 'Bacon Rashers', 8, 'Bacon, just bacon', 100, TRUE),
 (6, 'Pepperoni Pizz', 12, 'Pizza like you''ve never had', 100, TRUE),
 (6, 'Fried Salmon', 21, 'Deep fried Sockeye salmon', 100, TRUE),
 (6, 'AAA Steak', 22, 'Fine grade beef', 100, TRUE),
 (6, 'Beef Burger', 17, 'A fancy beef burger', 100, TRUE),
 (6, 'Chicken Burger', 17, 'A fancy chicken burger', 100, TRUE),
 (7, 'Vanilla Ice Cream', 10, 'Plain vanilla ice cream', 100, TRUE),
 (7, 'Angel Food Cake', 11, 'Cake like it''s someones birthday', 100, TRUE),
 (7, 'Pumpkin Pie', 11, 'The best pie hands down', 100, TRUE),
 (7, 'Some Fancy Desert', 20, 'Some desert, I am not sure what', 100, TRUE),
 (7, 'Chocolate Cake', 14, 'For the chocolate lover', 100, TRUE);

INSERT INTO tables (employee_id, number_of_seats)
VALUES (1, 4);

INSERT INTO seats (seat_number, table_id)
VALUES(1, 1),
(2, 1),
(3, 1),
(4, 1);

INSERT INTO orders (employee_id, table_id)
VALUES (1, 1);

INSERT INTO order_items (order_id, seat_id, item)
VALUES (1, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4);