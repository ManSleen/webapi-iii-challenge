const router = require("express").Router();

const Posts = require("../posts/postDb");

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get all posts" });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  const postInfo = req.body;
  postInfo.user_id = req.params.id;
  console.log(postInfo);
  Posts.insert(postInfo)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding a post for that user" });
    });
});

router.get("/:id", (req, res) => {
  Posts.getById();
});

router.delete("/:id", (req, res) => {
  Posts.remove();
});

router.put("/:id", (req, res) => {
  Posts.update();
});

// custom middleware

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res
      .status(400)
      .json({ message: "Missing post data, could not add post to db" });
  } else if (!req.body.hasOwnProperty("text")) {
    res
      .status(400)
      .json({
        message: "Missing required text field, could not add post to db"
      });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {}

module.exports = router;
