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
   ('Áo khoác len', 716000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo len dài tay',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác phao siêu nhẹ', 777000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu vải Polyester, bên trong lót bông tác dụng giữ ấm tốt vào những ngày đại hàn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác chần bông', 777000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu vải Polyester, bên trong lót bông tác dụng giữ ấm tốt vào những ngày đại hàn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo hoodie nỉ cổ mũ kéo khóa', 400000, 'Men', 'S, M, L, XL', 50, 'Latest model', ' Chất liệu: Sử dụng vải Interlock thành phần gồm 65%Cotton 30% Polyester 5%Spandex. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
 ('Áo phao chần bông viền vặn thừng', 747000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác dáng suông, cổ tròn, 2 túi vuông phía trước, điểm nhấn là chi tiết vặn thừng ở viền cổ và dọc khóa kéo. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('padded quilted jacket - áo phao 2 mặt (Phom rộng)', 747000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác dáng suông, cổ tròn, 2 túi vuông phía trước, điểm nhấn là chi tiết vặn thừng ở viền cổ và dọc khóa kéo.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Buttoned Quilted Vest - Áo gile chần bông', 537000, 'Women', 'S, M, L, XL', 50, 'Latest model', ' Phom áo rộng, bạn có thể chọn lùi 1 size để mặc vừa vặn hơn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo phao cổ mũ tháo rời', 657000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác dáng slim fit, dộ dài ngang hông, cổ cao, 2 túi phía trước có khóa kéo, mũ đội đầu có thể tháo rời.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo phao chần bông viền vặn thừng', 747000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Thiết kế tối giản nhưng không kém phần tinh tế, dành cho những cô nàng yêu thích phong cách thanh lịch và hiện đại.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Áo Phao Kèm Đai phom rộng', 837000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác len là item không thể thiếu vào những ngày đông. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Wool Trench Coat - Áo măng tô dạ lông cừu khâu tay', 8050000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác thiết kế cổ chữ K bản to, dáng dài cùng màu sắc sang trọng, kiểu dáng vô cùng đẳng cấp. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Oversize Trench Coat', 2443000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo dáng peplum với phần tay ngắn và thân dài. Cổ vuông phối dây đan tạo kiểu. Chất liệu vải ren mềm, sang trọng, thân thiện với làn da.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
('Camel coat - dạ lông cừu (handmade)', 833000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác dạ cổ 2 ve dài khoét chữ K - chần chỉ nổi viền.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
 ('Áo khoác dạ lông cừu cao cấp', 6293000, 'Women', 'S, M, L, XL', 50, 'Latest model', 'Áo dáng peplum với phần tay ngắn và thân dài. Cổ vuông phối dây đan tạo kiểu. Chất liệu vải ren mềm, sang trọng, thân thiện với làn da.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 2, 1),
  ('Áo thun có mũ', 400000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo thun cổ tròn, Thiết kế tay ngắn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo thun dài tay phối túi', 400000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu sử dụng là vải dệt kim: 65% Cotton và 35% Polyester.',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo hoodie Metagent', 400000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo hoodie dáng regular fit, độ dài ngang hông, tay áo và gấu may bo',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác gió dáng suông', 567000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu: Polyester tổng hợp dày dặn, tính năng chống gió, chống bụi, giữ ấm cơ thể. Bên trong may chần bông mỏng',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo khoác gió cổ mũ', 716000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu: 94% Polyester 6% Spandex tính năng siêu nhẹ, chống gió, chống bụi, giữ ấm cơ thể. Bên trong áo và quần may lớp lót lưới',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Áo Khoác', 1116000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Áo khoác dài tay dáng regular fit. Dáng áo suông, cổ tay may bo co giãn',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Forge Pants - Quần dài Tuysi ống đứng', 903000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Quần dài nam',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Quần Tây Tuysi REGULAR FIT', 903000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Quần Tuysi hiện đại',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Quần Tuysi Slim Fit Ghi Khói', 973000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Quần Tuysi hiện đại',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1),
   ('Quần Regular Tuysi Basic', 903000, 'Men', 'S, M, L, XL', 50, 'Latest model', 'Chất liệu: Sử dụng vải Interlock thành phần gồm 65%Cotton 30% Polyester 5%Spandex. ',
 'Các sản phẩm thuộc dòng cao cấp (Senora) và áo khoác (dạ, tweed, lông, phao) chỉ giặt khô, tuyệt đối không giặt ướt.', 1, 1);

-- Insert data into Users table
INSERT INTO Users (username, email, password, fullname, gender, phoneNumber, dateOfBirth, typeAcc, role) VALUES
('john_doe', 'john@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'John Doe', 'Male', '1234567890', '1990-01-01', 'local', 'user'),
('jane_doe', 'jane@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Jane Doe', 'Female', '0987654321', '1992-02-02', 'local', 'user'),
('alice_smith', 'alice@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Alice Smith', 'Female', '1122334455', '1988-05-15', 'local', 'user'),
('bob_brown', 'bob@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Bob Brown', 'Male', '2233445566', '1985-08-30', 'google', 'user'),
('chris_jones', 'chris@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Chris Jones', 'Male', '9988776655', '1993-12-12', 'facebook', 'user'),
('susan_clark', 'susan@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Susan Clark', 'Female', '3344556677', '1991-03-15', 'local', 'user'),
('michael_king', 'michael@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Michael King', 'Male', '5566778899', '1987-09-22', 'google', 'user'),
('emma_watson', 'emma@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Emma Watson', 'Female', '6677889900', '1995-11-11', 'facebook', 'user'),
('oliver_taylor', 'oliver@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Oliver Taylor', 'Male', '7788990011', '1989-07-07', 'local', 'user'),
('sophia_hill', 'sophia@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Sophia Hill', 'Female', '8899001122', '1996-05-25', 'google', 'user'),
('liam_martin', 'liam@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Liam Martin', 'Male', '9900112233', '1992-04-18', 'facebook', 'user'),
('isabella_thomas', 'isabella@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Isabella Thomas', 'Female', '1122334455', '1988-10-10', 'local', 'user'),
('james_white', 'james@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'James White', 'Male', '2233445566', '1984-06-12', 'google', 'user'),
('mia_harris', 'mia@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Mia Harris', 'Female', '3344556677', '1991-12-03', 'facebook', 'user'),
('benjamin_wilson', 'benjamin@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Benjamin Wilson', 'Male', '5566778899', '1990-08-15', 'local', 'user'),
('ava_lee', 'ava@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Ava Lee', 'Female', '6677889900', '1987-02-22', 'google', 'user'),
('lucas_scott', 'lucas@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Lucas Scott', 'Male', '7788990011', '1994-03-30', 'facebook', 'user'),
('ella_adams', 'ella@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Ella Adams', 'Female', '8899001122', '1993-09-09', 'local', 'user'),
('jackson_clark', 'jackson@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Jackson Clark', 'Male', '9900112233', '1986-07-27', 'google', 'user'),
('user', 'user@example.com', '$2y$10$HLnqywpZj.W6ahbjHOGqH.QPOykIwR2Enjci2XWLyCPTTP6aP2kw2', 'Jane Doe', 'Female', '0987654321', '1992-02-02', 'local', 'user'),
('admin', 'admin@example.com', '$2y$10$jOgSFLgF9.c0YDbasqnJpOAuM2Les78yvvaUjKmNuRcFYB2j8rPV.', 'Alice Smith', 'Female', '1122334455', '1988-05-15', 'local', 'user');

-- Insert data into Vouchers table
INSERT INTO Vouchers (expiryDate, voucherCode, description, discountValue) VALUES
('2024-12-31', 'AAFH34', '10% off on next purchase', 100000),
('2025-01-15', 'GH2', '15% off on selected items', 200000),
('2025-03-01', 'HH5', '5% off on orders above $100', 300000);

-- Insert data into Orders table
INSERT INTO Orders (orderStatus, orderDate, orderNotes, totalPayment, orderName, orderAddress, phoneNumber, paymentMethod, shippingMethod, userId, voucherId) VALUES
('Pending', '2024-10-28', 'Please handle with care', 4799.96, 'John Doe', '123 Main St, City', '1234567890', 'Credit Card', 'Express', 1, NULL),
('Shipped', '2024-10-27', 'Leave at the door', 5199.97, 'Jane Doe', '456 Elm St, City', '0987654321', 'Paypal', 'Standard', 2, NULL),
('Completed', '2024-09-15', 'Signature required', 3299.98, 'Alice Smith', '789 Oak St, City', '1122334455', 'Credit Card', 'Express', 3, NULL),
('Cancelled', '2024-08-10', 'Refund requested', 1750.00, 'Bob Brown', '101 Pine St, City', '2233445566', 'Cash', 'Standard', 4, NULL),
('Processing', '2024-10-05', 'Deliver between 9am-5pm', 4999.99, 'Chris Jones', '234 Maple St, City', '9988776655', 'Credit Card', 'Express', 5, NULL),
('Shipped', '2024-10-22', 'Fragile items', 2699.98, 'David Lee', '111 Birch St, City', '3344556677', 'Paypal', 'Standard', 6, NULL),
('Completed', '2024-10-20', 'No notes', 3299.97, 'Eva Green', '222 Pine St, City', '5566778899', 'Credit Card', 'Express', 7, NULL),
('Pending', '2024-10-19', 'Deliver by noon', 1299.98, 'Fay White', '333 Cedar St, City', '7788990011', 'Cash', 'Standard', 8, NULL),
('Shipped', '2024-10-17', 'Urgent delivery', 5599.96, 'Gina Black', '444 Oak St, City', '9900112233', 'Credit Card', 'Express', 9, NULL),
('Completed', '2024-10-10', 'Gift packaging requested', 3999.98, 'Hannah Grey', '555 Elm St, City', '1020304050', 'Paypal', 'Standard', 10, NULL),
('Shipped', '2024-10-09', 'Handle with care', 2699.99, 'Ivy Blue', '666 Maple St, City', '2135468790', 'Credit Card', 'Express', 1, NULL),
('Pending', '2024-10-08', 'Returnable items', 1599.97, 'James Yellow', '777 Birch St, City', '9988771234', 'Cash', 'Standard', 2, NULL),
('Cancelled', '2024-10-06', 'Delivery not received', 1499.99, 'Kathy Brown', '888 Pine St, City', '3344556677', 'Paypal', 'Express', 3, NULL),
('Processing', '2024-10-04', 'Ship as soon as possible', 5099.97, 'Liam White', '999 Oak St, City', '1122334455', 'Credit Card', 'Standard', 4, NULL),
('Shipped', '2024-10-02', 'Fast delivery', 1499.99, 'Mia Green', '101 Maple St, City', '2233445566', 'Paypal', 'Express', 5, NULL),
('Completed', '2024-09-30', 'Signature upon receipt', 3299.96, 'Nina Blue', '202 Birch St, City', '3344556677', 'Credit Card', 'Standard', 6, NULL),
('Cancelled', '2024-09-28', 'Incorrect items received', 2599.97, 'Oscar Black', '303 Pine St, City', '5566778899', 'Cash', 'Express', 7, NULL),
('Pending', '2024-09-25', 'Please include gift wrap', 1099.98, 'Paul Red', '404 Elm St, City', '7788990011', 'Credit Card', 'Standard', 8, NULL),
('Shipped', '2024-09-20', 'Gift card included', 2599.96, 'Quincy Yellow', '505 Cedar St, City', '9900112233', 'Paypal', 'Express', 9, NULL);

INSERT INTO Orders (orderStatus, orderDate, orderNotes, totalPayment, orderName, orderAddress, phoneNumber, paymentMethod, shippingMethod, userId, voucherId) VALUES
('Pending', '2024-10-28', 'Please deliver in the morning', 2999.98, 'John Doe', '123 Main St, City', '1234567890', 'Credit Card', 'Express', 10, NULL),
('Completed', '2024-10-26', 'Fragile items, handle with care', 4499.97, 'John Doe', '123 Main St, City', '1234567890', 'Paypal', 'Standard', 10, NULL),
('Shipped', '2024-10-22', 'Gift wrapping requested', 2499.96, 'Jane Doe', '456 Elm St, City', '0987654321', 'Credit Card', 'Express', 11, NULL),
('Cancelled', '2024-10-21', 'Items damaged during shipment', 1799.95, 'Jane Doe', '456 Elm St, City', '0987654321', 'Paypal', 'Standard', 11, NULL),
('Pending', '2024-10-18', 'Please leave at the door', 2099.98, 'Tom Brown', '789 Oak St, City', '1122334455', 'Cash', 'Standard', 12, NULL),
('Completed', '2024-10-17', 'No packaging needed', 1599.99, 'Tom Brown', '789 Oak St, City', '1122334455', 'Credit Card', 'Express', 12, NULL),
('Processing', '2024-10-15', 'Please deliver before 12 PM', 3899.97, 'Alice Green', '101 Pine St, City', '2233445566', 'Paypal', 'Standard', 13, NULL),
('Shipped', '2024-10-14', 'Deliver between 2-4 PM', 3199.95, 'Alice Green', '101 Pine St, City', '2233445566', 'Credit Card', 'Express', 13, NULL),
('Pending', '2024-10-12', 'Leave at front porch', 2499.98, 'George Smith', '202 Maple St, City', '3344556677', 'Cash', 'Standard', 14, NULL),
('Cancelled', '2024-10-10', 'Order was incorrect', 1299.99, 'George Smith', '202 Maple St, City', '3344556677', 'Credit Card', 'Express', 14, NULL),
('Completed', '2024-10-08', 'Signature required', 2899.96, 'Sarah White', '303 Cedar St, City', '4455667788', 'Paypal', 'Standard', 15, NULL),
('Shipped', '2024-10-06', 'Urgent delivery', 3299.99, 'Sarah White', '303 Cedar St, City', '4455667788', 'Credit Card', 'Express', 15, NULL),
('Pending', '2024-10-05', 'Handle with care', 1799.98, 'Diana Black', '404 Birch St, City', '5566778899', 'Cash', 'Standard', 16, NULL),
('Completed', '2024-10-03', 'Include gift card', 1599.99, 'Diana Black', '404 Birch St, City', '5566778899', 'Credit Card', 'Express', 16, NULL),
('Shipped', '2024-10-01', 'Special delivery instructions', 2199.95, 'Paul Blue', '505 Elm St, City', '6677889900', 'Paypal', 'Standard', 17, NULL),
('Cancelled', '2024-09-30', 'Order was canceled by customer', 1099.98, 'Paul Blue', '505 Elm St, City', '6677889900', 'Credit Card', 'Express', 17, NULL),
('Completed', '2024-09-28', 'Please include gift wrapping', 3799.97, 'Emma Grey', '606 Oak St, City', '7788990011', 'Credit Card', 'Express', 18, NULL),
('Pending', '2024-09-26', 'Leave at door', 2499.96, 'Emma Grey', '606 Oak St, City', '7788990011', 'Paypal', 'Standard', 18, NULL),
('Shipped', '2024-09-24', 'Fast delivery requested', 1999.98, 'Jack Brown', '707 Maple St, City', '8899001122', 'Credit Card', 'Express', 10, NULL),
('Pending', '2024-09-23', 'Deliver after 5 PM', 3299.96, 'Jack Brown', '707 Maple St, City', '8899001122', 'Paypal', 'Standard', 10, NULL);

INSERT INTO Orders (orderStatus, orderDate, orderNotes, totalPayment, orderName, orderAddress, phoneNumber, paymentMethod, shippingMethod, userId, voucherId) VALUES
('Pending', '2024-10-29', 'Deliver between 10 AM and 2 PM', 2399.99, 'Alice Cooper', '123 Maple St, City', '2233445566', 'Paypal', 'Standard', 1, NULL),
('Completed', '2024-10-28', 'Leave at the gate', 1899.98, 'Brian Lee', '456 Oak St, City', '3344556677', 'Credit Card', 'Express', 2, NULL),
('Shipped', '2024-10-27', 'Handle with care', 1299.99, 'Charlie Davis', '789 Birch St, City', '4455667788', 'Paypal', 'Standard', 3, NULL),
('Pending', '2024-10-26', 'Please call before delivery', 2199.97, 'David White', '101 Pine St, City', '5566778899', 'Credit Card', 'Express', 4, NULL),
('Completed', '2024-10-25', 'Gift wrapping requested', 1599.99, 'Emily Green', '202 Cedar St, City', '6677889900', 'Paypal', 'Standard', 5, NULL),
('Cancelled', '2024-10-24', 'Refund processed', 2499.98, 'Frank Black', '303 Maple St, City', '7788990011', 'Credit Card', 'Express', 6, NULL),
('Pending', '2024-10-23', 'Leave package at the door', 1799.99, 'Grace Yellow', '404 Elm St, City', '8899001122', 'Paypal', 'Standard', 7, NULL),
('Completed', '2024-10-22', 'Deliver to back door', 2899.97, 'Henry Red', '505 Oak St, City', '9900112233', 'Credit Card', 'Express', 8, NULL),
('Shipped', '2024-10-21', 'Handle with care, fragile items', 1399.98, 'Ivy Blue', '606 Birch St, City', '1122334455', 'Paypal', 'Standard', 9, NULL),
('Pending', '2024-10-20', 'Please call before arrival', 1499.99, 'Jack Black', '707 Cedar St, City', '2233445566', 'Credit Card', 'Express', 10, NULL),
('Completed', '2024-10-19', 'Leave at front door', 2399.98, 'Kevin White', '808 Elm St, City', '3344556677', 'Paypal', 'Standard', 11, NULL),
('Shipped', '2024-10-18', 'No packaging required', 1099.99, 'Lara Gold', '909 Oak St, City', '4455667788', 'Credit Card', 'Express', 12, NULL),
('Cancelled', '2024-10-17', 'Order incorrect', 1599.99, 'Mason Blue', '101 Maple St, City', '5566778899', 'Paypal', 'Standard', 13, NULL),
('Pending', '2024-10-16', 'Leave at back entrance', 1799.98, 'Nina Silver', '202 Cedar St, City', '6677889900', 'Credit Card', 'Express', 14, NULL),
('Completed', '2024-10-15', 'Please include invoice', 2399.99, 'Oscar Green', '303 Oak St, City', '7788990011', 'Paypal', 'Standard', 15, NULL),
('Shipped', '2024-10-14', 'Leave in the garage', 1799.97, 'Paul Brown', '404 Birch St, City', '8899001122', 'Credit Card', 'Express', 16, NULL),
('Cancelled', '2024-10-13', 'Refund due to damaged product', 1099.95, 'Quincy Yellow', '505 Cedar St, City', '9900112233', 'Paypal', 'Standard', 17, NULL),
('Pending', '2024-10-12', 'Please send before noon', 2299.97, 'Riley White', '606 Oak St, City', '1122334455', 'Credit Card', 'Express', 18, NULL),
('Completed', '2024-10-11', 'Request for delivery tracking', 1799.98, 'Sophia Black', '707 Birch St, City', '2233445566', 'Paypal', 'Standard', 19, NULL);



-- Insert data into Products_Orders table
INSERT IGNORE INTO Products_Orders (productId, orderId, quantity, price)
SELECT 
    p.productId,                              -- productId from Products table
    FLOOR(RAND() * 50) + 1 AS orderId,        -- Random orderId between 1 and 50
    quantity,                                 -- Random quantity per record
    quantity * p.price                        -- Price multiplied by the quantity
FROM Products p
JOIN (
    SELECT FLOOR(RAND() * 3) + 1 AS quantity -- Random quantity between 1 and 3
    FROM (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3) AS tmp
    LIMIT 80
) AS random_quantity
ORDER BY RAND();

INSERT IGNORE INTO Products_Orders (productId, orderId, quantity, price)
SELECT 
    p.productId,                              -- productId from Products table
    FLOOR(RAND() * 50) + 1 AS orderId,        -- Random orderId between 1 and 50
    quantity,                                 -- Random quantity per record
    quantity * p.price                        -- Price multiplied by the quantity
FROM Products p
JOIN (
    SELECT FLOOR(RAND() * 3) + 1 AS quantity -- Random quantity between 1 and 3
    FROM (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3) AS tmp
    LIMIT 80
) AS random_quantity
ORDER BY RAND();

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
(20, 1, 'http://localhost:8000/img/men10.2.jpg'),
(21, 6, 'http://localhost:8000/img/women11.1.jpg'),
(21, 1, 'http://localhost:8000/img/women11.2.jpg'),
(22, 1, 'http://localhost:8000/img/women12.1.jpg'),
(23, 4, 'http://localhost:8000/img/women13.1.jpg'),
(23, 5, 'http://localhost:8000/img/women13.2.jpg'),
(24, 1, 'http://localhost:8000/img/women14.1.jpg'),
(25, 3, 'http://localhost:8000/img/women15.1.jpg'),
(25, 1, 'http://localhost:8000/img/women15.2.jpg'),
(26, 5, 'http://localhost:8000/img/women16.1.jpg'),
(26, 1, 'http://localhost:8000/img/women16.2.jpg'),
(27, 3, 'http://localhost:8000/img/women17.1.webp'),
(27, 5, 'http://localhost:8000/img/women17.2.webp'),
(28, 2, 'http://localhost:8000/img/women18.1.jpg'),
(28, 1, 'http://localhost:8000/img/women18.2.webp'),
(29, 2, 'http://localhost:8000/img/women19.1.webp'),
(30, 1, 'http://localhost:8000/img/women20.1.jpg'),
(31, 1, 'http://localhost:8000/img/men11.1.jpg'),
(32, 6, 'http://localhost:8000/img/men12.1.jpg'),
(32, 2, 'http://localhost:8000/img/men12.2.jpg'),
(33, 6, 'http://localhost:8000/img/men13.1.jpg'),
(34, 5, 'http://localhost:8000/img/men14.1.jpg'),
(34, 1, 'http://localhost:8000/img/men14.2.jpg'),
(35, 4, 'http://localhost:8000/img/men15.1.jpg'),
(35, 1, 'http://localhost:8000/img/men15.2.jpg'),
(36, 2, 'http://localhost:8000/img/men16.1.jpg'),
(36, 1, 'http://localhost:8000/img/men16.2.jpg'),
(37, 5, 'http://localhost:8000/img/men17.1.jpg'),
(38, 1, 'http://localhost:8000/img/men18.1.jpg'),
(39, 4, 'http://localhost:8000/img/men19.1.jpg'),
(40, 4, 'http://localhost:8000/img/men20.1.jpg');

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

