const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const folderRouter = require("./folderRouter");
const noteRouter = require("./noteRouter");
const shareFolderRouter = require("./shareFolderRouter");

router.use("/user", userRouter);
router.use("/folder", folderRouter);
router.use("/note", noteRouter);
router.use("/shared-with-me", shareFolderRouter);

module.exports = router;
