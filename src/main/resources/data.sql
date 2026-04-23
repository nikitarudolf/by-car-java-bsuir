-- Brands
INSERT INTO brands (name) VALUES
('Toyota'), ('BMW'), ('Mercedes-Benz'), ('Audi'), ('Volkswagen'),
('Ford'), ('Chevrolet'), ('Honda'), ('Nissan'), ('Hyundai'),
('Kia'), ('Mazda'), ('Subaru'), ('Lexus'), ('Porsche'),
('Volvo'), ('Peugeot'), ('Renault'), ('Skoda'), ('Opel')
ON CONFLICT DO NOTHING;

-- Models for Toyota
INSERT INTO models (name, brand_id) VALUES
('Camry', 1), ('Corolla', 1), ('RAV4', 1), ('Land Cruiser', 1), ('Highlander', 1),
('Prius', 1), ('Yaris', 1), ('Avalon', 1), ('4Runner', 1), ('Tacoma', 1);

-- Models for BMW
INSERT INTO models (name, brand_id) VALUES
('3 Series', 2), ('5 Series', 2), ('7 Series', 2), ('X3', 2), ('X5', 2),
('X7', 2), ('M3', 2), ('M5', 2), ('i4', 2), ('iX', 2);

-- Models for Mercedes-Benz
INSERT INTO models (name, brand_id) VALUES
('C-Class', 3), ('E-Class', 3), ('S-Class', 3), ('GLC', 3), ('GLE', 3),
('GLS', 3), ('A-Class', 3), ('CLA', 3), ('EQC', 3), ('G-Class', 3);

-- Models for Audi
INSERT INTO models (name, brand_id) VALUES
('A3', 4), ('A4', 4), ('A6', 4), ('A8', 4), ('Q3', 4),
('Q5', 4), ('Q7', 4), ('Q8', 4), ('e-tron', 4), ('RS6', 4);

-- Models for Volkswagen
INSERT INTO models (name, brand_id) VALUES
('Golf', 5), ('Passat', 5), ('Tiguan', 5), ('Touareg', 5), ('Polo', 5),
('Jetta', 5), ('Arteon', 5), ('T-Roc', 5), ('ID.4', 5), ('Atlas', 5);

-- Models for Ford
INSERT INTO models (name, brand_id) VALUES
('Focus', 6), ('Fiesta', 6), ('Mustang', 6), ('Explorer', 6), ('F-150', 6),
('Escape', 6), ('Edge', 6), ('Ranger', 6), ('Bronco', 6), ('Maverick', 6);

-- Models for Chevrolet
INSERT INTO models (name, brand_id) VALUES
('Cruze', 7), ('Malibu', 7), ('Camaro', 7), ('Corvette', 7), ('Silverado', 7),
('Equinox', 7), ('Traverse', 7), ('Tahoe', 7), ('Suburban', 7), ('Blazer', 7);

-- Models for Honda
INSERT INTO models (name, brand_id) VALUES
('Civic', 8), ('Accord', 8), ('CR-V', 8), ('Pilot', 8), ('Odyssey', 8),
('HR-V', 8), ('Passport', 8), ('Ridgeline', 8), ('Fit', 8), ('Insight', 8);

-- Models for Nissan
INSERT INTO models (name, brand_id) VALUES
('Altima', 9), ('Sentra', 9), ('Maxima', 9), ('Rogue', 9), ('Murano', 9),
('Pathfinder', 9), ('Armada', 9), ('Frontier', 9), ('Titan', 9), ('Leaf', 9);

-- Models for Hyundai
INSERT INTO models (name, brand_id) VALUES
('Elantra', 10), ('Sonata', 10), ('Tucson', 10), ('Santa Fe', 10), ('Palisade', 10),
('Kona', 10), ('Venue', 10), ('Ioniq', 10), ('Genesis', 10), ('Veloster', 10);

-- Models for Kia
INSERT INTO models (name, brand_id) VALUES
('Optima', 11), ('Forte', 11), ('Sportage', 11), ('Sorento', 11), ('Telluride', 11),
('Soul', 11), ('Seltos', 11), ('Stinger', 11), ('Niro', 11), ('Carnival', 11);

-- Models for Mazda
INSERT INTO models (name, brand_id) VALUES
('Mazda3', 12), ('Mazda6', 12), ('CX-3', 12), ('CX-5', 12), ('CX-9', 12),
('CX-30', 12), ('MX-5', 12), ('CX-50', 12), ('Mazda2', 12), ('RX-8', 12);

-- Models for Subaru
INSERT INTO models (name, brand_id) VALUES
('Impreza', 13), ('Legacy', 13), ('Outback', 13), ('Forester', 13), ('Crosstrek', 13),
('Ascent', 13), ('WRX', 13), ('BRZ', 13), ('Solterra', 13), ('Baja', 13);

-- Models for Lexus
INSERT INTO models (name, brand_id) VALUES
('ES', 14), ('IS', 14), ('GS', 14), ('LS', 14), ('RX', 14),
('NX', 14), ('GX', 14), ('LX', 14), ('UX', 14), ('LC', 14);

-- Models for Porsche
INSERT INTO models (name, brand_id) VALUES
('911', 15), ('Cayenne', 15), ('Macan', 15), ('Panamera', 15), ('Taycan', 15),
('718 Boxster', 15), ('718 Cayman', 15), ('918 Spyder', 15), ('Carrera GT', 15), ('Boxster', 15);

-- Models for Volvo
INSERT INTO models (name, brand_id) VALUES
('S60', 16), ('S90', 16), ('V60', 16), ('V90', 16), ('XC40', 16),
('XC60', 16), ('XC90', 16), ('C40', 16), ('Polestar', 16), ('V40', 16);

-- Models for Peugeot
INSERT INTO models (name, brand_id) VALUES
('208', 17), ('308', 17), ('508', 17), ('2008', 17), ('3008', 17),
('5008', 17), ('Partner', 17), ('Rifter', 17), ('Traveller', 17), ('Expert', 17);

-- Models for Renault
INSERT INTO models (name, brand_id) VALUES
('Clio', 18), ('Megane', 18), ('Captur', 18), ('Kadjar', 18), ('Koleos', 18),
('Talisman', 18), ('Scenic', 18), ('Espace', 18), ('Zoe', 18), ('Arkana', 18);

-- Models for Skoda
INSERT INTO models (name, brand_id) VALUES
('Octavia', 19), ('Superb', 19), ('Fabia', 19), ('Kodiaq', 19), ('Karoq', 19),
('Kamiq', 19), ('Scala', 19), ('Rapid', 19), ('Enyaq', 19), ('Yeti', 19);

-- Models for Opel
INSERT INTO models (name, brand_id) VALUES
('Astra', 20), ('Insignia', 20), ('Corsa', 20), ('Mokka', 20), ('Crossland', 20),
('Grandland', 20), ('Combo', 20), ('Vivaro', 20), ('Zafira', 20), ('Vectra', 20);

-- Features
INSERT INTO features (name) VALUES ('ABS');
INSERT INTO features (name) VALUES ('ESP');
INSERT INTO features (name) VALUES ('Airbags');
INSERT INTO features (name) VALUES ('Parking Sensors');
INSERT INTO features (name) VALUES ('Rear Camera');
INSERT INTO features (name) VALUES ('Blind Spot Monitor');
INSERT INTO features (name) VALUES ('Lane Assist');
INSERT INTO features (name) VALUES ('Adaptive Cruise Control');
INSERT INTO features (name) VALUES ('Emergency Braking');
INSERT INTO features (name) VALUES ('Night Vision');
INSERT INTO features (name) VALUES ('Climate Control');
INSERT INTO features (name) VALUES ('Heated Seats');
INSERT INTO features (name) VALUES ('Ventilated Seats');
INSERT INTO features (name) VALUES ('Leather Seats');
INSERT INTO features (name) VALUES ('Power Seats');
INSERT INTO features (name) VALUES ('Memory Seats');
INSERT INTO features (name) VALUES ('Sunroof');
INSERT INTO features (name) VALUES ('Panoramic Roof');
INSERT INTO features (name) VALUES ('Keyless Entry');
INSERT INTO features (name) VALUES ('Start/Stop Button');
INSERT INTO features (name) VALUES ('Cruise Control');
INSERT INTO features (name) VALUES ('Rain Sensor');
INSERT INTO features (name) VALUES ('Light Sensor');
INSERT INTO features (name) VALUES ('Heated Steering Wheel');
INSERT INTO features (name) VALUES ('Massage Seats');
INSERT INTO features (name) VALUES ('Navigation');
INSERT INTO features (name) VALUES ('Bluetooth');
INSERT INTO features (name) VALUES ('Apple CarPlay');
INSERT INTO features (name) VALUES ('Android Auto');
INSERT INTO features (name) VALUES ('Premium Audio');
INSERT INTO features (name) VALUES ('Wireless Charging');
INSERT INTO features (name) VALUES ('USB Ports');
INSERT INTO features (name) VALUES ('Rear Entertainment');
INSERT INTO features (name) VALUES ('WiFi Hotspot');
INSERT INTO features (name) VALUES ('Digital Dashboard');
INSERT INTO features (name) VALUES ('Head-Up Display');
INSERT INTO features (name) VALUES ('LED Headlights');
INSERT INTO features (name) VALUES ('Xenon Headlights');
INSERT INTO features (name) VALUES ('Fog Lights');
INSERT INTO features (name) VALUES ('Alloy Wheels');
INSERT INTO features (name) VALUES ('Roof Rails');
INSERT INTO features (name) VALUES ('Tow Hitch');
INSERT INTO features (name) VALUES ('Spoiler');
INSERT INTO features (name) VALUES ('Chrome Package');
INSERT INTO features (name) VALUES ('Tinted Windows');
INSERT INTO features (name) VALUES ('Sport Suspension');
INSERT INTO features (name) VALUES ('Air Suspension');
INSERT INTO features (name) VALUES ('Sport Mode');
INSERT INTO features (name) VALUES ('Launch Control');
INSERT INTO features (name) VALUES ('Limited Slip Differential');
INSERT INTO features (name) VALUES ('Performance Exhaust');
INSERT INTO features (name) VALUES ('Turbocharger');

-- Users
INSERT INTO users (name, phone, email, city, is_verified, is_dealer, company_name) VALUES
('Иван Петров', '+375291234567', 'ivan@mail.ru', 'Минск', true, false, null),
('Мария Сидорова', '+375292345678', 'maria@mail.ru', 'Гомель', true, false, null),
('Автосалон Премиум', '+375293456789', 'premium@auto.by', 'Минск', true, true, 'Премиум Авто'),
('Дмитрий Козлов', '+375294567890', 'dmitry@mail.ru', 'Брест', true, false, null),
('Автохаус Центр', '+375295678901', 'center@autohaus.by', 'Минск', true, true, 'Автохаус Центр'),
('Александр Новиков', '+375296789012', 'alex@mail.ru', 'Витебск', true, false, null),
('Елена Морозова', '+375297890123', 'elena@mail.ru', 'Гродно', true, false, null),
('Автомир', '+375298901234', 'info@automir.by', 'Минск', true, true, 'Автомир'),
('Сергей Волков', '+375299012345', 'sergey@mail.ru', 'Могилев', true, false, null),
('Ольга Белова', '+375441234567', 'olga@mail.ru', 'Минск', true, false, null);

-- Cars
INSERT INTO cars (year, mileage, vin, engine_type, engine_volume, engine_power, transmission_type, drive_type, body_type, color, doors_count, fuel_consumption, condition, is_customs_cleared, model_id) VALUES
(2020, 45000, 'JT2BF18K0X0123456', 'PETROL', 2.5, 181, 'AUTOMATIC', 'FRONT', 'SEDAN', 'Черный', 4, 7.5, 'USED', true, 1),
(2019, 65000, 'WBADT43452G123456', 'DIESEL', 2.0, 190, 'AUTOMATIC', 'REAR', 'SEDAN', 'Белый', 4, 5.8, 'USED', true, 11),
(2021, 25000, 'WDD2050071F123456', 'PETROL', 2.0, 204, 'AUTOMATIC', 'REAR', 'SEDAN', 'Серебристый', 4, 7.2, 'USED', true, 21),
(2022, 15000, 'WAUZZZ8V8MA123456', 'HYBRID', 2.0, 252, 'AUTOMATIC', 'ALL', 'SUV', 'Синий', 5, 6.5, 'USED', true, 36),
(2018, 85000, 'WVWZZZ3CZJE123456', 'PETROL', 1.4, 150, 'ROBOT', 'FRONT', 'HATCHBACK', 'Красный', 5, 5.9, 'USED', true, 41),
(2023, 5000, '1FAHP3K28NL123456', 'PETROL', 5.0, 450, 'AUTOMATIC', 'REAR', 'COUPE', 'Желтый', 2, 12.5, 'NEW', true, 53),
(2020, 55000, '19UUB2F58LA123456', 'PETROL', 1.5, 174, 'VARIATOR', 'FRONT', 'SEDAN', 'Белый', 4, 6.2, 'USED', true, 71),
(2021, 35000, '5N1AR2MM8MC123456', 'ELECTRIC', 0.0, 214, 'AUTOMATIC', 'FRONT', 'SUV', 'Черный', 5, 0.0, 'USED', true, 90),
(2019, 70000, 'KMHD84LF5KU123456', 'DIESEL', 2.0, 185, 'AUTOMATIC', 'ALL', 'SUV', 'Серый', 5, 6.8, 'USED', true, 93),
(2022, 20000, '5XYP5DHC5NG123456', 'PETROL', 2.5, 191, 'AUTOMATIC', 'ALL', 'SUV', 'Белый', 5, 8.1, 'USED', true, 104);

-- Advertisements
INSERT INTO advertisement (title, description, price, city, region, views_count, status, show_phone, contact_name, negotiable, exchange_possible, user_id, car_id) VALUES
('Toyota Camry 2020, 2.5L, черный', 'Продается Toyota Camry в отличном состоянии. Один владелец, полная сервисная история. Комплектация: климат-контроль, кожаный салон, камера заднего вида, парктроники.', 28500, 'Минск', 'Минская область', 156, 'ACTIVE', true, 'Иван', true, false, 1, 1),
('BMW 3 Series 2019, дизель', 'BMW 3 Series в идеальном состоянии. Экономичный дизельный двигатель, полный привод. Регулярное ТО у официального дилера.', 32000, 'Минск', 'Минская область', 243, 'ACTIVE', true, null, true, true, 3, 2),
('Mercedes-Benz C-Class 2021', 'Премиальный седан Mercedes-Benz C-Class. Минимальный пробег, как новый. Полная комплектация, панорамная крыша, мультимедиа.', 45000, 'Гомель', 'Гомельская область', 189, 'ACTIVE', true, 'Мария', false, false, 2, 3),
('Audi Q5 2022 Hybrid', 'Новый Audi Q5 с гибридной установкой. Экономичный и мощный. Полный привод Quattro, адаптивная подвеска, виртуальная приборная панель.', 52000, 'Минск', 'Минская область', 312, 'ACTIVE', true, null, false, false, 5, 4),
('Volkswagen Golf 2018', 'Надежный Volkswagen Golf в хорошем состоянии. Экономичный двигатель 1.4 TSI, роботизированная коробка DSG. Идеален для города.', 16500, 'Брест', 'Брестская область', 98, 'ACTIVE', true, 'Дмитрий', true, true, 4, 5),
('Ford Mustang 2023 NEW!', 'Новый Ford Mustang GT! Мощный V8 5.0L, 450 л.с. Легендарный американский маслкар. Спортивная подвеска, Brembo тормоза.', 75000, 'Минск', 'Минская область', 567, 'ACTIVE', true, null, false, false, 8, 6),
('Honda Civic 2020', 'Honda Civic в отличном состоянии. Надежный японский автомобиль с вариатором. Экономичный расход топлива, комфортный салон.', 22000, 'Витебск', 'Витебская область', 134, 'ACTIVE', true, 'Александр', true, false, 6, 7),
('Nissan Leaf 2021 Electric', 'Электромобиль Nissan Leaf. Запас хода до 270 км. Экономия на топливе, тихий и комфортный. Быстрая зарядка.', 29000, 'Минск', 'Минская область', 421, 'ACTIVE', true, null, true, false, 3, 8),
('Hyundai Tucson 2019 Diesel', 'Hyundai Tucson с дизельным двигателем и полным приводом. Просторный салон, большой багажник. Отличный семейный автомобиль.', 24500, 'Гродно', 'Гродненская область', 167, 'ACTIVE', true, 'Елена', true, true, 7, 9),
('Kia Sorento 2022', 'Новый Kia Sorento в топовой комплектации. 7 мест, полный привод, панорамная крыша, кожаный салон, все опции.', 38000, 'Могилев', 'Могилевская область', 289, 'ACTIVE', true, 'Сергей', false, false, 9, 10);

-- Car Features (ManyToMany)
INSERT INTO car_features (car_id, feature_id) VALUES
-- Toyota Camry features
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 11), (1, 12), (1, 14), (1, 16), (1, 17), (1, 19), (1, 20), (1, 26), (1, 27), (1, 28), (1, 37),
-- BMW 3 Series features
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 11), (2, 13), (2, 14), (2, 16), (2, 17), (2, 19), (2, 20), (2, 26), (2, 27), (2, 28), (2, 29), (2, 35), (2, 37), (2, 39),
-- Mercedes C-Class features
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 11), (3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18), (3, 19), (3, 20), (3, 24), (3, 25), (3, 26), (3, 27), (3, 28), (3, 29), (3, 30), (3, 35), (3, 36), (3, 37), (3, 39),
-- Audi Q5 features
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 11), (4, 13), (4, 14), (4, 16), (4, 17), (4, 18), (4, 19), (4, 20), (4, 26), (4, 27), (4, 28), (4, 29), (4, 35), (4, 36), (4, 37), (4, 38), (4, 39), (4, 46),
-- VW Golf features
(5, 1), (5, 2), (5, 3), (5, 4), (5, 11), (5, 16), (5, 17), (5, 19), (5, 26), (5, 27), (5, 37),
-- Ford Mustang features
(6, 1), (6, 2), (6, 3), (6, 11), (6, 14), (6, 16), (6, 17), (6, 19), (6, 20), (6, 26), (6, 27), (6, 29), (6, 37), (6, 39), (6, 44), (6, 45), (6, 46), (6, 47), (6, 48), (6, 50),
-- Honda Civic features
(7, 1), (7, 2), (7, 3), (7, 4), (7, 11), (7, 16), (7, 17), (7, 18), (7, 19), (7, 20), (7, 26), (7, 27), (7, 28), (7, 37), (7, 38),
-- Nissan Leaf features
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7), (8, 11), (8, 16), (8, 17), (8, 18), (8, 19), (8, 20), (8, 26), (8, 27), (8, 28), (8, 35), (8, 37), (8, 38),
-- Hyundai Tucson features
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 11), (9, 12), (9, 16), (9, 17), (9, 19), (9, 20), (9, 26), (9, 27), (9, 37), (9, 39),
-- Kia Sorento features
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6), (10, 11), (10, 12), (10, 13), (10, 14), (10, 16), (10, 17), (10, 18), (10, 19), (10, 20), (10, 26), (10, 27), (10, 28), (10, 29), (10, 35), (10, 37), (10, 38), (10, 39);

-- Photos for advertisements
INSERT INTO photos (url, order_index, is_main, advertisement_id) VALUES
-- 1. Toyota Camry (Черная)
('https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 0, true, 1),

-- 2. BMW 3 Series (Белая)
('https://images.unsplash.com/photo-1734554275379-9600817f5655?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qk1XJTIwMyUyMFNlcmllcyUyMCglRDAlOTElRDAlQjUlRDAlQkIlRDAlQjAlRDElOEYpfGVufDB8fDB8fHww', 0, true, 2),
('https://images.unsplash.com/photo-1734554258108-63f09694fe88?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Qk1XJTIwMyUyMFNlcmllcyUyMCglRDAlOTElRDAlQjUlRDAlQkIlRDAlQjAlRDElOEYpfGVufDB8fDB8fHww', 1, true, 2),
('https://images.unsplash.com/photo-1734554284184-4bcf245250c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3, true, 2),
-- 3. Mercedes-Benz C-Class (Серебристый)
('https://images.unsplash.com/photo-1664626692098-2e35eb4aa7ca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVyY2VkZXMlMjBiZW56JTIwYyUyMGNsYXNzfGVufDB8fDB8fHww', 0, true, 3),
('https://images.unsplash.com/photo-1686562472684-f305deb11c92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lcmNlZGVzJTIwYmVueiUyMGMlMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D', 1, true, 3),
('https://images.unsplash.com/photo-1664626670384-21fad2ee8610?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1lcmNlZGVzJTIwYmVueiUyMGMlMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D', 2, true, 3),
-- 4. Audi Q5 (Синий SUV)
('https://images.unsplash.com/photo-1769641156976-f7a62f61800f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fC0tJTIwNC4lMjBBdWRpJTIwUTUlMjAoJUQwJUExJUQwJUI4JUQwJUJEJUQwJUI4JUQwJUI5JTIwU1VWKXxlbnwwfHwwfHx8MA%3D%3D', 0, true, 4),

-- 5. Volkswagen Golf (Красный хэтчбек)
('https://images.unsplash.com/photo-1624978971503-3e5b8c9d5bd1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8LS0lMjA1LiUyMFZvbGtzd2FnZW4lMjBHb2xmJTIwKCVEMCU5QSVEMSU4MCVEMCVCMCVEMSU4MSVEMCVCRCVEMSU4QiVEMCVCOSUyMCVEMSU4NSVEMSU4RCVEMSU4MiVEMSU4NyVEMCVCMSVEMCVCNSVEMCVCQSl8ZW58MHx8MHx8fDA%3D', 0, true, 5),

-- 6. Ford Mustang (Желтый)
('https://images.unsplash.com/photo-1581650107963-3e8c1f48241b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fC0tJTIwNi4lMjBGb3JkJTIwTXVzdGFuZyUyMCglRDAlOTYlRDAlQjUlRDAlQkIlRDElODIlRDElOEIlRDAlQjkpfGVufDB8fDB8fHww', 0, true, 6),

-- 7. Honda Civic (Белая)
('https://images.unsplash.com/photo-1613751382362-6492c991bc91?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fC0tJTIwNy4lMjBIb25kYSUyMENpdmljJTIwKCVEMCU5MSVEMCVCNSVEMCVCQiVEMCVCMCVEMSU4Ril8ZW58MHx8MHx8fDA%3D', 0, true, 7),

-- 8. Nissan Leaf / Electric (Черный/Темный)
('https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5pc3NhbnxlbnwwfHwwfHx8MA%3D%3D', 0, true, 8),

-- 9. Hyundai Tucson (Серый SUV)tot
('https://images.unsplash.com/photo-1706082072635-d19df8f0f3fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8LS0lMjA5LiUyMEh5dW5kYWklMjBUdWNzb24lMjAoJUQwJUExJUQwJUI1JUQxJTgwJUQxJThCJUQwJUI5JTIwU1VWKXRvdHxlbnwwfHwwfHx8MA%3D%3D', 0, true, 9),

-- 10. Kia Sorento (Белый SUV)
('https://images.unsplash.com/photo-1681965363638-0a59618faa1a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8LS0lMjAxMC4lMjBLaWElMjBTb3JlbnRvJTIwKCVEMCU5MSVEMCVCNSVEMCVCQiVEMSU4QiVEMCVCOSUyMFNVVil8ZW58MHx8MHx8fDA%3D', 0, true, 10);
-- Favorites (ManyToMany через промежуточную таблицу)
INSERT INTO favorites (user_id, advertisement_id) VALUES
(1, 2), (1, 4), (1, 6), (1, 8),
(2, 1), (2, 3), (2, 5),
(4, 2), (4, 6), (4, 8), (4, 10),
(6, 1), (6, 3), (6, 4), (6, 7),
(7, 2), (7, 6), (7, 9),
(9, 1), (9, 4), (9, 8),
(10, 3), (10, 5), (10, 6), (10, 10);
