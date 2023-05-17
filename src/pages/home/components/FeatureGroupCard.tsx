import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { TfiTag } from "react-icons/tfi";
import { HiChevronDown } from "react-icons/hi";
import { VscDebugBreakpointFunction } from "react-icons/vsc";

interface IProps {
  title: string;
  label: string;
  data: string[];
}
///
export default function FeatureGroupCard({ title, label, data }: IProps) {
  return (
    <Grid item>
      <Stack
        boxShadow={(theme) =>
          `-1px 3px 3px 1px ${theme.palette.action.disabledBackground}`
        }
        bgcolor={(theme) => theme.palette.background.paper}
        width="300px"
        spacing={1}
        borderRadius={(theme) => theme.spacing(0.15)}
      >
        <Stack
          height="4px"
          bgcolor={(theme) => theme.palette.primary.main}
          width="100%"
        />
        <Stack paddingBottom={0.5} paddingX={0.45}>
          <Typography variant="body2">{title}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={0.5}
            >
              <TfiTag />
              <Typography variant="caption">Total Items:</Typography>
              <Typography color="primary" variant="body1">
                {label}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<HiChevronDown />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={(theme) => ({
              height: "40px",
            })}
          >
            <Typography variant="caption">More</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Stack width="100%">
              {data.map((d) => (
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={0.5}
                >
                  <VscDebugBreakpointFunction fontSize="small" />
                  <Typography variant="caption">{d}</Typography>
                </Stack>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Grid>
  );
}
