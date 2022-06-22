import { format } from "date-fns";
import React from "react";
import { useHistory } from "react-router-dom";

const ShareNoteCard = ({ note }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/shared-with-me/${note.id}`)}
      className="flex flex-col p-4 my-1 overflow-hidden text-white bg-purple-600 transition duration-100 ease-in-out rounded-sm cursor-pointer text-primary-default h-44 shadow-custom hover:bg-basic-20 note-page"
    >
      <div className="mb-2">
        <span className="inline-block mb-1 font-sanc text-xs  align-bottom ">
          {<em>*on {format(new Date(note.createdAt), "dd-MMMM")}*</em>}
        </span>
        <p className="mb-1 text-3xl title  text-bold font-mono">{note.title}</p>
      </div>
      {<em className="text-sm font-light ">Shared by {note.authorname} </em>}
    </div>
  );
};
export default ShareNoteCard;
