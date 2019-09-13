const express = require("express"); //imported the package
const router = express.Router();
const Template = require("../models/template");

//GETTING ALL THE POSTS
router.get("/", async (req, res) => {
  try {
    console.log("fetching all");
    const templates = await Template.find(); // bu sayede herseyi geri göndercek
    res.json(templates);
  } catch (err) {
    res.json({ message: event });
  }
});

//addıng new one
router.post("/", async (req, res) => {
  const template = new Template({
    templateName: req.body.templateName,
    subject: req.body.subject,
    content: req.body.content
  });
  try {
    console.log("creating");
    const savedTemplate = await template.save();
    res.json(savedTemplate);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETING
router.delete("/:tempId", async (req, res) => {
  try {
    console.log("deleting");
    const removedTemplate = await Template.deleteOne({
      _id: req.params.tempId
    }); // remove function is deprecated so i used deleteOne
    res.json(removedTemplate);
  } catch (err) {
    res.json({ message: err });
  }
});

//PATCHIN
router.patch("/:tempId", async (req, res) => {
  try {
    const updatedTemplate = await Template.updateOne(
      { _id: req.params.tempId },
      {
        $set: {
          templateName: req.body.templateName,
          subject: req.body.subject,
          content: req.body.content,
          fav: req.body.fav,
          default: req.off.default
        }
      }
    ); // remove function is deprecated so i used deleteOne

    const newOne = await Template.findById(req.params.tempId);
    console.log("updating");
    res.json(newOne);
  } catch (err) {
    res.json({ message: err });
  }
});

//fetch one
router.get("/:tempId", async (req, res) => {
  try {
    console.log("fetching one");
    const template = await Template.findById(req.params.tempId);
    res.json(template);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
/*
//GETING SINGLE POST BY ID


*/
