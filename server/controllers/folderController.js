const { Note, Folder, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class folderController {
  async createFolder(req, res, next) {
    try {
      const { name, userId } = req.body;
      const folder = await Folder.create({ name: name, userId: userId });
      return res.status(200).json(folder);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async updateFolder(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const folder = await Folder.findOne({ where: { id } });
      if (!folder) {
        return next(ApiError.internal("папка не знайдена"));
      }
      folder.name = name;
      await folder.save();
      return res.status(200).json(folder);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async deleteFolder(req, res, next) {
    try {
      const { id } = req.params;
      const folder = await Folder.findOne({ where: { id } });
      if (!folder) {
        return next(ApiError.internal("папка не знайдена"));
      }

      const d = await Folder.destroy({ where: { id } });
      return res.status(200).json(`папка ${d} видалена`);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }
  async getFolder(req, res, next) {
    try {
      const { id } = req.params;
      const folder = await Folder.findOne({ where: { id: id } });
      if (!folder) {
        return next(ApiError.internal("папка не знайдена"));
      }
      return res.status(200).json(folder);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async getAllFolder(req, res, next) {
    try {
      const { userId } = req.body;
      const folders = await Folder.findAll({ where: { userId: userId } });
      return res.status(200).json(folders);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async getAllNoteofFolder(req, res, next) {
    try {
      const folderId = req.params.id;
      const folder = await Folder.findOne({ where: { id: folderId } });
      if (!folder) {
        return next(ApiError.internal("папка не знайдена"));
      }
      const notes = await Note.findAll({ where: { folderId: folderId } });
      return res.status(200).json(notes);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }
}

module.exports = new folderController();
