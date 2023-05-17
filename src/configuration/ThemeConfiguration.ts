import { createTheme } from "@mui/material";
import { primaryShades } from "../constants/AppColors";

export default createTheme({
  palette: {
    primary: {
      main: primaryShades[500],
    },
  },
});
