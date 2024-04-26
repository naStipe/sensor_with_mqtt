const fs = require('fs')
var mysql = require('mysql');
const DBPATH = '../data/temperature_data.json'

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

function readDB(dbPath = DBPATH){
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
}

function writeDB(data, dbPath = DBPATH){
    if (!data) return console.log('No data provided!')
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data))
        return console.log('Data saved successfully')
    } catch(err){
        return console.log('Failed to write')
    }
}

newData = readDB()
for(var i=0; i < newData.length; i++){
    console.log(newData[i].id + " : " + newData[i].temperature)
}

module.exports = {readDB, writeDB}

