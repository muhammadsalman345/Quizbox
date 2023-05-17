import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ModalBaseProps } from "../pages/home/interface";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import {
  CustomIconButton,
  InputGroup,
  ModalCloseButton,
  PricingFeatureCard,
} from "../components";
import { IoAddOutline } from "react-icons/io5";
import PricingModel, { PricingDto, PricingInfo } from "../model/PricingModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { generateId } from "../utils";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
import { RxChevronDown } from "react-icons/rx";
import { validateNewPricingInfo } from "../utils/Validation";
import controller from "../controller";
import { ResponseModel } from "../model/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";
import { CiSaveUp1 } from "react-icons/ci";
import { setFeatures } from "../features/FeaturesReducer";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//
interface IProps extends ModalBaseProps {}

export default function AddPricingModal({ open, handleClose }: IProps) {
  const { user } = useAppSelector((state) => state.UserReducer);
  const [feature, setFeature] = useState<string>("");
  const { features } = useAppSelector((state) => state.FeaturesReducer);
  const [info, setInfo] = React.useState<PricingDto>(PricingInfo);
  const dispatch = useAppDispatch();
  function handleFeature() {
    if (feature && feature.length > 0) {
      setInfo({
        ...info,
        features: [...info.features, { id: generateId(), feature }],
      });
      setFeature("");
    } else {
      dispatch(errorResponse("Feature Required"));
    }
  }

  async function handleAddPricing() {
    try {
      validateNewPricingInfo(info);
      dispatch(pendingResponse());
      const data = await controller<ResponseModel<PricingModel[]>>({
        data: info,
        token: user?.token,
        method: "post",
        url: ApiRoutes.pricing.crud(),
      });
      dispatch(setFeatures({ ...features, pricing: data.data }));
      dispatch(successResponse(data.message));
      setInfo(PricingInfo);
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">Add Service Pricing</Typography>
          <IconButton size="small" color="primary" onClick={handleClose}>
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={0.5} width="100%">
          <RadioGroup
            onChange={(e) => setInfo({ ...info, tag: e.target.value })}
          >
            <Typography variant="caption">Pricing Tag</Typography>
            <Divider />
            <Stack
              direction="row"
              width="100%"
              alignItems="center"
              justifyContent="flex-start"
              spacing={0.5}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Radio value="Basic" size="small" />
                <Typography variant="caption">Basic</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Radio value="Popular" size="small" />
                <Typography variant="caption">Popular</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Radio value="Premium" size="small" />
                <Typography variant="caption">Premium</Typography>
              </Stack>
            </Stack>
          </RadioGroup>
          <Divider />
          <InputGroup
            handleChange={(e) => setInfo({ ...info, category: e.target.value })}
            label="User Group"
            props={{ select: true }}
          >
            {features.usersCategory.map((u) => (
              <MenuItem value={u.categoryId} key={u._id}>
                {u.title}
              </MenuItem>
            ))}
          </InputGroup>
          <Divider />
          <InputGroup
            handleChange={(e) => setInfo({ ...info, rate: e.target.value })}
            label="Rate/Pricing"
            props={{ select: true }}
          >
            {features.billingRates
              .filter(
                (b) =>
                  b.category.categoryId === info.category && info.tag === b.tag
              )
              .map((u) => (
                <MenuItem value={u.rateId} key={u._id}>
                  {`Period:${u.title} Price:${u.price} `}
                </MenuItem>
              ))}
          </InputGroup>
          <Divider />
          <InputGroup
            label="Description"
            props={{ multiline: true }}
            placeholder="pricing description"
            handleChange={(e) =>
              setInfo({ ...info, description: e.target.value })
            }
          />
          <Divider />
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="pricing feature"
              className="small-input"
              fullWidth
              onChange={(e) => setFeature(e.target.value)}
              value={feature}
            />
            <CustomIconButton
              variant="outlined"
              title="Add"
              Icon={IoAddOutline}
              handleClick={handleFeature}
            />
          </Stack>
          <Stack>
            <Accordion>
              <AccordionSummary
                expandIcon={<RxChevronDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body1">view features</Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {info.features.map((f) => (
                  <PricingFeatureCard key={f.id} feature={f.feature}>
                    <ModalCloseButton props={{ color: "error" }} />
                  </PricingFeatureCard>
                ))}
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
        >
          <CustomIconButton
            title="Submit"
            variant="outlined"
            Icon={CiSaveUp1}
            handleClick={handleAddPricing}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
