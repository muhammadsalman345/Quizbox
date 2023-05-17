import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  CustomIconButton,
  NoDataView,
  PaginationComponent,
} from "../../../components";
import { FeaturesThunk } from "../../../functions";
import QuestionsModel from "../../../model/QuestionsModel";
import ApiRoutes from "../../../routes/ApiRoutes";
import { AddQuestionModal, EditQuestionInfoModal } from "../../../views";
import { Loader, QuestionInfoCard } from "../components";
import { useGetQuestionsQuery } from "../../../controller/ApiQueries";

import NavigationRoutes from "../../../routes/NavigationRoutes";
import { useNavigate } from "react-router-dom";

export default function QuestionsPage() {
  const navigation = useNavigate();
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState<QuestionsModel | null>(null);
  const [pageSize, setPageSize] = useState(5);
  const [add, setAdd] = useState(false);

  const { user } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetQuestionsQuery({
    method: "get",
    url: ApiRoutes.questions.crud(),
    token: user?.token,
    params: { page: page, pageSize: pageSize },
  });

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
    handleFeatures();
  }, []);
  return (
    <Stack padding={2} width="100%">
      <Loader loading={isFetching || isLoading} />
      {question && (
        <EditQuestionInfoModal
          open={Boolean(question)}
          handleClose={() => setQuestion(null)}
          question={question}
        />
      )}

      <AddQuestionModal open={add} handleClose={() => setAdd(false)} />
      <Stack padding={2}>
        <Stack
          padding={(theme) => theme.spacing(1.5, 2)}
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={(theme) => theme.palette.common.white}
          borderRadius={(theme) => theme.spacing(0.85)}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography variant="body1">Questions</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <CustomIconButton
              variant="outlined"
              handleClick={() =>
                navigation(NavigationRoutes.home.uploadQuestions)
              }
              title="Upload"
              Icon={AiOutlineCloudUpload}
            />
            <CustomIconButton
              handleClick={() => setAdd(true)}
              title="Add Question"
              variant="outlined"
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack padding={2} spacing={2}>
        {data && data.data.results.length <= 0 && <NoDataView />}
        {data &&
          data.data.results.length > 0 &&
          data &&
          data.data.results.map((q, index) => (
            <QuestionInfoCard
              handleEdit={() => setQuestion(q)}
              index={index + 1}
              question={q}
              key={q._id}
            />
          ))}
      </Stack>
      {data && data.data.results.length > 0 && (
        <Stack padding={2} spacing={2}>
          <PaginationComponent
            pageSize={(data && data.data.pageSize) || pageSize}
            totalCount={(data && data.data.totalDocuments) || 0}
            page={(data && data.data.page) || 1}
            totalPages={(data && data.data.totalPages) || 0}
            onPageChange={(page) => setPage(page)}
            handlePageSize={(p) => setPageSize(p)}
          />
        </Stack>
      )}
    </Stack>
  );
}
