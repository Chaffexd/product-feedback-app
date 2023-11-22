type NotificationProps = {
  title: string | undefined;
  message: string | undefined;
  status: string | undefined;
};

const Notification = ({ title, message, status }: NotificationProps) => {

  const notificationClasses = `
  fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 w-6/12 rounded-lg
    ${
      status === "error"
        ? "bg-red-500 text-white"
        : status === "success"
        ? "bg-green-500 text-white"
        : "bg-gray-500 text-white"
    }
  `;

  return (
    <section className={notificationClasses}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{message}</p>
    </section>
  );
};

export default Notification;
