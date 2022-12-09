import React from "react";

const UserCard = ({ user, isOpen }) => {
  return isOpen ? (
    <div class='modal'>
      <div class='modal-background'></div>
      <div class='modal-content'></div>
      <button class='modal-close is-large' aria-label='close'></button>
    </div>
  ) : (
    ""
  );
};

export default UserCard;
