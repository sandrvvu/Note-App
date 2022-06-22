import axios from "axios";

export const getAllFolder = async (ud) => {
  const res = await axios.post(
    "http://localhost:5000/api/folder/",
    { userId: ud },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const createFolder = async (userid) => {
  const res = await axios.put(
    "http://localhost:5000/api/folder/",
    { name: "Untitled", userId: userid },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getFolder = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/folder/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.token,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updateFolder = async (id, name) => {
  const res = await axios.post(
    `http://localhost:5000/api/folder/${id}`,
    { name: name },
    {
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const deleteFolder = async (id) => {
  const res = await axios.delete(`http://localhost:5000/api/folder/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.token,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getNoteOfFolder = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/folder/${id}/notes`, {
    headers: {
      Authorization: "Bearer " + localStorage.token,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
