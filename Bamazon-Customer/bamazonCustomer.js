var mysql = require("mysql");
var inquirer = require("inquirer");

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

function start() {
    inquirer
    .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?"
        }
    ])
    .then(function(answer){
        connection.query("SELECT * FROM products WHERE item_id = ?", answer.id, function(err, res) {
            if (err) throw err;
            // console.log(res[0].stock_quantity);
            if (res == "") {
                console.log("Input Error");
            }
            else if (res[0].stock_quantity < answer.quantity) {
                console.log("Insufficient Quantity");
            }
            else {
                // var totalStock = parseInt(res.stock_quantity);
                // var numBought = parseInt(answer.quantity);
                var newStock = res[0].stock_quantity - answer.quantity;
                console.log(res);
                // console.log(newStock);
                
                // console.log(typeof answer.quantity);
                // console.log(answer.id);
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, answer.id], function(err, res) {
                    if (err) throw err;
                    connection.query("SELECT * FROM products WHERE item_id = ?", answer.id, function(err, res) {
                        if (err) throw err;
                        console.log(res);
                        var cost = res[0].price * answer.quantity;
                        console.log("Total cost is $" + cost);
                    })
                })
            }
        })
    })
}