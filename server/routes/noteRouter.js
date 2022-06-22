const Router = require("express");
const router = new Router();
const noteController = require("../controllers/noteController");

router.put("/sh", noteController.shareNote);
router.put("/", noteController.createNote);
router.get("/:id", noteController.getNote);
router.post("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
