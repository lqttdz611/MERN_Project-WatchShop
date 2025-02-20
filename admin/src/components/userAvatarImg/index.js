import React from "react";

const AvatarUser = (props) => {
  return (
    <>
      <div className={`userImg ${props.lg===true && 'lg'}`}>
        <span className="rounded-circle">
          <img src={props.image}></img>
        </span>
      </div>
    </>
  );
};

export default AvatarUser;
