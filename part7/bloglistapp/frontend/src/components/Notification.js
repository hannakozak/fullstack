import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <>
      {notification.map((notification) => (
        <div
          key="notification.id"
          id="notification"
          style={style}
          className={notification.type}
        >
          {notification.message}
        </div>
      ))}
    </>
  );
};

export default Notification;
