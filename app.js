var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "emailList1"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected to the database");
    cleanName();
});

function cleanName(){   
    connection.query("SELECT * FROM emailList1", function(err, res){
        if(err) throw err;
        for (var i=0; i<res.length; i++){
            var dirtyName = res[i].firstName.trim();
            var nameArr = dirtyName.split(" ");
            var lastName = nameArr[0].split(",")[0];
            var firstName = nameArr[1];
            console.log(firstName, lastName)
            var dirtyEmail= res[i].email.trim();
            var emailArr = dirtyEmail.split(" ");
            var email = emailArr[emailArr.length-1];
            if (email.indexOf("@")=== -1){
                email = "noEmailFound";
            }
            console.log(email);

            var correctArray= [firstName, lastName, email, i]
            var query = "UPDATE emailList1 SET firstName = ?, lastName = ?, email = ? WHERE id = ?"
            connection.query(query, correctArray, function(err, res){
                if (err) throw err;
                removeNoEmails();
            })
            
        
        }
    });

}

function removeNoEmails(){
    connection.query("DELETE FROM emailList1 WHERE email=?", ["noEmailFound"], function(err, res){ 
        if (err) throw err;
        if(res.affectedRows !== 0){
            console.log(res.affectedRows)
        }
        
});
}