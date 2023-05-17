import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineFileExcel,
} from "react-icons/ai";
import readXlsxFile, { Row } from "read-excel-file";
import QuestionsModel, {
  CreateQuestionDto,
  QuestionsUploadDto,
} from "../model/QuestionsModel";
import { prepareQuestionData } from "../pages/home/services";
import { QuestionInfoCard } from "../pages/home/components";
import {
  CustomIconButton,
  InputGroup,
  NoDataView,
  PrimaryButton,
} from "../components";
import { useAppSelector } from "../app/hooks";

///
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
  handleRows: (rows: Row[]) => void;
  questions: QuestionsModel[];
  handleCategory: (cate: string) => void;
  handleAcademicLevel: (level: string) => void;
  uploadInfo: QuestionsUploadDto;
  handleUpload: () => void;
  handleDelete?: (questionId: string) => void;
  isEditing?: boolean;
}

////

export default function UploadQuestionsModal({
  handleClose,
  open,
  handleRows,
  questions,
  handleAcademicLevel,
  handleCategory,
  uploadInfo,
  handleUpload,
  handleDelete,
  isEditing,
}: IProps) {
  const [file, setFile] = useState<File | null>(null);
  const { features } = useAppSelector((state) => state.FeaturesReducer);
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  useEffect(() => {
    if (file) {
      readXlsxFile(file).then((rows) => {
        handleRows(rows);
      });
    }
  }, [file]);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      PaperComponent={Stack}
      maxWidth="md"
    >
      <DialogTitle
        sx={(theme) => ({
          bgcolor: theme.palette.common.white,
        })}
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1" color="primary">
            Upload Questions
          </Typography>

          <IconButton onClick={handleClose} size="small" color="primary">
            <AiOutlineClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={(theme) => ({
          bgcolor: theme.palette.common.white,
        })}
        dividers
      >
        <Stack position="relative">
          <Stack
            sx={(theme) => ({
              position: "sticky",
              top: 0,
              zIndex: 10,
              bgcolor: theme.palette.common.white,
            })}
            spacing={1}
            width="100%"
            direction="row"
          >
            <InputGroup
              handleChange={(e) => handleCategory(e.target.value)}
              label="Questions Category"
              props={{ select: true }}
            >
              {features.questionsCategories.map((c) => (
                <MenuItem key={c._id} value={c.categoryId}>
                  {c.title}
                </MenuItem>
              ))}
            </InputGroup>
            <InputGroup
              handleChange={(e) => handleAcademicLevel(e.target.value)}
              label="Educational Level"
              props={{ select: true }}
            >
              {features.educationLevels.map((e) => (
                <MenuItem key={e._id} value={e.categoryId}>
                  {e.title}
                </MenuItem>
              ))}
            </InputGroup>
          </Stack>
          <Divider />
          <Stack marginY={1.5} width="100%" spacing={1}>
            {questions.length > 0 ? (
              questions.map((q, i) => (
                <QuestionInfoCard
                  question={q}
                  index={i + 1}
                  key={q.questionId}
                  isEditing={isEditing}
                  handleDelete={() =>
                    handleDelete && handleDelete(q.questionId)
                  }
                />
              ))
            ) : (
              <NoDataView />
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={(theme) => ({
          bgcolor: theme.palette.common.white,
        })}
      >
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
            }}
            title={loading ? "Uploading.." : "Upload"}
            Icon={AiOutlineCloudUpload}
            variant="contained"
            handleClick={handleUpload}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

// function HandleStudents() {
//   const filetypes: string[] = [
//     ".csv",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     "application/vnd.ms-excel.csv",
//     ".xlsx",
//     ".xls",
//     ".csv",
//   ];
//   if (students.file && filetypes.includes(students.file.type)) {
//     dispatch(AddStudentsThunk(students));
//   } else {
//     dispatch(
//       ResponseFail(
//         "Please choose file or selected file invalid, [.xlsx, .xls, .csv] Required"
//       )
//     );
//   }
// }
