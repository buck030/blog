import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts", {
        title
    });

    setTitle('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="">
          {/* <label>Title</label> */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input input-secondary mb-3 w-full"
          />
        </div>
        <div className="justify-end card-actions">
          <button className="btn btn-secondary">Post!</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
