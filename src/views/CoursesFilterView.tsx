import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import {
  CustomDatePicker,
  CustomIconButton,
  InputGroup,
  PrimaryButton,
} from "../components";

interface IProps {
  handleClose: () => void;
}
export default function CoursesFilterView({ handleClose }: IProps) {
  return (
    <Stack width="250px" height="100vh">
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        padding={2}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Typography fontSize={(theme) => theme.spacing(2.5)} variant="body1">
            Filter Courses
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          <CustomIconButton
            title="Close"
            handleClick={handleClose}
            Icon={IoFilterOutline}
            variant="outlined"
            props={{ color: "error" }}
          />
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={1.5} padding={2}>
        <CustomDatePicker handleChange={(e) => {}} placeholder="Start Date" />
        <CustomDatePicker handleChange={(e) => {}} placeholder="End Date" />
        <InputGroup
          placeholder="number of records"
          label="PageSize"
          props={{ type: "number" }}
        />
        <InputGroup
          placeholder="course type"
          label="Course Type"
          props={{ select: true }}
        >
          {}
        </InputGroup>
        <InputGroup label="Course Status" props={{ select: true }}>
          {}
        </InputGroup>
      </Stack>
      <Divider />
      <Stack padding={2} width="100%">
        <PrimaryButton
          title="Submit"
          props={{ variant: "outlined", disableElevation: true }}
        />
      </Stack>
    </Stack>
  );
}
