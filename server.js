const app=require('./app')
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./blogs.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) console.log(err);
});
exports.database=db
const PORT = process.env.PORT || 3000;

// connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });

// });
