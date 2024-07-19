import { TextField } from "@mui/material";

const CommonTextField = ({ lable = "", value, onChange, ...props }) => {
  return (
    <TextField
      label={lable}
      value={value}
      onChange={onChange}
      variant="standard"
      sx={{
        maxWidth: "100px",
        position: "relative",
        top: "-8px",
      }}
      InputProps={{
        disableUnderline: true,
      }}
      {...props}
    />
  );
};
export default CommonTextField;
