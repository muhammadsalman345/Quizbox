import {
  Stack,
  Pagination,
  Typography,
  TextField,
  MenuItem,
  Slider,
} from "@mui/material";
import React, { ChangeEvent } from "react";

interface IProps {
  page: number;
  handlePageSize?: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}
export default function PaginationComponent({
  pageSize,
  totalCount,
  onPageChange,
  handlePageSize,
  page,
  totalPages,
}: IProps) {
  return (
    <Stack
      direction="row"
      width="100%"
      padding={1}
      borderRadius={0.85}
      border={(theme) => `1px solid ${theme.palette.action.disabledBackground}`}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        count={totalPages}
        color="primary"
        page={page}
        defaultPage={1}
        onChange={(e, p) => onPageChange(p)}
        size="small"
      />
      <Stack width="100px" />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2.5}
        justifyContent="center"
      >
        <Typography variant="caption">page size</Typography>
        <Stack marginX={2} width={"200px"}>
          <Slider
            aria-label="Page Size"
            defaultValue={5}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={100}
            onChangeCommitted={(e, n) => {
              var ps: any = n;
              handlePageSize && handlePageSize(ps);
            }}
            size="small"
          />
        </Stack>
      </Stack>
      <Stack flex={1} />
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Typography variant="caption">
          {computePaginationInfo(page, pageSize, totalCount).start} {" - "}{" "}
          {computePaginationInfo(page, pageSize, totalCount).end}
        </Typography>
        <small>of</small>{" "}
        <Typography variant="caption">{totalCount}</Typography>
      </Stack>
    </Stack>
  );
}

function computePaginationInfo(
  page: number,
  pageSize: number,
  totalCount: number
) {
  const start = Math.abs(page - 1) * pageSize + 1;
  const end = pageSize * page;

  const diff = totalCount - end;
  const isLess = end <= totalCount;

  return {
    start,
    end: isLess ? end : end + diff,
    totalCount,
  };
}
