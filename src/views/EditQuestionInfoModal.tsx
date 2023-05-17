import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IDialogBaseProps } from "../interface";
import { DialogHeader } from "../shared";
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

interface IProps extends IDialogBaseProps {
  question: QuestionsModel;
}
export default React.memo(function EditQuestionInfoModal({
  handleClose,
  open,
  question,
}: IProps) {
  const [info, setInfo] = useState<QuestionsModel>(question);
  const [answer, setAnswer] = useState<string>("");
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);
  function handleAddAnswer() {
    setInfo({ ...info, options: [...info.options, answer] });
    setAnswer("");
  }

  async function handleUpdate() {
    try {
      dispatch(pendingResponse());
      const updateQuestionInfo: UpdateQuestionInfoDto = {
        statement: info.statement,
        options: info.options,
        categoryId: info.categoryId,
        questionId: info.questionId,
        answers: info.answers,
        academicLevel: info.academicLevel,
        createdAt: info.createdAt,
        subjectId: "",
        updatedAt: info.updatedAt,
      };
      const res = await controller<ResponseModel<QuestionsModel>>({
        method: "put",
        url: ApiRoutes.questions.crud(info.questionId),
        data: updateQuestionInfo,
        token: user?.token,
      });
      dispatch(successResponse(res.message));
    } catch (error: any) {
      dispatch(errorResponse(error?.message || error));
    }
  }

  async function handleDelete() {
    try {
      dispatch(pendingResponse());
      const res = await controller<ResponseModel<QuestionsModel>>({
        method: "delete",
        token: user?.token,
        url: ApiRoutes.questions.crud(info.questionId),
      });
      dispatch(successResponse(res.message));
      handleClose();
    } catch (error: any) {
      dispatch(errorResponse(error?.message || error));
    }
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <DialogHeader handleClose={handleClose} title="Edit Question" />
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1} width="100%">
          <InputGroup
            props={{ value: info.statement }}
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
            size="small"
            props={{
              style: { color: "seagreen", borderColor: "seagreen" },
              disabled: loading,
            }}
            handleClick={handleUpdate}
            title="Update"
          />
          <CustomIconButton
            variant="outlined"
            size="small"
            props={{
              style: { color: "firebrick", borderColor: "firebrick" },
              disabled: loading,
            }}
            title="Delete"
            handleClick={handleDelete}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
});
