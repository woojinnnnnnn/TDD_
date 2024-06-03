// 라우팅 로직.
const express = require("express");
const router = express.Router();
const ctrl = require('./user.ctrl.js')


router.get("/", ctrl.getUsers);

router.get("/:id", ctrl.getUser);

router.delete("/:id", ctrl.destroyUser);

router.post("/", ctrl.addUser);

router.put("/:id", ctrl.updateUser);

module.exports = router;
