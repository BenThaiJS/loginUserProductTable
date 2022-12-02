import React from "react";
import axios from "axios";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const CommentCard = ({ details, userId }) => {
  const { id, uuid, rating, description, user, createdAt } = details;
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const deleteComment = async () => {
    await axios.delete(`http://localhost:5000/reviews/${uuid}`);
    window.location.reload(false);
  };

  return (
    <div className='card-content' key={id}>
      <div className='media'>
        <div className='media-left'>
          {user.image ? (
            <figure className='image is-48x48'>
              <img src={`http://localhost:5000/${user.image}`} alt='reviewer' />
            </figure>
          ) : (
            ""
          )}
        </div>
        <div className='media-content'>
          <p className='title is-4'>{user.name}</p>
          <p className='subtitle is-6'>{user.email}</p>
        </div>
      </div>

      <div className='content'>
        {Array(5)
          .fill()
          .map((_, index) =>
            rating >= index + 1 ? (
              <AiFillStar style={{ color: "orange" }} key={index + 1} />
            ) : (
              <AiOutlineStar style={{ color: "orange" }} key={index + 1} />
            )
          )}
        <br />
        {description}
        <br />
        <time dateTime='2016-1-1'>{formatDate(createdAt)}</time>
        {user.uuid === userId ? (
          <button
            onClick={(e) => deleteComment()}
            className='button is-small is-danger ml-6'
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentCard;
