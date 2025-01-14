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

CREATE TABLE refreshtokens(
	token VARCHAR(255) PRIMARY KEY NOT NULL,
    userId INT
);

CREATE TABLE Products (
    productId INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    gender VARCHAR(10),
    size VARCHAR(50),
    stockQuantity INT,
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
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255),
    gender VARCHAR(30),
    phoneNumber VARCHAR(15),
    dateOfBirth DATE,
    typeAcc VARCHAR(50),
    role VARCHAR(25) DEFAULT 'user',
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
    FOREIGN KEY (colorId) REFERENCES Color(colorId) ON DELETE CASCADE
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
('Men', NULL),
('Women', NULL),
('Accessories', NULL);

-- Insert data into Promotions table
INSERT INTO Promotions (discountPercentage, promotionPeriod) VALUES
(10, 30),
(15, 15),
(5, 60),
(20, 20),
(25, 25);

-- Insert data into Products table
INSERT INTO Products (productName, price, gender, size, stockQuantity, detail, introduction, careInstruction, categoryId, promotionId) VALUES
('Đầm ôm Tuysi Hiver', 1045000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Đầm ôm dáng A nhẹ nhàng giúp tôn lên đường cong tự nhiên của cơ thể, đồng thời che đi khuyết điểm một cách khéo léo.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo sơ mi lụa Ember', 973000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Với áo Ember, nàng sẽ cảm nhận được sự nhẹ nhàng và tinh tế trong từng chi tiết, khẳng định gu thời trang nữ tính và hiện đại!',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo vest Tuysi You Beige', 995000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Đầm ôm dáng A nhẹ nhàng giúp tôn lên đường cong tự nhiên của cơ thể, đồng thời che đi khuyết điểm một cách khéo léo.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Đầm nhung Velvet Black', 1183000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Đắm mình trong gam màu huyền bí và cảm nhận sự mềm mại của chất liệu nhung.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo khoác len Ôm cơ bản', 903000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Thiết kế tối giản nhưng không kém phần tinh tế, dành cho những cô nàng yêu thích phong cách thanh lịch và hiện đại.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo khoác len lông cừu merino', 1895000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác len là item không thể thiếu vào những ngày đông. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo khoác len lông cừu', 1545000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác len cổ V dài tay. Cài bằng hàng khuy kim loại phía trước vừa tạo điểm nhấn, vừa mang lại vẻ thanh lịch.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo peplum phối ren', 745000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo dáng peplum với phần tay ngắn và thân dài. Cổ vuông phối dây đan tạo kiểu. Chất liệu vải ren mềm, sang trọng, thân thiện với làn da.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo sơ mi Tuysi Peplum', 833000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo dáng peplum với phần tay ngắn và thân dài. Cổ vuông phối dây đan tạo kiểu. Chất liệu vải ren mềm, sang trọng, thân thiện với làn da.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
 ('Cosmos Set - Áo công sở peplum', 1113000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo dáng peplum với phần tay ngắn và thân dài. Cổ vuông phối dây đan tạo kiểu. Chất liệu vải ren mềm, sang trọng, thân thiện với làn da.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
  ('Áo thun Daily Metagent', 279300, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo thun cổ tròn, Thiết kế tay ngắn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Point Supima - Áo thun Regular', 489300, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo thun cổ tròn, Thiết kế tay ngắn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Endless Summer - Áo thun Regular Supima', 833000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo thun cổ tròn, Thiết kế tay ngắn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo thun polo dài tay', 300000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo Polo dài tay dáng regular fit, cổ đức cùng hàng 3 khuy cài. Dáng áo suông, cổ tay may bo co giãn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo Polo Modal cổ đức phối kẻ', 623000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo thun Polo cổ đức',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Knit Polo - Áo len cổ đức', 279300, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo Polo dài tay dáng regular fit, cổ đức cùng hàng 3 khuy cài. Dáng áo suông, cổ tay may bo co giãn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác len', 716.000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo len dài tay',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác phao siêu nhẹ', 777000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu vải Polyester, bên trong lót bông tác dụng giữ ấm tốt vào những ngày đại hàn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác chần bông', 777000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu vải Polyester, bên trong lót bông tác dụng giữ ấm tốt vào những ngày đại hàn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo hoodie nỉ cổ mũ kéo khóa', 400000, 'Men', 'S, M, L, XL', 50, 'Latest model', ' Chất liệu: Sử dụng vải Interlock thành phần gồm 65%Cotton 30% Polyester 5%Spandex. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1);


-- Insert data into Users table
INSERT INTO Users (username, email, password, fullname, gender, phoneNumber, dateOfBirth, typeAcc, role) VALUES
('john_doe', 'john@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'John Doe', 'Male', '1234567890', '1990-01-01', 'local', 'user'),
('jane_doe', 'jane@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Jane Doe', 'Female', '0987654321', '1992-02-02', 'local', 'user'),
('alice_smith', 'alice@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Alice Smith', 'Female', '1122334455', '1988-05-15', 'local', 'user'),
('user', 'user@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Jane Doe', 'Female', '0987654321', '1992-02-02', 'local', 'user'),
('admin', 'admin@example.com', '$2y$10$jOgSFLgF9.c0YDbasqnJpOAuM2Les78yvvaUjKmNuRcFYB2j8rPV.', 'Alice Smith', 'Female', '1122334455', '1988-05-15', 'local', 'user'),
('bob_brown', 'bob@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Bob Brown', 'Male', '2233445566', '1985-08-30', 'google', 'user'),
('chris_jones', 'chris@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Chris Jones', 'Male', '9988776655', '1993-12-12', 'facebook', 'user');

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
('Đen', '#000000'),
('Be', '#CAA782'),
('Xanh dương', '#0000FF'),
('Ghi', '#808080'),
('Nâu', '#A52A2A'),
('Trắng', '#FFFFFF'),
('Đỏ mận', '#682632'),
('Xanh lá', '#265A40');

-- Insert data into Color_Detail table
INSERT INTO Color_Detail (productId, colorId, imageURL) VALUES
(1, 1, 'http://localhost:8000/img/women1.1.webp'),
(1, 4, 'http://localhost:8000/img/women1.2.webp'),
(2, 6, 'http://localhost:8000/img/women2.1.webp'),
(2, 1, 'http://localhost:8000/img/women2.2.webp'),
(3, 2, 'http://localhost:8000/img/women3.1.webp'),
(4, 1, 'http://localhost:8000/img/women4.1.webp'),
(4, 7, 'http://localhost:8000/img/women4.2.webp'),
(5, 1, 'http://localhost:8000/img/women5.1.webp'),
(5, 7, 'http://localhost:8000/img/women5.2.webp'),
(6, 5, 'http://localhost:8000/img/women6.1.jpg'),
(6, 2, 'http://localhost:8000/img/women6.2.jpg'),
(7, 4, 'http://localhost:8000/img/women7.1.jpg'),
(7, 6, 'http://localhost:8000/img/women7.2.jpg'),
(8, 2, 'http://localhost:8000/img/women8.1.webp'),
(8, 6, 'http://localhost:8000/img/women8.2.webp'),
(9, 6, 'http://localhost:8000/img/women9.1.webp'),
(9, 1, 'http://localhost:8000/img/women9.2.webp'),
(10, 1, 'http://localhost:8000/img/women10.1.webp'),
(11, 1, 'http://localhost:8000/img/men1.1.webp'),
(12, 1, 'http://localhost:8000/img/men2.1.jpg'),
(13, 6, 'http://localhost:8000/img/men3.1.jpg'),
(14, 1, 'http://localhost:8000/img/men4.1.jpg'),
(14, 8, 'http://localhost:8000/img/men4.2.jpg'),
(15, 5, 'http://localhost:8000/img/men5.1.jpg'),
(15, 6, 'http://localhost:8000/img/men5.2.jpg'),
(16, 4, 'http://localhost:8000/img/men6.1.jpg'),
(16, 1, 'http://localhost:8000/img/men6.2.jpg'),
(17, 4, 'http://localhost:8000/img/men7.1.jpg'),
(17, 8, 'http://localhost:8000/img/men7.2.jpg'),
(18, 8, 'http://localhost:8000/img/men8.1.jpg'),
(18, 1, 'http://localhost:8000/img/men8.2.jpg'),
(19, 4, 'http://localhost:8000/img/men9.1.jpg'),
(19, 1, 'http://localhost:8000/img/men9.2.jpg'),
(20, 4, 'http://localhost:8000/img/men10.1.jpg'),
(20, 1, 'http://localhost:8000/img/men10.2.jpg');

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

