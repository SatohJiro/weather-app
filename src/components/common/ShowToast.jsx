import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/toastStyles.css";
import { Typography } from "@mui/material";

const showToast = (message, isError = false, options = {}) => {
  const toastOptions = {
    className: "toast-glass",
    bodyClassName: "toast-glass",
    progressClassName: "toast-glass",
    ...options,
  };
  const renderMessage = () => {
    return (
      <Typography variant="caption" fontWeight="bold">
        {message}
      </Typography>
    );
  };

  isError
    ? toast.error(renderMessage(), toastOptions)
    : toast(renderMessage(), toastOptions);
};

export default showToast;
