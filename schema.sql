CREATE DATABASE emailList1;
USE emailList1;

DROP TABLE IF EXISTS emailList1;
CREATE TABLE emailList1 (
    id INT NOT NULL AUTO_INCREMENT,
    firstName varchar(200),
    lastName varchar(200),
    institution varchar(200),
    email varchar(400),
    PRIMARY KEY (id)
);

SELECT * FROM emailList1;