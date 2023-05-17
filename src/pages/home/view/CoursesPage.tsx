import { IconButton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CustomIconButton, PaginationComponent } from "../../../components";
import { SortDirection } from "../../../enum/SortDirection";
import { setCourses } from "../../../features/CourseReducer";
import CourseThunk from "../../../functions/CourseThunk";
import { formatCourseGridModel } from "../../../model/CourseModel";
import ApiRoutes from "../../../routes/ApiRoutes";
import { FilterDrawer } from "../../../shared";
import { CourseDataGrid, CoursesFilterView } from "../../../views";
import { CoursesDataGridColumns } from "../data/GridColumns";
import { useGetCoursesQuery } from "../../../controller/ApiQueries";
import { CourseInfoCard, Loader } from "../components";

export default function CoursesPage() {
  const [filterDrawer, setFilterDrawer] = useState<boolean>(false);
  const { courses } = useAppSelector((state) => state.CourseReducer);
  const { user } = useAppSelector((state) => state.UserReducer);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error: e,
  } = useGetCoursesQuery({
    method: "get",
    url: ApiRoutes.course.filter,
    token: user?.token,
    params: {
      page,
      pageSize,
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  return (
    <Stack spacing={1} width="100%" height="100%" padding={2}>
      <Loader loading={isLoading || isFetching} />
      <Stack
        direction="row"
        width="100%"
        padding={1}
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        border={(theme) =>
          `1px solid ${theme.palette.action.disabledBackground}`
        }
        borderRadius={0.5}
      >
        <FilterDrawer
          handleClose={() => setFilterDrawer(filterDrawer)}
          open={filterDrawer}
        >
          <CoursesFilterView handleClose={() => setFilterDrawer(false)} />
        </FilterDrawer>
        <Stack>
          <Typography variant="body1">Registered Coursed</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"flex-start"}
            spacing={0.85}
          >
            <Typography variant="caption">Items</Typography>
            <Typography
              variant="caption"
              sx={(theme) => ({
                fontSize: theme.spacing(1.45),
                bgcolor: theme.palette.primary.main,
                borderRadius: "5px",
                color: theme.palette.common.white,
                minWidth: "40px",
                textAlign: "center",
              })}
            >
              {/* {courses.results.length} */}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <CustomIconButton
            title="Add Course"
            Icon={MdOutlineBookmarkAdd}
            variant="outlined"
          />
          <CustomIconButton
            variant="outlined"
            title="Refresh"
            Icon={HiOutlineRefresh}
          />
          <CustomIconButton
            variant="contained"
            title="Filter"
            Icon={BsFilter}
            handleClick={(e) => setFilterDrawer(true)}
          />
        </Stack>
      </Stack>
      <Stack width="100%" padding={2} spacing={1} height="100%">
        {data &&
          data.data.results.map((info) => (
            <CourseInfoCard course={info} key={info.course.courseId} />
          ))}
        {/* <CourseDataGrid
          data={{
            columns: CoursesDataGridColumns,
            rows: formatCourseGridModel(courses.results),
          }}
          handlePageChange={(p) => getCourses(p)}
          handlePageSizeChange={(ps) => getCourses(undefined, ps)}
        /> */}
      </Stack>
      <Stack padding={2}>
        <PaginationComponent
          page={page}
          totalPages={(data && data.data.totalPages) || 0}
          totalCount={(data && data.data.totalDocuments) || 0}
          onPageChange={(p) => setPage(p)}
          handlePageSize={(p) => setPageSize(p)}
          pageSize={pageSize}
        />
      </Stack>
    </Stack>
  );
}
