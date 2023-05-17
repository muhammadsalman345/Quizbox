import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  colors,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { PricingFeatureCard } from "../../../components";
import AppColors from "../../../constants/AppColors";
import PricingModel from "../../../model/PricingModel";

interface IProps {
  pricing: PricingModel;
}
export default function PricingCard({ pricing }: IProps) {
  return (
    <Grid item>
      <Stack
        sx={(theme) => ({
          borderRadius: theme.spacing(0.85),
          border: `1px solid ${theme.palette.action.disabledBackground}`,
          "&:hover": {
            border: `1px solid ${theme.palette.action.hover}`,
            boxShadow: theme.shadows[1],
          },
          transition: "all 0.45s ease-in-out",
        })}
        bgcolor={(theme) => theme.palette.background.paper}
        minWidth="400px"
        width="100%"
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          padding={1}
        >
          <Typography variant="body2">Pricing</Typography>
          <Typography
            sx={(theme) => ({
              padding: theme.spacing(0.5, 1.25),
              borderRadius: "30px",
              bgcolor: theme.palette.action.hover,
            })}
            variant="caption"
            color="primary"
          >
            {pricing.tag}
          </Typography>
        </Stack>
        <Stack padding={1}>
          <Typography variant="h4">
            ${pricing.rate.price}
            <sub style={{ color: "#c0c0c0", fontSize: "12px" }}>
              per {pricing.rate.title}
            </sub>
          </Typography>
        </Stack>
        <Stack padding={1}></Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<HiChevronDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body2">{pricing.description}</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Stack padding={1}>
              <Typography variant="body1" fontWeight={600}>
                FEATURES
              </Typography>
              <Typography variant="caption">
                Everything in our plan plus...
              </Typography>
            </Stack>
            <Stack spacing={0.5} padding={1} paddingBottom={2}>
              {pricing.features.map((feature) => {
                return (
                  <PricingFeatureCard
                    key={feature.id}
                    feature={feature.feature}
                  />
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Grid>
  );
}
