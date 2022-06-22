import axios from "axios";

export const createNote = async (folderId) => {
  const res = await axios.put(
    "http://localhost:5000/api/note",
    { folderId: folderId, title: "Untitled", body: "" },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getNote = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/note/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.token,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updateNote = async (id, body, title) => {
  const res = await axios.post(
    `http://localhost:5000/api/note/${id}`,
    { body: body, title: title },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await axios.delete(`http://localhost:5000/api/note/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.token,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const shareNote = async (id, ourid, user) => {
  const res = await axios.put(
    "http://localhost:5000/api/note/sh",
    { ourId: ourid, login: user, noteId: parseInt(id, 10) },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getSharedNote = async (id) => {
  const res = await axios.get(
    `http://localhost:5000/api/shared-with-me/${id}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getAllShareNote = async (id) => {
  const res = await axios.post(
    `http://localhost:5000/api/shared-with-me/`,
    { userId: id },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
