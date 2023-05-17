import { Divider, Grid, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BillingRateInfoCard,
  CustomIconButton,
  Loader,
} from "../../../components";
import { WiCloudRefresh } from "react-icons/wi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import AddCategoryModal from "../../../views/AddCategoryModal";
import { FeatureDto, FeatureInfo } from "../../../model/FeaturesModel";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FeaturesThunk } from "../../../functions";
import ApiRoutes from "../../../routes/ApiRoutes";
import { FeatureGroupCard, PricingCard } from "../components";
import {
  AddBillingrateModal,
  AddChallengeCategoryModal,
  AddPricingModal,
} from "../../../views";
import { ChallengeCategoryInfoCard } from "../../../shared";
export default function FeaturesPage() {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  const [info, setInfo] = useState<FeatureDto>(FeatureInfo);
  const { features } = useAppSelector((state) => state.FeaturesReducer);
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [addChallengeCagegory, setAddChallengeCategory] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);
  const [addBillingRate, setAddBillingRate] = useState<boolean>(false);
  const [addPricing, setAddPricing] = useState<boolean>(false);
  /////
  /////
  const [addEducationalLevel, setAddEducationalLevel] =
    useState<boolean>(false);
  const [addQuestionsCategory, setAddQuestionsCategory] =
    useState<boolean>(false);
  const [addUserCategory, setAddUserCategory] = useState<boolean>(false);

  function handleAddQuestionsCategory() {
    dispatch(
      FeaturesThunk({
        data: info.questionCategory,
        token: user?.token,
        method: "post",
        url: ApiRoutes.category.addQuestionsCategories,
      })
    );
  }

  function handleAddUserCategory() {
    dispatch(
      FeaturesThunk({
        data: info.usersCategory,
        token: user?.token,
        method: "post",
        url: ApiRoutes.category.addUsersCategories,
      })
    );
  }

  function handleAddEducationalCategory() {
    dispatch(
      FeaturesThunk({
        data: info.educationalLevel,
        token: user?.token,
        method: "post",
        url: ApiRoutes.category.educationalLevel,
      })
    );
  }

  function handleFeatures() {
    dispatch(
      FeaturesThunk({
        token: user?.token,
        url: ApiRoutes.category.get,
        method: "get",
      })
    );
  }

  useEffect(() => {
    console.log(features);
    handleFeatures();
  }, []);

  return (
    <Stack spacing={1} width="100%" padding={1} height="100%">
      <AddPricingModal
        open={addPricing}
        handleClose={() => setAddPricing(false)}
      />

      <AddBillingrateModal
        open={addBillingRate}
        handleClose={() => setAddBillingRate(false)}
      />
      <AddCategoryModal
        open={addQuestionsCategory}
        handleClose={() => setAddQuestionsCategory(false)}
        title="Questions Category Title"
        placeholder="category title"
        handleDescription={(e) =>
          setInfo({
            ...info,
            questionCategory: {
              ...info.questionCategory,
              description: e.target.value,
            },
          })
        }
        handleSubmit={handleAddQuestionsCategory}
        handleTitle={(e) =>
          setInfo({
            ...info,
            questionCategory: {
              ...info.questionCategory,
              title: e.target.value,
            },
          })
        }
      />

      <AddChallengeCategoryModal
        open={addChallengeCagegory}
        handleClose={() => setAddChallengeCategory(false)}
      />

      <AddCategoryModal
        open={addEducationalLevel}
        handleClose={() => setAddEducationalLevel(false)}
        title="Educational Level Title"
        placeholder="category title"
        handleDescription={(e) =>
          setInfo({
            ...info,
            educationalLevel: {
              ...info.educationalLevel,
              description: e.target.value,
            },
          })
        }
        handleSubmit={handleAddEducationalCategory}
        handleTitle={(e) =>
          setInfo({
            ...info,
            educationalLevel: {
              ...info.educationalLevel,
              title: e.target.value,
            },
          })
        }
      />

      <AddCategoryModal
        open={addUserCategory}
        handleClose={() => setAddUserCategory(false)}
        title="UserCategory"
        placeholder="category title"
        handleDescription={(e) =>
          setInfo({
            ...info,
            usersCategory: {
              ...info.usersCategory,
              description: e.target.value,
            },
          })
        }
        handleSubmit={handleAddUserCategory}
        handleTitle={(e) =>
          setInfo({
            ...info,
            usersCategory: {
              ...info.usersCategory,
              title: e.target.value,
            },
          })
        }
      />
      <Loader open={loading} />
      <Stack
        borderRadius={(theme) => theme.spacing(0.5)}
        padding={1}
        border={(theme) =>
          `1px solid ${theme.palette.action.disabledBackground}`
        }
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        bgcolor={(theme) => theme.palette.common.white}
      >
        <CustomIconButton
          variant="outlined"
          title="Refresh"
          Icon={WiCloudRefresh}
          handleClick={handleFeatures}
          size="small"
        />
      </Stack>
      <Stack direction="row" spacing={1.5} padding={2} width="100%">
        <Stack
          width="300px"
          padding={(theme) => theme.spacing(1, 1)}
          borderRadius={(theme) => theme.spacing(0.45)}
          border={(theme) =>
            `1px solid ${theme.palette.action.disabledBackground}`
          }
          height="80vh"
          sx={(theme) => ({
            overflowX: "hidden",
            overflowY: "auto",
          })}
          bgcolor={(theme) => theme.palette.common.white}
          spacing={2}
          overflow="hidden"
        >
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Billing Rates</Typography>
            <CustomIconButton
              variant="outlined"
              title="Rate"
              Icon={MdOutlineBookmarkAdd}
              handleClick={() => setAddBillingRate(true)}
              size="xsmall"
            />
          </Stack>
          <Divider />
          <Grid
            alignItems="center"
            justifyContent="center"
            container
            spacing={1}
            width="100%"
            height="100%"
            sx={(theme) => ({
              overflow: "auto",
            })}
            paddingBottom={2}
          >
            {features.billingRates &&
              features.billingRates.map((billingRate) => (
                <BillingRateInfoCard key={billingRate._id} info={billingRate} />
              ))}
          </Grid>
        </Stack>
        <Stack
          height="80vh"
          sx={(theme) => ({
            overflowX: "hidden",
            overflowY: "auto",
          })}
          flex={1}
          border={(theme) =>
            `1px solid ${theme.palette.action.disabledBackground}`
          }
          padding={1}
          borderRadius={(theme) => theme.spacing(0.45)}
          bgcolor={(theme) => theme.palette.common.white}
          spacing={2}
        >
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Features and Categories</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={1.5}
            >
              <CustomIconButton
                variant="outlined"
                title="User"
                Icon={MdOutlineBookmarkAdd}
                handleClick={() => setAddUserCategory(true)}
                size="small"
              />
              <CustomIconButton
                variant="outlined"
                title="Question"
                Icon={MdOutlineBookmarkAdd}
                handleClick={() => setAddQuestionsCategory(true)}
                size="small"
              />
              <CustomIconButton
                variant="outlined"
                title="Education"
                Icon={MdOutlineBookmarkAdd}
                handleClick={() => setAddEducationalLevel(true)}
                size="small"
              />
            </Stack>
          </Stack>
          <Divider />
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            rowSpacing={2}
            columnSpacing={2}
          >
            <FeatureGroupCard
              title="Questions Category"
              label={features.questionsCategories.length.toString()}
              data={features.questionsCategories.map((q) => q.title)}
            />
            <FeatureGroupCard
              title="Users Category"
              label={features.usersCategory.length.toString()}
              data={features.usersCategory.map((u) => u.title)}
            />
            <FeatureGroupCard
              title="Educational Levels"
              label={features.educationLevels.length.toString()}
              data={features.educationLevels.map((q) => q.title)}
            />
          </Grid>
        </Stack>
        <Stack
          flex={1}
          border={(theme) =>
            `1px solid ${theme.palette.action.disabledBackground}`
          }
          padding={1}
          borderRadius={(theme) => theme.spacing(0.45)}
          bgcolor={(theme) => theme.palette.common.white}
          spacing={2}
        >
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Service Pricings</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={1.5}
            >
              <CustomIconButton
                variant="outlined"
                title="Pricing"
                Icon={MdOutlineBookmarkAdd}
                handleClick={() => setAddPricing(true)}
                size="small"
              />
            </Stack>
          </Stack>
          <Divider />
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            width="100%"
            sx={(theme) => ({
              overflow: "auto",
              paddingBottom: theme.spacing(2),
            })}
            spacing={2}
          >
            {features.pricing.map((pf) => (
              <PricingCard pricing={pf} key={pf._id} />
            ))}
          </Grid>
        </Stack>
        <Stack
          flex={1}
          border={(theme) =>
            `1px solid ${theme.palette.action.disabledBackground}`
          }
          padding={1}
          borderRadius={(theme) => theme.spacing(0.45)}
          bgcolor={(theme) => theme.palette.common.white}
          spacing={2}
        >
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            padding={1}
          >
            <Typography variant="body1" color="primary">
              Challenge Category
            </Typography>
            <CustomIconButton
              title="Add"
              Icon={MdOutlineBookmarkAdd}
              variant="outlined"
              size="small"
              handleClick={() => setAddChallengeCategory(true)}
            />
          </Stack>
          <Divider />
          <Stack spacing={1}>
            {features.challengeCategories.map((c) => (
              <ChallengeCategoryInfoCard info={c} key={c._id} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
