import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card card-border bg-purple-700 text-white" key={post.id}>
        <div className="card-body">
          <h3 className="text-2xl font-bold mb-2">{post.title}</h3>

          <CommentCreate  postId={post.id}/>
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  });

  return (
    <div className=" max-w-1/2 mx-auto pt-6">
      <h1 className="text-2xl font-bold mb-2">Posts</h1>
      <div className="grid grid-cols-3 mt-4 gap-4">{renderedPosts}</div>
    </div>
  );
};

export default PostList;
