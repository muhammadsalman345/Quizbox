import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const CoursesDataGridColumns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 200, align: "center" },
  { field: "courseId", headerName: "Couser Id", width: 200, align: "center" },
  { field: "status", headerName: "Course Status", width: 100, align: "center" },
  { field: "userId", headerName: "User Id", width: 200, align: "center" },
  { field: "title", headerName: "Course Title", width: 300 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    align: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.row.startDate).format("dd,  DD/MM/YYYY")}`,
  },
  { field: "duration", headerName: "Duration", width: 100, align: "center" },
  { field: "period", headerName: "Period", width: 120, align: "center" },
  { field: "type", headerName: "Course Type", width: 150, align: "center" },
  { field: "fee", headerName: "Fee", width: 100, align: "center" },
  { field: "students", headerName: "Students", width: 200, align: "center" },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${dayjs(params.row.createdAt).format("DD/MM/YYYY")}`,
  },
];
