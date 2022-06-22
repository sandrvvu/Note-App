import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { getSharedNote } from "../apiCalls/notesApi";

const ShareNote = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [note, setNote] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getSharedNote(id)
      .then((res) => {
        setNote(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (note) {
      setAuthor(note.authorname);
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note, id]);

  return (
    <Layout>
      <div className="w-full mx-auto mt-12 md:max-w-6xl">
        <nav className="h-18">
          <h4>
            Shared by *
            <span className=" text-lg text-bold "> 
              { author}*
            </span>
          </h4>
        </nav>
        <h3 className="block w-full text-4xl title font-bold outline-none text-primary-default">
          {title}
        </h3>

        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </Layout>
  );
};

export default ShareNote;
 

