import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import NoteCard from "../components/NoteCard";
import Modal from "../components/Modal";
import {
  getFolder,
  getNoteOfFolder,
  updateFolder,
  deleteFolder,
} from "../apiCalls/folderApi";
import { createNote } from "../apiCalls/notesApi";
import { Context } from "../index";
const AUTOSAVE_INTERVAL = 1000;

const Folder = () => {
  const [folder, setFolder] = useState();
  const [notes, setNotes] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    getFolder(id)
      .then((res) => {
        setFolder(res);
      })
      .catch((err) => {
        alert(err);
      });

    getNoteOfFolder(id).then((res) => {
      setNotes(res);
    });
  }, [id]);

  useEffect(() => {
    if (folder) {
      setFolderName(folder.name);
    }
  }, [folder, id]);

  const addNoteHandler = () => {
    createNote(id).then((res) => {
      history.push(`/note/${res?.id}`);
      getNoteOfFolder(id).then((res) => {
        setNotes(res);
      });
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (savedName !== folderName && folderName) {
        updateFolder(id, folderName).then((res) => {
          setSavedName(folderName);
        });
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [folderName, id]);

  const deleteFolderHandler = () => {
    setDeleteModal(true);
  };
  useEffect(() => {
    if (deleteAction) {
      deleteFolder(folder.id).then((res) => {
        history.push("/workspace");
      });
    }
  }, [deleteAction, history]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        {deleteModal && (
          <Modal
            title="Are you sure you want to delete the folder?"
            actionValue={deleteAction}
            setActionValue={setDeleteAction}
            action="Delete"
            variant="error"
            body="Are you sure you want to delete your folder. This
          action cannot be undone."
            setModal={setDeleteModal}
          />
        )}

        <button
          className="mx-2 bg-gray-300 text-gray-700 flex float-right mt-5 font-semibold py-2 px-4 rounded inline-flex items-center transform transition duration-500 hover:scale-110"
          onClick={deleteFolderHandler}
        >
          <span className="mr-1">Delete</span>
          <i className="fa-solid fa-trash"></i>
        </button>

        <input
          type="text"
          className="block w-full title mb-2 text-4xl font-bold outline-none text-primary-default"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          maxLength={64}
        />
        <div className="my-1">
          <button
            onClick={addNoteHandler}
            className="py-1 px-1.5 my-2 rounded hover:bg-basic-50 text-primary-light "
          >
            <i className="mr-2 fas fa-plus"></i>
            Add Note
          </button>
        </div>
        <div className="grid mx-3 mt-4 md:mx-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
          {notes?.map((note) => (
            <div className="apear">
              <NoteCard key={note.id} note={note} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Folder;
