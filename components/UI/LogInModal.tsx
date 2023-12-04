import { useAppDispatch } from "@/app/store/hooks";

type LoginModalProps = {
  message: string;
  onClose: () => void;
};

const LogInModal = ({ message, onClose }: LoginModalProps) => {
    const dispatch = useAppDispatch();
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={onClose}></div>
      <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <p className="mb-2">{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default LogInModal;
