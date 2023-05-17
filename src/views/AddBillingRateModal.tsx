import * as React from "react";
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
  Divider,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { InputGroup, ModalCloseButton, PrimaryButton } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BillingRate, { BillingRateDto } from "../model/BillingRate";
import { FeaturesThunk } from "../functions";
import ApiRoutes from "../routes/ApiRoutes";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
import controller from "../controller";
import { ResponseModel } from "../model/ResponseModel";
import { setFeatures } from "../features/FeaturesReducer";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps extends ModalBaseProps {}

export default function AddBillingRateModal({ handleClose, open }: IProps) {
  const { features } = useAppSelector((state) => state.FeaturesReducer);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);
  const [info, setInfo] = React.useState<BillingRateDto>({
    title: "",
    category: {
      _id: "",
      title: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      categoryId: "",
    },
    price: 0,
    tag: "",
  });

  async function handleAddBillingRate() {
    try {
      dispatch(pendingResponse());
      const data = await controller<ResponseModel<BillingRate[]>>({
        data: info,
        method: "post",
        token: user?.token,
        url: ApiRoutes.billingRate.crud,
      });
      dispatch(successResponse(data.message));
      dispatch(
        setFeatures({
          ...features,
          billingRates: data.data,
        })
      );
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
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2">Add Billing Rate</Typography>
          <ModalCloseButton handleClick={handleClose} />
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1} width="100%">
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
          <InputGroup
            props={{ select: true, value: info.title }}
            label="Period or Duration Per Charge"
            placeholder="choose billing period"
            handleChange={(e) => setInfo({ ...info, title: e.target.value })}
          >
            {["Year", "Month", "Week", "Day", "Hour"].map((p) => (
              <MenuItem value={p} key={p}>
                {p}
              </MenuItem>
            ))}
          </InputGroup>
          <InputGroup
            props={{ select: true, value: info.category.categoryId }}
            label="Billing User Category"
            handleChange={(e) => {
              const va = features.usersCategory.find(
                (uc) => uc.categoryId === e.target.value
              );
              if (va) {
                setInfo({ ...info, category: va });
              }
            }}
          >
            {features.usersCategory.map((u) => (
              <MenuItem value={u.categoryId} key={u._id}>
                {u.title}
              </MenuItem>
            ))}
          </InputGroup>
          <InputGroup
            label="Price"
            placeholder="enter billing price"
            props={{
              type: "number",
              value: info.price === 0 ? "" : info.price.toString(),
            }}
            handleChange={(e) => {
              if (!isNaN(parseFloat(e.target.value))) {
                setInfo({ ...info, price: parseFloat(e.target.value) });
              } else {
                setInfo({ ...info, price: 0 });
              }
            }}
          />
          <PrimaryButton
            handleClick={handleAddBillingRate}
            title="Submit"
            props={{ variant: "outlined" }}
          />
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
