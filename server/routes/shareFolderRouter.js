const Router = require("express");
const router = new Router();
const noteController = require("../controllers/noteController");

router.get("/:id", noteController.getSharedNote);
router.post("/", noteController.getAllSharedNote);

module.exports = router;
