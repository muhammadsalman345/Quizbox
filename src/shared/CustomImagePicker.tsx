import { Stack, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CustomIconButton } from "../components";

interface IProps {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  removeImage?: () => void;
}

export default function CustomImagePicker({
  handleChange,
  label,
  removeImage,
}: IProps) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<any>(null);
  useEffect(() => {
    if (coverImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(coverImage);
      fileReader.addEventListener("load", (e) => {
        setCoverPreview(e.target?.result);
      });
    }
  }, [coverImage]);
  return (
    <Stack spacing={1}>
      {coverPreview && (
        <Stack
          minHeight="250px"
          overflow="hidden"
          maxHeight="500px"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <img
            style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
            src={coverPreview}
            alt="cover-preview-image"
          />
        </Stack>
      )}
      <input
        id="cover-file-input"
        style={{ display: "none" }}
        type="file"
        placeholder="course cover image"
        multiple={false}
        accept="image/*.jpg|*.png"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChange && handleChange(e);
          if (e.target.files && e.target.files.length > 0) {
            setCoverImage(e.target.files[0]);
          } else {
            setCoverImage(null);
            setCoverPreview(null);
          }
        }}
      />
      <Typography
        component="label"
        color="primary"
        htmlFor="cover-file-input"
        sx={(theme) => ({
          padding: theme.spacing(1),
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        {label ? label : "Choose Image"}
        <AiOutlineCloudUpload style={{ marginLeft: "20px" }} />
      </Typography>
      {removeImage && coverImage && coverPreview && (
        <CustomIconButton
          title="Remove"
          props={{ style: { color: "red", borderColor: "red" } }}
          handleClick={() => {
            removeImage();
            setCoverImage(null);
            setCoverPreview(null);
          }}
        />
      )}
    </Stack>
  );
}
