import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/toastStyles.css";

const showToast = (message, isError = false, options = {}) => {
  const toastOptions = {
    className: "toast-glass",
    bodyClassName: "toast-glass",
    progressClassName: "toast-glass",
    ...options,
  };

  isError ? toast.error(message, toastOptions) : toast(message, toastOptions);
};

export default showToast;
