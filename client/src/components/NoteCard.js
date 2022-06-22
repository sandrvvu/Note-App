import { format } from "date-fns";
import React from "react";
import { useHistory } from "react-router-dom";

const NoteCard = ({ note }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/note/${note.id}`)}
      className="flex flex-col p-4 my-1 text-white overflow-hidden bg-purple-600 transition duration-100 ease-in-out rounded-sm cursor-pointer text-primary-default h-44 shadow-custom hover:bg-basic-20 note-page"
    >
      <div className="mb-2">
        <span className="inline-block mb-1 font-sanc text-xs   align-bottom ">
          {
            <em>
              *Last updated on {format(new Date(note.updatedAt), "dd-MMMM")}*
            </em>
          }
        </span>
        <p className="mb-1 text-3xl title text-bold font-mono">{note.title}</p>
      </div>
      {!note.body && <em className="text-xs font-light ">Empty</em>}
      {/*<div
        className="note-card text-xs text-gray-600 font-sans" 
        dangerouslySetInnerHTML={{ __html: note.body }}
        ></div>*/}
    </div>
  );
};
export default NoteCard;
