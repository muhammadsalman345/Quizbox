import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Stack, TextFieldProps } from "@mui/material";

interface IProps {
  handleChange: (val: any) => void;
  placeholder: string;
  inputProps?: TextFieldProps;
}
export default function CustomDatePicker({
  handleChange,
  placeholder,
  inputProps,
}: IProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

  return (
    <Stack marginY={1}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat="DD/MM/YYYY"
          label={placeholder}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              {...params}
              {...inputProps}
            />
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
}
