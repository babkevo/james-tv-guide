const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

router.get("/alltv", function(req, res) {
  db.TvList.find(function(err, tvlist) {
    if (err) {
      console.log(err);
    } else {
      res.json(tvlist);
    }
  });
});
router.get("/:id", function(req, res) {
  let id = req.params.id;
  db.TvList.findById(id, function(err, tvlist) {
    res.json(tvlist);
  });
});

router.post("/add",function(req, res, next) {
  let tvlist = new db.TvList(req.body);
  tvlist
    .save()
    .then(tvlist => {
      res.status(200).json({ tvlist: "tvlist added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new tvlist failed");
    });
});

router.post("/update/:id", function(req, res) {
  db.TvList.findById(req.params.id, function(err, tvlist) {
    if (!tvlist) res.status(404).send("data is not found");
    else tvlist.programe_description = req.body.programe_description;
    tvlist.programe_category = req.body.programe_category;
    tvlist.programe = req.body.programe;

    tvlist
      .save()
      .then(tvlist => {
        res.json("TvList updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});


module.exports = router;
