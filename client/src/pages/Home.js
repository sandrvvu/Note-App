import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <div className="max-w-full max-h-screen text-center">
      <div className="h-20">
        <ul className="apear flex float-left mt-5 text-sm font-mono">
          <li
            className="px-2.5 py-1.5 mx-4 cursor-pointer transform transition duration-500 hover:scale-110"
            onClick={() => history.push("/login")}
          >
            Log In
          </li>
          <li
            className="border-2 cursor-pointer border-gray-600 px-2.5 py-1.5 mx-4 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-400"
            onClick={() => history.push("/registration")}
          >
            Sign Up
          </li>
        </ul>
      </div>

      <main>
        <div className="mt-5 g-56 grid grid-cols-2">
          <div className="font-mono flex flex-col self-center py-3">
            <h1 className="title flex flex-col text-lg"> La Vie </h1>
            <div class="typewriter">
              <h1 className="text-lg">
                When your heart speaks, take good notes.
              </h1>
            </div>
          </div>
          <div>
            <img
              src={require("../assets/home.gif")}
              alt="home"
              className="hidden w-10/12 mx-6 object-fit lg:block"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
