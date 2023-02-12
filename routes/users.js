var express = require('express');
var router = express.Router();
var {store,show, destroy, index, update, login}=require("../controller/userController")


router.post("/",store);
router.get("/:id",show);
router.delete("/:id",destroy);
router.get("/",index);
router.put("/:id",update);
router.post("/login",login)
module.exports = router;
