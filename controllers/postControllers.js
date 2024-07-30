const _ = require("lodash");
const db = require("../server");
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
exports.getAllPosts = async (req, res) => {
  try {
    const sql = "SELECT * FROM posts";
    db.database.all(sql, [], (err, posts) => {
      if (err) {
        res.send(err);
      } else if (posts.length == 0) {
        res.render("compose");
      } else {
        res.render("home", { home: homeStartingContent, posts });
      }
    });
    // console.log(posts)
    // close the database connection
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.compose = async (req, res) => {
  res.render("compose");
};

exports.createPost = async (req, res) => {
  try {
    // insert one row into the langs table
    const sql = `INSERT INTO posts(postName,postDesc) 
  VALUES(?,?)`;
    const { postName, postDesc } = req.body;
    db.database.run(sql, [postName, postDesc], (err) => {
      if (err) console.log(err);
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const title = _.lowerCase(req.params.id);
    db.database.all("SELECT * FROM posts", [], (err, posts) => {
      if (err) {
        res.send(err);
      } else if (posts.length == 0) {
        res.render("post", {
          home: homeStartingContent,
          posts: {
            postName: "test",
            postDesc: "test desc",
          },
        });
      } else {
        posts.forEach((post) => {
          const postTitle = _.lowerCase(post.postName);
          if (postTitle === title) {
            res.render("post", { post });
          }
        });
      }
    });
  } catch (err) {
    res.send(err);
  }
};

exports.getUpdatePage = async (req, res) => {
  const id = req.params.id;
  db.database.get("SELECT * FROM posts WHERE id=?", [id], (err, post) => {
    if (err) res.send(err);
    res.render("update", { post });
  });
};

exports.updatePost = async (req, res) => {
  try {
    const data = [req.body.postName, req.body.postDesc, req.params.id];
    const sql = `UPDATE posts SET postName=?, postDesc=? WHERE id=?`;
    db.database.run(sql, data, (err) => {
      if (err) res.send(err);
      res.redirect("/");
    });
  } catch (err) {
    res.send(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const sql = `DELETE FROM posts WHERE id=?`;
    db.database.run(sql, req.params.id, (err) => {
      if (err) res.send(err);
      res.redirect("/");
    });
  } catch (err) {
    res.send(err);
  }
};
