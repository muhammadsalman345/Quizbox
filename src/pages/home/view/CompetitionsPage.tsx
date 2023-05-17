import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { CustomIconButton, PaginationComponent } from "../../../components";
import { CompetitionInfoCard } from "../components";

export default function CompetitionsPage() {
  return (
    <Stack width="100%" padding={1} spacing={1}>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        borderRadius={(theme) => theme.spacing(0.5)}
        border={(theme) =>
          `1px solid ${theme.palette.action.disabledBackground}`
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <Typography variant="body1">Competitions</Typography>
        </Stack>
        <Stack alignItems="center" justifyContent="flex-end" direction="row">
          <CustomIconButton
            variant="outlined"
            title="Add Contest"
            Icon={MdOutlineBookmarkAdd}
          />
        </Stack>
      </Stack>
      <Stack spacing={1.6} width="100%" height="100%">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={3}
          alignItems="center"
          justifyContent="center"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <CompetitionInfoCard index={i} key={i} />
          ))}
        </Grid>

        <Stack
          bgcolor={(theme) => theme.palette.common.white}
          width="100%"
          alignItems="center"
          justifyContent="center"
          borderRadius={(theme) => theme.spacing(0.5)}
        >
          <PaginationComponent
            onPageChange={() => {}}
            totalCount={0}
            page={1}
            pageSize={10}
            handlePageSize={() => {}}
            totalPages={10}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
