import React from "react";
import Layout from "../components/Layout";

const Workspace = () => {
  return (
    <Layout>
      <div className="mx-auto mt-5 md:w-4/5 max-h-screen  font-mono">
        <h1 className=" text-4xl font-bold text-primary-default">Workspace</h1>

        <div className="apear">
          <img
            src={require("../assets/work2.gif")}
            alt="home"
            className="mt-5 mx-12 hidden w-7/12 object-fit lg:block"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Workspace;
