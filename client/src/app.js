import React from "react";
import PostCreate from "./PostCreate";

const App = () => {
    return <div className="card card-border max-w-1/2 bg-base-100 card-md shadow-sm mx-auto mt-10">
        <div className="card-body">
        <h1 className="text-2xl font-bold mb-2">Create Post</h1>
        <PostCreate />
    </div>
    </div>
}

export default App;
