//run only one time 
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./blogs.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) console.log(err);
});
 db.run(`CREATE TABLE  posts (
   id INTEGER PRIMARY KEY ,
   postName VARCHAR(100) NOT NULL ,
   postDesc VARCHAR(1000) NOT NULL
   )
 `)