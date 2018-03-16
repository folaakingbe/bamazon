// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// make a connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    start();
});

// Manager's actions
function start() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What do you want to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    })
    .then(function(answer) {
        switch(answer.action) {
        case "View Products for Sale":
            productsForSale();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            addToInventory();
            break;
        case "Add New Product":
            addNewProduct();
            break;
        }
    });
}

// See all of the products for sale
function productsForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Price: $" + res[i].price);
            console.log("Quantity: " + res[i].stock_quantity);
            console.log("-----------------------------");
        }
        start();
    });
}

// Check which items have low stock
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id);
            console.log("Name: " + res[i].product_name);
            console.log("Price: $" + res[i].price);
            console.log("Quantity: " + res[i].stock_quantity);
            console.log("-----------------------------");
        }
        start();
    });
}

// Add more stock to items
function addToInventory() {
    inquirer
    .prompt([
        {
            name: "item",
            type: "input",
            message: "ID of product you want to add more of."
        },
        {
            name: "add",
            type: "input",
            message: "Number of units you want to add."
        }
    ])
    .then(function(answer) {
        connection.query("SELECT * FROM products WHERE item_id = ?", answer.item, function(err, res){
            if (err) throw err;
            var newStock = parseInt(res[0].stock_quantity) + parseInt(answer.add);
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, answer.item], function(err, res) {
                if (err) throw err;
                connection.query("SELECT * FROM products WHERE item_id = ?", answer.item, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    start();
                });
            })
        });
    });
}

// Add a new product
function addNewProduct() {
    inquirer
    .prompt([
        {
            name: "name",
            type: "input",
            message: "Product Name:"
        },
        {
            name: "department",
            type: "input",
            message: "Department:"
        },
        {
            name: "price",
            type: "input",
            message: "Price of Product:"
        },
        {
            name: "stock",
            type: "input",
            message: "Quantity:"
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [answer.name, answer.department, answer.price, answer.stock], function(err, res){
            if (err) throw err;
            connection.query("SELECT * FROM products", function(err, res){
                if (err) throw err;
                var i = res.length - 1;
                console.log("");
                console.log("ID: " + res[i].item_id);
                console.log("Name: " + res[i].product_name);
                console.log("Price: $" + res[i].price);
                console.log("Quantity: " + res[i].stock_quantity);
                console.log("");
                console.log("New product has been added.");
                console.log("-----------------------------");
                start();
            });
        });
    });
}
