import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");
  
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content
    });

    setContent('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comment"
            className="input input-secondary mb-3 w-full"
          />
        </div>
        <div className="justify-end card-actions">
          <button className="btn btn-secondary">Submit!</button>
        </div>
      </form>
    </div>
  );
};

export default CommentCreate;
