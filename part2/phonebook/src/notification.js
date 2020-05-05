import React from "react";

const Notification = ({ message, setMessage }) => {
  setTimeout(() => {
    setMessage(null);
  }, 3000);
  let styles = message.includes("Error")
    ? "notification error"
    : "notification";
  return <div className={styles}>{message}</div>;
};

export default Notification;
