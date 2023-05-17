import {
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CustomIconButton, InputGroup, NoDataView } from "../../../components";
import { AiOutlineCloudUpload, AiOutlineFileExcel } from "react-icons/ai";
import readXlsxFile, { Row } from "read-excel-file";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { prepareQuestionData } from "../../home/services";
import {
  CreateQuestionDto,
  QuestionsUploadDto,
} from "../../../model/QuestionsModel";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../../../features/ResponseReducer";
import {
  generateId,
  getQuestionsYear,
  validateQuestionsUploadInfo,
} from "../../../utils";
import controller from "../../../controller";
import { ResponseModel } from "../../../model/ResponseModel";
import ApiRoutes from "../../../routes/ApiRoutes";
import { QuestionInfoCard } from "../../home/components";
import { FeaturesThunk } from "../../../functions";
import {
  useEducationQuery,
  useSubjectsQuery,
} from "../../../controller/ApiQueries";

export default function UploadQuestionsPage() {
  const [years, setYears] = useState<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const {
    data: subjects,
    isLoading: subjectLoading,
    error: subjectError,
    isFetching: subjectFetching,
  } = useSubjectsQuery({ method: "get", url: "subject" });
  const {
    data: education,
    isLoading: educationLoading,
    isFetching: educationFetching,
    error: educationError,
  } = useEducationQuery({ method: "get", url: "education" });
  const { features } = useAppSelector((state) => state.FeaturesReducer);
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  const [uploadInfo, setUploadInfo] = useState<QuestionsUploadDto>({
    questions: [],
    subject: "",
    educationalLevel: "",
    year: "",
  });
  const { user } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();
  function handleQuestionsData(rows: Row[]) {
    // console.log(rows);
    const data = rows.map(prepareQuestionData);
    setUploadInfo({
      ...uploadInfo,
      questions: data.filter((d) => d.statement.length != 0),
    });
  }

  async function handleQuestionsUpload() {
    try {
      validateQuestionsUploadInfo(uploadInfo);
      dispatch(pendingResponse());
      let data: CreateQuestionDto[] = [];
      data = uploadInfo.questions.map((q) => ({
        statement: q.statement,
        answers: q.answers,
        options: q.options,
        academicLevel: q.academicLevel,
        categoryId: q.categoryId,
        questionId: generateId(),
      }));
      const res = await controller<ResponseModel<any>>({
        data: {
          questions: data,
          educationalLevel: uploadInfo.educationalLevel,
          subject: uploadInfo.subject,
          year: uploadInfo.year,
        },
        method: "post",
        token: user?.token,
        url: ApiRoutes.questions.crud(),
      });
      dispatch(successResponse(res.message));
      setUploadInfo({
        questions: [],
        subject: "",
        educationalLevel: "",
        year: "",
      });
    } catch (error: any) {
      dispatch(errorResponse(error?.message || error));
    }
  }

  function handleDelete(questionId: string) {
    setUploadInfo({
      ...uploadInfo,
      questions: uploadInfo.questions.filter(
        (q) => q.questionId !== questionId
      ),
    });
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
    setYears(getQuestionsYear());
    handleFeatures();
    return () => {
      setYears([]);
    };
  }, []);
  useEffect(() => {
    if (file) {
      readXlsxFile(file).then((rows) => {
        handleQuestionsData(rows);
      });
    }
  }, [file]);
  return (
    <Stack padding={2}>
      <Stack>
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
        >
          <Stack
            border={(theme) =>
              `1px solid ${theme.palette.action.disabledBackground}`
            }
            padding={2}
            width="100%"
            direction="row"
            spacing={1}
            bgcolor={(theme) => theme.palette.common.white}
          >
            <InputGroup
              label="Subject/Course"
              handleChange={(e) =>
                setUploadInfo({ ...uploadInfo, subject: e.target.value })
              }
              props={{
                select: true,
                value: uploadInfo.subject,
                disabled: Boolean(
                  subjectLoading || subjectFetching || subjectError
                ),
              }}
            >
              {subjects &&
                subjects.data.map((c) => (
                  <MenuItem key={c._id} value={c.subjectId}>
                    {c.title}
                  </MenuItem>
                ))}
            </InputGroup>
            <InputGroup
              handleChange={(e) =>
                setUploadInfo({
                  ...uploadInfo,
                  educationalLevel: e.target.value,
                })
              }
              label="Educational Level"
              props={{
                select: true,
                value: uploadInfo.educationalLevel,
                disabled: Boolean(
                  educationLoading || educationFetching || educationError
                ),
              }}
            >
              {education &&
                education.data.map((e) => (
                  <MenuItem key={e._id} value={e.educationId}>
                    {e.title}
                  </MenuItem>
                ))}
            </InputGroup>
            <InputGroup
              handleChange={(e) =>
                setUploadInfo({ ...uploadInfo, year: e.target.value })
              }
              props={{ select: true, value: uploadInfo.year }}
              label="Year"
            >
              {years.map((y) => (
                <MenuItem key={y.toString()} value={y.toString()}>
                  {y.toString()}
                </MenuItem>
              ))}
            </InputGroup>
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={1}
            >
              <Typography
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: theme.spacing(0.5, 1.5),
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: theme.spacing(0.5),
                  color: theme.palette.primary.main,
                })}
                variant="body1"
                component="label"
                htmlFor="file-input"
              >
                <small>Choose File</small>
                <AiOutlineFileExcel fontSize="small" />
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                type="file"
                id="file-input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
                sx={(theme) => ({
                  display: "none",
                })}
              />
              <CustomIconButton
                props={{
                  color: "primary",
                  disabled:
                    Boolean(
                      uploadInfo.subject.length <= 0 ||
                        uploadInfo.educationalLevel.length <= 0 ||
                        uploadInfo.questions.length <= 0 ||
                        uploadInfo.year.length <= 0
                    ) || loading,
                }}
                title={loading ? "Uploading.." : "Upload"}
                Icon={AiOutlineCloudUpload}
                variant="contained"
                handleClick={handleQuestionsUpload}
              />
            </Stack>
          </Stack>
          <Stack height="100%" width="100%">
            <Paper variant="outlined">
              <Stack height="100%" padding={2} spacing={1}>
                {uploadInfo.questions.length > 0 ? (
                  uploadInfo.questions.map((q, i) => (
                    <QuestionInfoCard
                      question={q}
                      index={i + 1}
                      key={q.questionId}
                      isEditing={true}
                      handleDelete={() => handleDelete(q.questionId)}
                    />
                  ))
                ) : (
                  <NoDataView />
                )}
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
