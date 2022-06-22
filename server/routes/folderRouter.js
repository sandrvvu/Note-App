const Router = require("express");
const router = new Router();
const folderController = require("../controllers/folderController");

router.put("/", folderController.createFolder);
router.get("/:id", folderController.getFolder);
router.post("/", folderController.getAllFolder);
router.post("/:id", folderController.updateFolder);
router.delete("/:id", folderController.deleteFolder);
router.get("/:id/notes", folderController.getAllNoteofFolder);

module.exports = router;
