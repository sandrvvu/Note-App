import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const Editorr = (props) => {
  const { body, setBody } = props;
  return (
    <div className="w-full mx-auto mt-4 leading-normal text-primary-default editor">
      <CKEditor
        editor={Editor}
        data={body}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setBody(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
};
export default Editorr;
