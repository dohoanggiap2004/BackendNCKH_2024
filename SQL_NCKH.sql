DROP DATABASE IF EXISTS nckh; 
CREATE DATABASE nckh;          
USE nckh;                   

CREATE TABLE Categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(255) NOT NULL,
    parentCategoryId INT,
    FOREIGN KEY (parentCategoryId) REFERENCES Categories(categoryId) ON DELETE SET NULL
);


CREATE TABLE Promotions (
    promotionId INT PRIMARY KEY AUTO_INCREMENT,
    discountPercentage DECIMAL(5, 2) NOT NULL,
    promotionPeriod INT NOT NULL
);

CREATE TABLE Products (
    productId INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    gender VARCHAR(10),
    size VARCHAR(50),
    quantity INT,
    detail TEXT,
    introduction TEXT,
    careInstruction TEXT,
    categoryID INT,
    promotionID INT,
    FOREIGN KEY (categoryId) REFERENCES Categories(categoryId) ON DELETE SET NULL,
    FOREIGN KEY (promotionId) REFERENCES Promotions(promotionId) ON DELETE SET NULL
);

CREATE TABLE Users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255),
    gender VARCHAR(30),
    phoneNumber VARCHAR(15),
    dateOfBirth DATE,
    typeAcc VARCHAR(50),
    isAdmin BOOLEAN,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Vouchers (
    voucherId INT PRIMARY KEY AUTO_INCREMENT,
    expiryDate DATE NOT NULL,
    voucherCode VARCHAR(50),
    discountValue INT,
    description TEXT
);

CREATE TABLE Orders (
    orderId INT PRIMARY KEY AUTO_INCREMENT,
    orderStatus VARCHAR(50) NOT NULL,
    orderDate DATE NOT NULL,
    orderNotes TEXT,
    totalPayment DECIMAL(10, 2) NOT NULL,
    orderName VARCHAR(255) NOT NULL,
    orderAddress VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15),
    paymentMethod VARCHAR(50),
    shippingMethod VARCHAR(50),
    userId INT,
    voucherId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE,
    FOREIGN KEY (voucherId) REFERENCES Vouchers(voucherId) ON DELETE SET NULL
);

CREATE TABLE Products_Orders (
    productId INT,
    orderId INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (productId, orderId),
    FOREIGN KEY (productId) REFERENCES Products(productId) ON DELETE CASCADE,
    FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE
);

CREATE TABLE Color (
    colorId INT PRIMARY KEY AUTO_INCREMENT,
    colorName VARCHAR(50) NOT NULL,
    colorRGB VARCHAR(7)
);

CREATE TABLE Color_Detail (
    productId INT,
    colorId INT,
    imageURL VARCHAR(255),
    PRIMARY KEY (productId, colorId),
    FOREIGN KEY (productId) REFERENCES Products(productId) ON DELETE CASCADE,
    FOREIGN KEY (colorId) REFERENCES Color(colorId) ON DELETE SET NULL
);

CREATE TABLE User_Address (
    addressId INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    addressDetail VARCHAR(255) NOT NULL,
    ward VARCHAR(255),
    district VARCHAR(255),
    city VARCHAR(255),
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE Post_Categories (
    postCategoryId INT PRIMARY KEY AUTO_INCREMENT,
    postCategoryName VARCHAR(255) NOT NULL
);

CREATE TABLE Posts (
    postId INT PRIMARY KEY AUTO_INCREMENT,
    postTitle VARCHAR(255) NOT NULL,
    postContent TEXT,
    postCategoryId INT,
    FOREIGN KEY (postCategoryId) REFERENCES Post_Categories(postCategoryId) ON DELETE SET NULL
);

-- Insert data into Categories table
INSERT INTO Categories (categoryName, parentCategoryId) VALUES
('Electronics', NULL),
('Mobile Phones', 1),
('Laptops', 1),
('Fashion', NULL),
('Men', 4),
('Women', 4),
('Home Appliances', NULL),
('Smart Watches', 1),
('Accessories', 4);

-- Insert data into Promotions table
INSERT INTO Promotions (discountPercentage, promotionPeriod) VALUES
(10.00, 30),
(15.00, 15),
(5.00, 60),
(20.00, 20),
(25.00, 25);

-- Insert data into Products table
INSERT INTO Products (productName, price, gender, size, quantity, detail, introduction, careInstruction, categoryId, promotionId) VALUES
('iPhone 14', 999.99, 'Unisex', '6.1"', 50, 'Latest model', 'Introducing the iPhone 14', 'Handle with care', 2, 1),
('MacBook Pro', 1999.99, 'Unisex','16"', 30, '2023 model', 'MacBook Pro with M2 chip', 'Clean with dry cloth', 3, 2),
('T-shirt', 19.99, 'Men', 'L', 100, 'Comfortable cotton', 'New Men\'s T-shirt', 'Machine wash cold', 5, NULL),
('Samsung Galaxy S23', 899.99, 'Unisex', '6.2"', 70, 'Latest Android flagship', 'Introducing Galaxy S23', 'Handle with care', 2, 3),
('Leather Jacket', 150.00, 'Men', 'M', 40, 'Genuine leather', 'Trendy leather jacket', 'Dry clean only', 5, 4),
('Smart TV 55"', 750.00, 'Unisex', '55"', 25, '4K Ultra HD', 'Amazing picture quality', 'Clean with soft cloth', 7, NULL),
('Wireless Earbuds', 150.00, 'Unisex', 'One Size', 80, 'Noise cancelling', 'Wireless earbuds with long battery life', 'Avoid moisture', 9, 5),
('Yoga Pants', 35.99, 'Women', 'M', 120, 'Stretchable fabric', 'Comfortable yoga pants', 'Machine wash cold', 6, NULL),
('Fitbit Versa 3', 229.99, 'Unisex', 'One Size', 50, 'Fitness tracking smartwatch', 'Introducing Fitbit Versa 3', 'Avoid moisture', 8, NULL);

-- Insert data into Users table
INSERT INTO Users (username, email, password, fullname, gender, phoneNumber, dateOfBirth, typeAcc, isAdmin) VALUES
('john_doe', 'john@example.com', 'password123', 'John Doe', 'Male', '1234567890', '1990-01-01', 'local', false),
('jane_doe', 'jane@example.com', 'password123', 'Jane Doe', 'Female', '0987654321', '1992-02-02', 'local', true),
('alice_smith', 'alice@example.com', 'password123', 'Alice Smith', 'Female', '1122334455', '1988-05-15', 'local', false),
('bob_brown', 'bob@example.com', 'password123', 'Bob Brown', 'Male', '2233445566', '1985-08-30', 'google', true),
('chris_jones', 'chris@example.com', 'password123', 'Chris Jones', 'Male', '9988776655', '1993-12-12', 'facebook', false);

-- Insert data into Vouchers table
INSERT INTO Vouchers (expiryDate, voucherCode, description, discountValue) VALUES
('2024-12-31', 'AAFH34', '10% off on next purchase', 100000),
('2025-01-15', 'GH2', '15% off on selected items', 200000),
('2025-03-01', 'HH5', '5% off on orders above $100', 300000);

-- Insert data into Orders table
INSERT INTO Orders (orderStatus, orderDate, orderNotes, totalPayment, orderName, orderAddress, phoneNumber, paymentMethod, shippingMethod, userId, voucherId) VALUES
('Pending', '2024-10-28', 'Please handle with care', 1099.99, 'John Doe', '123 Main St, City', '1234567890', 'Credit Card', 'Express', 1, 1),
('Shipped', '2024-10-27', 'Leave at the door', 1999.99, 'Jane Doe', '456 Elm St, City', '0987654321', 'Paypal', 'Standard', 2, 1),
('Completed', '2024-09-15', 'Signature required', 229.99, 'Alice Smith', '789 Oak St, City', '1122334455', 'Credit Card', 'Express', 3, 2),
('Cancelled', '2024-08-10', 'Refund requested', 150.00, 'Bob Brown', '101 Pine St, City', '2233445566', 'Cash', 'Standard', 4, 3),
('Processing', '2024-10-05', 'Deliver between 9am-5pm', 150.00, 'Chris Jones', '234 Maple St, City', '9988776655', 'Credit Card', 'Express', 5, 3);

-- Insert data into Products_Orders table
INSERT INTO Products_Orders (productId, orderId, quantity, price) VALUES
(1, 1, 1, 999.99),
(2, 2, 1, 1999.99),
(9, 3, 1, 229.99),
(7, 4, 1, 150.00),
(3, 5, 2, 39.98);

-- Insert data into Color table
INSERT INTO Color (colorName, colorRGB) VALUES
('Black', '#000000'),
('Silver', '#C0C0C0'),
('Blue', '#0000FF'),
('Gray', '#808080'),
('Brown', '#A52A2A'),
('White', '#FFFFFF');

-- Insert data into Color_Detail table
INSERT INTO Color_Detail (productId, colorId, imageURL) VALUES
(1, 1, 'http://example.com/images/iphone_black.jpg'),
(2, 2, 'http://example.com/images/macbook_silver.jpg'),
(3, 3, 'http://example.com/images/tshirt_blue.jpg'),
(4, 4, 'http://example.com/images/galaxy_gray.jpg'),
(5, 5, 'http://example.com/images/jacket_brown.jpg'),
(6, 1, 'http://example.com/images/tv_black.jpg');

-- Insert data into User_Address table
INSERT INTO User_Address (fullName, phoneNumber, addressDetail, ward, district, city, userId) VALUES
('John Doe', '1234567890', '123 Main St', 'Ward 1', 'District 1', 'City A', 1),
('Jane Doe', '0987654321', '456 Elm St', 'Ward 2', 'District 2', 'City B', 2),
('Alice Smith', '1122334455', '789 Oak St', 'Ward 3', 'District 3', 'City C', 3),
('Bob Brown', '2233445566', '101 Pine St', 'Ward 4', 'District 4', 'City D', 4),
('Chris Jones', '9988776655', '234 Maple St', 'Ward 5', 'District 5', 'City E', 5);

-- Insert data into Post_Categories table
INSERT INTO Post_Categories (postCategoryName) VALUES
('Tech News'),
('Fashion Trends'),
('Health & Fitness'),
('Home & Living');

-- Insert data into Posts table
INSERT INTO Posts (postTitle, postContent, postCategoryId) VALUES
('New iPhone Release', 'The latest iPhone model is out!', 1),
('Summer Fashion Tips', 'Trendy summer outfits for 2024.', 2),
('Top 10 Yoga Exercises', 'Best yoga exercises for health and fitness.', 3),
('Home Cleaning Tips', 'How to keep your home clean and organized.', 4);

