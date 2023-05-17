import {
  Divider,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QuestionsModel, {
  CreateQuestionDto,
} from "../../../model/QuestionsModel";
import { generateId } from "../../../utils";
import { CustomIconButton } from "../../../components";
import { BiEdit } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineAttachment } from "react-icons/md";

interface IProps {
  question: QuestionsModel;
  index: number;
  isEditing?: boolean;
  handleDelete?: (questionId: string) => void;
  handleEdit?: () => void;
}
export default function QuestionInfoCard({
  question,
  index,
  isEditing,
  handleDelete,
  handleEdit,
}: IProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  return (
    <Stack
      padding={1}
      width="100%"
      boxShadow={(theme) => theme.shadows[1]}
      bgcolor={(theme) => theme.palette.common.white}
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
      >
        <Typography variant="caption">{index.toString()}</Typography>
        <Typography variant="body2">{question.statement}</Typography>
        <Stack flex={1} />
        {question.figure && <MdOutlineAttachment fontSize="small" />}
        {isEditing && (
          <IconButton
            color="error"
            onClick={() =>
              handleDelete ? handleDelete(question.questionId) : () => {}
            }
            size="small"
          >
            <CiCircleRemove fontSize="small" />
          </IconButton>
        )}
        {handleEdit && (
          <IconButton onClick={handleEdit} size="small">
            <BiEdit fontSize="small" />
          </IconButton>
        )}
      </Stack>
      <Divider />
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        justifyContent="flex-start"
      >
        {question.options.map((answer, i) => (
          <Stack key={generateId()}>
            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              name={question.questionId}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={1}
              >
                <Radio name={question.questionId} value={answer} size="small" />
                <Typography variant="body2">{answer}</Typography>
              </Stack>
            </RadioGroup>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
