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

router.post("/:id/posts", (req, res) => {
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

function validatePostId(req, res, next) {}

module.exports = router;
