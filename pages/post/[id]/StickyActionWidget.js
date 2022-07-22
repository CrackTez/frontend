import React, { useEffect } from "react";

const StickyActionWidget = ({ hash, diamonds, likes, comments, commentEl }) => {
  useEffect(() => { }, []);

  const diamondHandler = () => {
    // Give diamonds
    alert("Given diamond!");
  };

  const likeHandler = () => {
    // If post is already liked, unlike it
    alert("Post Liked!");
  };

  const commentHandler = () => {
    commentEl.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='sticky-div sticky bottom-2 flex justify-center items-center w-full'>
      <div className='action-widget bg-gray-100 border border-slate-300 shadow-xl rounded-full'>
        <button
          className='p-2 rounded-l-full hover:bg-slate-200 duration-300'
          onClick={diamondHandler}>
          <i className='far fa-gem text-slate-700 px-1'></i>
          {diamonds}
        </button>

        <button
          className='p-2 border-x border-slate-400 hover:bg-slate-200 duration-300'
          onClick={likeHandler}>
          <i className='far fa-heart text-slate-700 px-1'></i>
          {likes}
        </button>

        <button
          className='p-2 rounded-r-full hover:bg-slate-200 duration-300'
          onClick={commentHandler}>
          <i className='far fa-comment-alt text-slate-700 px-1'></i>
          {comments}
        </button>
      </div>
    </div>
  );
};

StickyActionWidget.defaultProps = {
  diamonds: 0,
  likes: 0,
  comments: 0,
};

export default StickyActionWidget;
