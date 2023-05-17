import { Divider, Stack, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  CustomIconButton,
  PaginationComponent,
  SearchInput,
} from "../../../components";
import { TableTemplate } from "../../../shared";
import { generateId } from "../../../utils";
import { Loader, PageHeader, UserInfoCard } from "../components";
import { SchoolTableCellHeader } from "../data";
import { useGetUsersQuery } from "../../../controller/ApiQueries";
import AlertModal from "../../../components/AlertModal";
import { useAppSelector } from "../../../app/hooks";
import ApiRoutes from "../../../routes/ApiRoutes";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { user } = useAppSelector((state) => state.UserReducer);
  const [err, setError] = useState<string | null>(null);
  const { data, isLoading, isFetching, isError, error } = useGetUsersQuery({
    url: ApiRoutes.auth.crud("users"),
    params: { page, pageSize },
    token: user?.token,
    method: "get",
  });

  useEffect(() => {
    if (error) {
      const e: any = error;
      setError(e?.data?.error || e?.data?.message || e?.error || e);
    }
  }, [isError]);
  return (
    <Stack spacing={1} overflow="hidden" padding={2} height="100%" width="100%">
      <PageHeader />
      <AlertModal
        isError={isError}
        text={err || ""}
        action={
          <CustomIconButton
            variant="outlined"
            title="Close"
            handleClick={() => setError(null)}
          />
        }
      />
      <Loader loading={isLoading || isFetching} />
      <Stack
        padding={1}
        bgcolor={(theme) => theme.palette.common.white}
        borderRadius={(theme) => theme.spacing(0.5)}
        spacing={1}
      >
        <AlertModal isError={isError} />
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          overflow="hidden"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            paddingLeft={1}
          >
            <Typography
              variant="body1"
              color={(theme) => theme.palette.common.black}
            >
              Users
            </Typography>
            <Typography
              fontSize={(theme) => theme.spacing(1.5)}
              variant="caption"
              color="primary"
              sx={(theme) => ({
                marginLeft: theme.spacing(1),
              })}
            >
              {(data && data.data.totalDocuments) || 0} users
            </Typography>
          </Stack>
          <SearchInput />
        </Stack>
        <Divider />
        <Stack spacing={1} padding={2}>
          {data &&
            data.data.results.map((info) => (
              <UserInfoCard user={info} key={info.user.userId} />
            ))}
        </Stack>
        <Stack padding={2}>
          <PaginationComponent
            page={page}
            handlePageSize={(e) => setPageSize(e)}
            onPageChange={(e) => setPage(e)}
            pageSize={pageSize}
            totalPages={(data && data.data.totalPages) || 0}
            totalCount={(data && data.data.totalDocuments) || 0}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

/*

app.use(cors({origin:"*"}))

*/
