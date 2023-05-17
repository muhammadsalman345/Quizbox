import React from "react";
import { CourseInfo, CourseModel } from "../../../model/CourseModel";
import { Stack, Typography } from "@mui/material";
import { StatusBubble } from "../../../shared";
import { currency } from "../../../constants";
import { CustomIconButton } from "../../../components";

interface IProps {
  course: CourseInfo;
}
export default React.memo(function CourseInfoCard({ course }: IProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      padding={0.85}
      bgcolor={(theme) => theme.palette.common.white}
      boxShadow={(theme) => theme.shadows[1]}
      spacing={1.5}
    >
      <Stack
        width="40px"
        height="40px"
        borderRadius="40px"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        border={(theme) =>
          `1px solid ${theme.palette.action.disabledBackground}`
        }
      >
        {course.course.coverImage && (
          <img src={course.course.coverImage.url} className="img" />
        )}
      </Stack>
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <Typography variant="body1">{course.course.title}</Typography>
          <StatusBubble
            variant={
              course.course.status === "approved"
                ? "approved"
                : course.course.status === "pending"
                ? "pending"
                : course.course.status === "deleted"
                ? "deleted"
                : "default"
            }
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <small>author:</small>
          <Typography variant="body2">{course.author.user.name}</Typography>
          <Typography variant="caption">
            {currency}
            {parseFloat(course.course.fee.toString()).toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
      <Stack flex={1} />
      <CustomIconButton size="small" variant="outlined" title="Readmore" />
    </Stack>
  );
});
