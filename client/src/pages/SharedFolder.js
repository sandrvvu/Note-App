import React from "react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SharedNoteCard from "../components/SharedNoteCard";
import { getAllShareNote } from "../apiCalls/notesApi";

const ShareFolder = () => {
  const userid = parseInt(localStorage.getItem("user_id"));

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllShareNote(userid)
      .then((res) => {
        setNotes(res);
      })
      .catch((err) => {
        alert(err);
      });
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-12">
        <h3 className="block w-full mb-2 text-4xl title font-bold outline-none text-primary-default">
          Share with me
        </h3>
        <div className="grid mx-3 mt-4 md:mx-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
          {notes?.map((note) => (
            <div className="apear">
            <SharedNoteCard key={note.id} note={note} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ShareFolder;
