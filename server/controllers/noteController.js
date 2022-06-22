const { Note, Folder, ShareNote, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class noteController {
  async createNote(req, res, next) {
    try {
      const { title, body, folderId } = req.body;
      const folder = await Folder.findOne({ id: folderId });
      if (!folder) {
        return next(ApiError.internal("папка не знайдена"));
      }
      if (!req.body.title) {
        req.body.title = "Untitled Note";
      }
      const note = await Note.create({
        title: title,
        body: body,
        folderId: folderId,
      });
      await note.save();

      return res.status(200).json(note);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async updateNote(req, res, next) {
    try {
      const { title, body } = req.body;
      const noteId = req.params.id;
      const note = await Note.findOne({ where: { id: noteId } });
      if (!note) {
        return next(ApiError.internal("нотатка не знайдена"));
      }
      note.body = body;
      note.title = title;
      await note.save();
      return res.status(200).json(note);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async deleteNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findOne({ where: { id: id } });
      if (!note) {
        return next(ApiError.internal("нотатка не знайдена"));
      }
      const d = await Note.destroy({ where: { id: id } });
      return res.status(200).json(`нотатка ${d} видалена `);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async getNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findOne({ where: { id: id } });
      if (!note) {
        return next(ApiError.internal("нотатка не знайдена"));
      }
      return res.status(200).json(note);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async shareNote(req, res, next) {
    try {
      const { ourId, login, noteId } = req.body;
      const note = await Note.findOne({ where: { id: noteId } });
      if (!note) {
        return next(ApiError.internal("нотатка не знайдена"));
      }
      const user = await User.findOne({ where: { login: login } });
      if (!user) {
        return next(ApiError.internal("користувач не знайден"));
      }
      const author = await User.findOne({ where: { id: ourId } });
      if (!author) {
        return next(ApiError.internal("користувач не знайден"));
      }

      const item = Object.assign({
        userId: user.id,
        authorid: ourId,
        authorname: author.login,
        title: note.title,
        body: note.body,
      });

      await ShareNote.create(item);
      return res.status(200).json(item);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }

  async getAllSharedNote(req, res, next) {
    try {
      const { userId } = req.body;
      const shareNotes = await ShareNote.findAll({ where: { userId: userId } });
      return res.status(200).json(shareNotes);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }
  async getSharedNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await ShareNote.findOne({ where: { id: id } });
      if (!note) {
        return next(ApiError.internal("нотатка не знайдена"));
      }
      return res.status(200).json(note);
    } catch (e) {
      return next(ApiError.badRequest(e));
    }
  }
}

module.exports = new noteController();
