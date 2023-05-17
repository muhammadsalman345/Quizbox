import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IDialogBaseProps } from "../interface";
import { CustomImagePicker, DialogHeader } from "../shared";
import QuestionsModel, {
  CreateQuestionDto,
  UpdateQuestionInfoDto,
} from "../model/QuestionsModel";
import { CustomIconButton, InputGroup, SmallInput } from "../components";
import { IoMdClose } from "react-icons/io";
import { CiBookmarkPlus } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  errorResponse,
  pendingResponse,
  successResponse,
} from "../features/ResponseReducer";
import controller from "../controller";
import { ResponseModel } from "../model/ResponseModel";
import ApiRoutes from "../routes/ApiRoutes";
import { validateQuestionInfo } from "../pages/home/services";
import { generateId } from "../utils";
import dayjs from "dayjs";

interface IProps extends IDialogBaseProps {}
export default React.memo(function AddQuestionModal({
  handleClose,
  open,
}: IProps) {
  const [info, setInfo] = useState<CreateQuestionDto>({
    questionId: "",
    answers: [],
    options: [],
    statement: "",
    categoryId: "",
    academicLevel: [],
  });
  const { features } = useAppSelector((state) => state.FeaturesReducer);
  const [figure, setFigure] = useState<File | null>(null);
  const [figurePreview, setFigurePreview] = useState<any>(null);
  const [answer, setAnswer] = useState<string>("");
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);
  function handleAddAnswer() {
    setInfo({ ...info, options: [...info.options, answer] });
    setAnswer("");
  }

  async function handleSave() {
    try {
      validateQuestionInfo(info);
      dispatch(pendingResponse());
      const formData = new FormData();
      if (figure) {
        formData.append("file", figure as any);
      }
      formData.append("categoryId", info.categoryId);
      formData.append("answers", JSON.stringify(info.answers));
      formData.append("options", JSON.stringify(info.options));
      formData.append("statement", info.statement);
      formData.append("academicLevel", info.academicLevel as any);
      formData.append("questionId", generateId());
      formData.append("subjectId", info.categoryId);
      formData.append("createdAt", dayjs().format());
      formData.append("updatedAt", dayjs().format());
      const res = await controller<ResponseModel<QuestionsModel>>({
        method: "post",
        url: ApiRoutes.questions.crud("add"),
        data: formData,
        token: user?.token,
        contentType: "multipart/form-data",
      });
      dispatch(successResponse(res.message));
      setInfo({
        questionId: "",
        answers: [],
        options: [],
        statement: "",
        categoryId: "",
        academicLevel: [],
      });
      setFigure(null);
      setFigurePreview(null);
    } catch (error: any) {
      dispatch(errorResponse(error?.message || error));
    }
  }

  useEffect(() => {
    if (figure) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(figure);
      fileReader.addEventListener("load", (e) => {
        e.target && setFigurePreview(e.target?.result);
      });
    }
  }, [figure]);

  useEffect(() => {
    return () => {
      setInfo({
        questionId: "",
        answers: [],
        options: [],
        statement: "",
        categoryId: "",
        academicLevel: [],
      });
      setFigure(null);
      setFigurePreview(null);
    };
  }, []);

  return (
    <Dialog open={open} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <DialogHeader handleClose={handleClose} title="Edit Question" />
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1} width="100%">
          <CustomImagePicker
            handleChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFigure(e.target.files[0]);
              }
            }}
            label="Choose Question Figure"
            removeImage={() => setFigure(null)}
          />
          <InputGroup
            handleChange={(e) =>
              setInfo({
                ...info,
                academicLevel: [e.target.value],
              })
            }
            props={{ select: true, value: info.academicLevel }}
            label="Educational Level"
          >
            {features.educationLevels.map((e) => (
              <MenuItem value={e.categoryId} key={e._id}>
                {e.title}
              </MenuItem>
            ))}
          </InputGroup>
          <InputGroup
            handleChange={(e) =>
              setInfo({ ...info, categoryId: e.target.value })
            }
            props={{ select: true }}
            label="Subject"
          >
            {features.questionsCategories.map((q) => (
              <MenuItem key={q._id} value={q.categoryId}>
                {q.title}
              </MenuItem>
            ))}
          </InputGroup>
          <InputGroup
            props={{ value: info.statement, multiline: true, minRows: 1 }}
            label="Question Statement"
            handleChange={(e) =>
              setInfo({ ...info, statement: e.target.value })
            }
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
            spacing={1}
            border={(theme) =>
              `1px solid ${theme.palette.action.disabledBackground}`
            }
            borderRadius={0.85}
            padding={1}
          >
            <SmallInput
              handleChange={(e) => setAnswer(e.target.value)}
              style={{ flex: 1 }}
              placeholder="plausible answer"
              value={answer}
            />
            <CustomIconButton
              props={{ disabled: !Boolean(answer.trim()) }}
              handleClick={handleAddAnswer}
              size="small"
              variant="outlined"
              title="Add"
            />
          </Stack>
          <Typography variant="body1">Plausible Answers</Typography>
          <Stack
            padding={1}
            border={(theme) =>
              `1px solid ${theme.palette.action.disabledBackground}`
            }
            borderRadius={0.85}
            spacing={1}
          >
            {info.options.map((a) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  spacing={1}
                  border={(theme) =>
                    `1px solid ${theme.palette.action.disabledBackground}`
                  }
                  borderRadius={0.85}
                  key={a}
                  padding={(theme) => theme.spacing(0, 0.85)}
                >
                  <Typography variant="body2">{a}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={0.85}
                  >
                    <IconButton
                      onClick={() =>
                        setInfo({
                          ...info,
                          options: info.options.filter((o) => o !== a),
                        })
                      }
                      size="small"
                    >
                      <IoMdClose fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setInfo({
                          ...info,
                          answers: [...info.answers.filter((n) => n !== a), a],
                        })
                      }
                      size="small"
                    >
                      <CiBookmarkPlus fontSize="samll" />
                    </IconButton>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Typography variant="body1">Answers</Typography>
          <Stack
            padding={1}
            border={(theme) =>
              `1px solid ${theme.palette.action.disabledBackground}`
            }
            borderRadius={0.85}
            spacing={1}
          >
            {info.answers.map((a) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  spacing={1}
                  border={(theme) =>
                    `1px solid ${theme.palette.action.disabledBackground}`
                  }
                  borderRadius={0.85}
                  key={a}
                  padding={(theme) => theme.spacing(0, 0.85)}
                >
                  <Typography variant="body2">{a}</Typography>

                  <IconButton
                    onClick={() =>
                      setInfo({
                        ...info,
                        answers: info.answers.filter((ans) => ans !== a),
                      })
                    }
                    size="small"
                  >
                    <IoMdClose fontSize="small" />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
          padding={(theme) => theme.spacing(0.85, 2)}
        >
          <CustomIconButton
            variant="outlined"
            props={{
              style: { color: "seagreen", borderColor: "seagreen" },
              disabled: loading,
            }}
            handleClick={handleSave}
            title="Submit"
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
});
