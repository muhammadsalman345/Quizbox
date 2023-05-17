import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ChallengePriceInfoCard, DialogHeader } from "../shared";
import { Divider, Stack, Typography } from "@mui/material";
import {
  CustomIconButton,
  InputGroup,
  RowContainer,
  SmallInput,
} from "../components";
import { IoAddOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import ChallengeCategory, {
  ChallengePrice,
  CreateChallengeCategoryDto,
} from "../model/ChallegeCategory";
import { BsListUl } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
import { ValidateChallengePrice } from "../pages/home/services";
import { generateId } from "../utils";
import controller from "../controller";
import { ResponseModel } from "../model/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  handleClose: () => void;
  open: boolean;
}

export default function AddChallengeCategoryModal({
  handleClose,
  open,
}: IProps) {
  const dispatch = useAppDispatch();
  const [viewPrices, setViewPrices] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.UserReducer);
  const [info, setInfo] = useState<CreateChallengeCategoryDto>({
    title: "",
    description: "",
    price: [],
    numberOfParticipants: 0,
  });
  const [price, setPrice] = useState<ChallengePrice>({
    title: "",
    id: "",
    description: "",
    amount: 0,
    position: 0,
  });

  function handleAddPrice() {
    try {
      ValidateChallengePrice(price);
      var pos = info.price.find((p) => p.position === price.position);
      if (pos) {
        dispatch(errorResponse("Challenge Position Already Exist"));
      } else {
        setInfo({
          ...info,
          price: [...info.price, { ...price, id: generateId() }],
        });
        setPrice({
          title: "",
          id: "",
          description: "",
          amount: 0,
          position: 0,
        });
      }
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  async function handleAddChallengeCategory() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<ChallengeCategory>>({
        data: info,
        url: ApiRoutes.category.challengeCategory(),
        method: "post",
        token: user?.token,
      });
      if (res.code === 200 || res.code === 201) {
        setInfo({
          title: "",
          description: "",
          price: [],
          numberOfParticipants: 0,
        });
      }
      dispatch(successResponse(res.message));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={viewPrices ? "md" : "sm"}
      aria-describedby="alert-dialog-slide-description"
      sx={(theme) => ({
        transition: "all 0.45s ease-in-out",
      })}
    >
      <DialogTitle>
        <DialogHeader title="Challenge Category" handleClose={handleClose} />
      </DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" spacing={1}>
          <Stack flex={1} spacing={1}>
            <InputGroup
              handleChange={(e) => setInfo({ ...info, title: e.target.value })}
              placeholder="enter the title"
              label="Title"
              props={{ value: info.title }}
            />
            <InputGroup
              handleChange={(e) =>
                setInfo({ ...info, description: e.target.value })
              }
              placeholder="enter the description"
              label="Description"
              props={{ value: info.description, multiline: true }}
            />
            <InputGroup
              label="Number Of Participants"
              placeholder="number of participants"
              handleChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) {
                  setInfo({
                    ...info,
                    numberOfParticipants: parseInt(e.target.value),
                  });
                } else {
                  setInfo({ ...info, numberOfParticipants: 0 });
                }
              }}
              props={{
                type: "number",
                value:
                  info.numberOfParticipants > 0
                    ? info.numberOfParticipants
                    : "",
              }}
            />
            <Stack width="100%" spacing={1}>
              <Typography variant="caption">Challenge Prices</Typography>
              <Divider />
              <SmallInput
                handleChange={(e) =>
                  setPrice({ ...price, title: e.target.value })
                }
                placeholder="title"
                label="Title*"
                value={price.title}
              />
              <RowContainer>
                <>
                  <SmallInput
                    handleChange={(e) => {
                      if (!isNaN(parseInt(e.target.value))) {
                        setPrice({
                          ...price,
                          position: parseInt(e.target.value),
                        });
                      } else {
                        setPrice({ ...price, position: 0 });
                      }
                    }}
                    style={{ flex: 1 }}
                    placeholder="position*"
                    type="number"
                    value={price.position > 0 ? price.position : ""}
                  />
                  <SmallInput
                    handleChange={(e) => {
                      if (!isNaN(parseFloat(e.target.value))) {
                        setPrice({
                          ...price,
                          amount: parseFloat(e.target.value),
                        });
                      } else {
                        setPrice({ ...price, amount: 0 });
                      }
                    }}
                    placeholder="price"
                    type="number"
                    value={price.amount > 0 ? price.amount.toString() : ""}
                  />
                </>
              </RowContainer>
              <RowContainer>
                <>
                  <SmallInput
                    handleChange={(e) =>
                      setPrice({ ...price, description: e.target.value })
                    }
                    style={{ flex: 1 }}
                    placeholder="description"
                    value={price.description}
                  />
                  <CustomIconButton
                    size="small"
                    variant="contained"
                    title="Add"
                    Icon={IoAddOutline}
                    handleClick={handleAddPrice}
                  />
                </>
              </RowContainer>
            </Stack>
          </Stack>
          {viewPrices && (
            <Stack
              padding={(theme) => theme.spacing(1, 2.5)}
              flex={1}
              spacing={1}
              border={(theme) =>
                `1px solid ${theme.palette.action.disabledBackground}`
              }
            >
              <Typography variant="body1">Challenge Prices</Typography>
              <Divider />
              {info.price.map((p) => (
                <ChallengePriceInfoCard
                  handleDelete={() =>
                    setInfo({
                      ...info,
                      price: info.price.filter((pr) => pr.id !== p.id),
                    })
                  }
                  info={p}
                  key={p.id}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomIconButton
          variant="outlined"
          title={viewPrices ? "Hide Prices" : "View Prices"}
          Icon={BsListUl}
          handleClick={() => setViewPrices(!viewPrices)}
        />
        <CustomIconButton
          variant="contained"
          title="Submit"
          Icon={RiSendPlaneLine}
          handleClick={handleAddChallengeCategory}
        />
      </DialogActions>
    </Dialog>
  );
}
