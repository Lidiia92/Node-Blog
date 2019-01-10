const express = require('express');
const router = express.Router();


// database
const postDb = require("../../data/helpers/postDb");

//endpoints

/****  /api/posts  ****/

router.get("/", async (req, res) => {
    try {
      const posts = await postDb.get();
      res.json(posts);
    } catch (err) {
      res
        .status(500)
        .json({ message: "The posts cannot be retrieved from the database." });
    }
  });

/****  /api/posts/:id ***/  

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await postDb.get(id);
      if (!post.tags) {
        res.status(404).json({ message: "The post was not found" });
      } else {
        res.json(post);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was an error trying to find the post." });
    }
  });
  
/****  /api/posts/addpost/:userId  ****/

router.post("/addpost/:userId", async (req, res) => {
    const { userId } = req.params;
    const post = req.body;
  
    try {
      const user = await postDb.get(userId);
      if (!user) {
        res.status(404).json({ message: "User was not found." });
      } else {
        const newPost = await postDb.insert(post);
        res.json(newPost);
      }
    } catch (err) {
      res.status(500).json({ message: "Could not add a new post." });
    }
  });

/****  /api/posts/:id ***/
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await postDb.get(id);
      if (!post) {
        res.status(404).json({ message: "The post does not exist." });
      } else {
        await postDb.remove(id);
        res.json(post);
      }
    } catch (err) {
      res.status(500).json({ message: "Could not delete post." });
    }
  });

/****  /api/posts/:postId ***/
  
router.put("/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = req.body;
  
    try {
      const updatedPost = await postDb.update(postId, post);
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: "Cannot update a post that doesn't exist." });
      } else {
        res.json(updatedPost);
      }
    } catch (err) {
      res.status(500).json({ message: "Could not update post." });
    }
  });

  module.exports = router;