import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Stack } from "@mui/material";
import { CourseGridModel, CourseModel } from "../model/CourseModel";
import { useAppSelector } from "../app/hooks";

interface IProps {
  data: {
    columns: GridColDef[];
    rows: CourseGridModel[];
  };
  handlePageChange: (p: number) => void;
  handlePageSizeChange: (ps: number) => void;
}
export default function CoursesDataGrid({
  data,
  handlePageChange,
  handlePageSizeChange,
}: IProps) {
  const { courses } = useAppSelector((state) => state.CourseReducer);
  const { loading } = useAppSelector((state) => state.ResponseReducer);

  return (
    <Stack sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        loading={loading}
        rowHeight={38}
        checkboxSelection
        disableSelectionOnClick
        page={courses.page}
        pageSize={courses.pageSize}
        rowCount={courses.totalDocuments}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Stack>
  );
}
