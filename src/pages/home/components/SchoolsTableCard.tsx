import { colors, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { SearchInput } from "../../../components";
import { primaryShades } from "../../../constants/AppColors";
import { PaginatedTable, TableTemplate } from "../../../shared";
import { SchoolTableCellHeader } from "../data";

export default function SchoolsTableCard() {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.background.paper}
      padding={2}
      borderRadius={(theme) => theme.spacing(0.85)}
      minHeight="100px"
      spacing={1}
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="body1"
            color={(theme) => theme.palette.common.black}
          >
            Schools
          </Typography>
          <Typography
            sx={(theme) => ({
              bgcolor: primaryShades[100],
              padding: theme.spacing(0.45),
              borderRadius: theme.spacing(2),
              fontSize: theme.spacing(1),
            })}
            variant="caption"
          >
            100 schools
          </Typography>
        </Stack>
        <SearchInput />
      </Stack>
      <Stack>
        <TableTemplate header={SchoolTableCellHeader} />
      </Stack>
    </Stack>
  );
}
