import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "../components/Modal";
import ShareModal from "../components/ShareModal";
import Layout from "../components/Layout";
import Editorr from "../components/CKEditor";
import {
  getNote,
  deleteNote,
  updateNote,
  shareNote,
} from "../apiCalls/notesApi";
import { validInput } from "../utils/validation";
const AUTOSAVE_INTERVAL = 1000;

const Note = () => {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const userid = parseInt(localStorage.getItem("user_id"));

  const [note, setNote] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [savedTitle, setSavedTitle] = useState("");
  const [savedBody, setSavedBody] = useState("");
  const [shuser, setShuser] = useState("");
  const [deleteAction, setDeleteAction] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareAction, setShareAction] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const deleteNoteHandler = () => {
    setDeleteModal(true);
  };
  const shareNoteHandler = () => {
    setShareAction(false);
    setShuser("");
    setShareModal(true);
  };

  useEffect(() => {
    if (shareAction) {
      shareNote(id, userid, shuser)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [shareAction]);

  useEffect(() => {
    refreshNote(id);
  }, [id]);

  const refreshNote = (id) => {
    getNote(id)
      .then((res) => {
        setNote(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (deleteAction) {
      deleteNote(note.id).then((res) => {
        history.push("/workspace");
      });
    }
  }, [deleteAction]);

  useEffect(() => {
    if (note) {
      setBody(note.body);
      setTitle(note.title);
    }
  }, [note]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if ((savedTitle !== title && validInput(title)) || savedBody !== body) {
        updateNote(id, body, title).then((res) => {
          setSavedBody(body);
          setSavedTitle(title);
        });
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [title, body]);

  return (
    <Layout>
      <div className="w-full mx-auto mt-12 md:max-w-6xl">
        {deleteModal && (
          <Modal
            title="Are you sure you want to delete the note?"
            actionValue={deleteAction}
            setActionValue={setDeleteAction}
            action="Delete"
            variant="error"
            body="Are you sure you want to delete your note. This
          action cannot be undone."
            setModal={setDeleteModal}
          />
        )}
        {shareModal && (
          <ShareModal
            title="Share the note"
            actionValue={shareAction}
            user={shuser}
            SetUser={setShuser}
            setActionValue={setShareAction}
            variant="error"
            setModal={setShareModal}
          />
        )}

        <ul className="flex float-right mt-3 text-sm">
          <li>
            <button
              className="mx-2 bg-gray-300 text-gray-700 font-semibold py-1 px-4 rounded inline-flex items-center transform transition duration-500 hover:scale-110"
              onClick={shareNoteHandler}
            >
              <span className="mr-1">Share</span>
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </li>
          <li>
            <button
              className="mx-2 bg-gray-300 text-gray-700 font-semibold py-1 px-4 rounded inline-flex items-center transform transition duration-500 hover:scale-110"
              onClick={deleteNoteHandler}
            >
              <span className="mr-1">Delete</span>
              <i className="fa-solid fa-trash"></i>
            </button>
          </li>
        </ul>

        <input
          type="text"
          value={title}
          maxLength={64}
          className="block w-full text-4xl font-bold outline-none text-primary-default"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Editorr body={body} setBody={setBody} />
      </div>
    </Layout>
  );
};

export default Note;
