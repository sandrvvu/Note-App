import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../index";
import { createFolder, getAllFolder } from "../apiCalls/folderApi";

const Sidebar = () => {
  const { user } = useContext(Context);
  const history = useHistory();

  const userid = parseInt(localStorage.getItem("user_id"));
  const userName = localStorage.getItem("user_name");

  const [folders, setFolders] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    getAllFolder(userid).then((res) => {
      setFolders(res);
    });
  }, []);

  const createFolderHandler = async () => {
    createFolder(userid).then((res) => {
      history.push(`/folder/${res?.id}`);
    });

    getAllFolder(userid).then((res) => {
      setFolders(res);
    });
  };

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    history.push("/");
  };

  return (
    <>
      {showSidebar ? (
        <div className="box-border w-56 font-mono min-h-screen py-4 font-medium break-all transition-all duration-200 ease-in select-none position-fixed bg-gray-200 text-primary-light">
          <div className="bg-gray-300">
            <button
              className="block content-center px-1 bg-gray-500 text-sm py-1 mx-4 text-black object-center font-medium rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-600 hover:text-white"
              onClick={logOut}
            >
              Logout
            </button>

            <div className="flex content-center justify-between px-2 my-3">
              <h1 className="  text-center title ml-8 text-lg">La via</h1>

              <i
                className="cursor-pointer  fas fa-chevron-left text-basic-150 "
                onClick={() => setShowSidebar(!showSidebar)}
              ></i>
            </div>
            <p
              className="py-1 mr-4 text-center font-mono cursor-pointer hover:bg-basic-50"
              onClick={() => history.push("/workspace")}
            >
              {userName}'s workspace
            </p>

            <h3 className="text-gray-400">-------------------------</h3>
          </div>
          <button
            className="block w-9/12 px-4 font-mono py-2 m-auto my-4 font-medium text-center bg-purple-600 text-white border-2 border-gray-600 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-800"
            onClick={createFolderHandler}
          >
            <i className="fas fa-plus"></i> New Folder
          </button>

          <div className="px-2 py-1 my-2 text-sm font-mono font-bold uppercase cursor-pointer hover:bg-basic-50">
            <Link to={`/shared-with-me`}>
              Shared with me <i className="far fa-folder-open"></i>
            </Link>
          </div>

          <div className="px-2 py-1 mt-2 text-sm  font-mono font-bold uppercase hover:bg-basic-50">
            Folders
          </div>
          <>
            {folders &&
              folders.map((folder) => (
                <Link
                  to={`/folder/${folder.id}`}
                  key={folder.id}
                  className="block px-4 py-2 my-1 hover:bg-basic-50"
                >
                  <i className="far fa-folder-open text-basic-150"></i>{" "}
                  {folder.name}
                </Link>
              ))}
          </>
        </div>
      ) : (
        <div className="mt-2.5 ml-2 text-lg">
          <i
            className="cursor-pointer fas fa-bars text-basic-150"
            onClick={() => setShowSidebar(!showSidebar)}
          ></i>
        </div>
      )}
    </>
  );
};

export default Sidebar;
