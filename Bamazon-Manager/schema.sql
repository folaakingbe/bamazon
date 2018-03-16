DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("table", "furniture", 50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chair", "furniture", 30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bed", "furniture", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("television", "electronis", 1000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("radio", "electronics", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone", "electronics", 80, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coat", "clothing", 30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("light bulb", "household", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mirror", "furniture", 30, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tires", "automotive", 100, 20);