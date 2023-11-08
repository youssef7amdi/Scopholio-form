import {
  Stack,
  Typography,
  TextField,
  Box,
  Button,
  Chip,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

type inputs = {
  email: string;
  languages: string[];
  password: string;
  confirmPassword: string;
  topics: string[];
};

export default function Account() {
  const [addLanguage, setAddLanguage] = useState<boolean>(false);
  const [currentLanguages, setCurrentLanguages] = useState<string[]>([
    "Arabic",
    "English",
    "French",
    "Spanish",
  ]);
  const [addNewPassword, setAddNewPassword] = useState<boolean>(false);
  const [addTopics, setAddTopics] = useState<boolean>(false);
  const [showcasesTopics, setShowcasesTopics] = useState<string[]>([
    "Technology",
    "Medicine",
  ]);

  const form = useForm<inputs>({
    defaultValues: {
      email: "",
      languages: [],
      password: "",
      confirmPassword: "",
      topics: [],
    },
    mode: "onBlur",
  });

  const {
    register,
    watch,
    handleSubmit,
    resetField,
    reset,
    formState,
    // control,
  } = form;

  const { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful } =
    formState;

  function onSubmit(data: inputs) {
    console.log(data);
    setCurrentLanguages((prev) => [...prev, ...data.languages]);
    setShowcasesTopics((prev) => [...prev, ...data.topics]);
    const newAccountInfo = {
      email: data.email,
      language: currentLanguages,
      password: data.password,
      topics: showcasesTopics,
    };

    console.log(newAccountInfo);
  }

  useEffect(
    function () {
      if (isSubmitSuccessful) {
        reset();
        setAddLanguage(false);
        setAddNewPassword(false);
        setAddTopics(false);
      }
    },
    [isSubmitSuccessful]
  );

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          // alignItems="center"
          spacing={{ xs: 1.5, sm: 2.5 }}
          mb={{ xs: 4, sm: 2 }}
        >
          <Typography
            variant="body2"
            component="div"
            width="120px"
            textAlign={{ sm: "right" }}
            fontWeight="bold"
            flexShrink={0}
          >
            Email Address
          </Typography>
          <TextField
            variant="outlined"
            type="email"
            label="Primary E-mail Address"
            size="small"
            sx={{
              maxWidth: "400px",
              minWidth: "150px",
              flexGrow: "1",
              backgroundColor: "white",
            }}
            {...register("email", {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Invalid Email Format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              style: {
                fontSize: "12px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "12px",
              },
            }}
          />
        </Stack>

        {/* Dialect Response */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          mb={{ xs: 4, sm: 2 }}
        >
          <Typography
            variant="body2"
            component="div"
            width="120px"
            textAlign={{ sm: "right" }}
            fontWeight="bold"
            flexShrink={0}
          >
            Dialect Response
          </Typography>
          <Stack spacing={1}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {addLanguage && (
                <TextField
                  variant="outlined"
                  select
                  label="Select Language"
                  size="small"
                  id="Languages"
                  sx={{
                    maxWidth: "200px",
                    flexGrow: "1",
                    backgroundColor: "white",
                  }}
                  {...register("languages", {
                    validate: {
                      isAlreadyChosen: (fieldValues) => {
                        const arr = fieldValues.map((value) =>
                          currentLanguages
                            .join(" ")
                            .toLowerCase()
                            .includes(value.toLowerCase())
                        );
                        return (
                          !arr.join(" ").includes("true") ||
                          "some Languages is already current"
                        );
                      },
                    },
                  })}
                  error={!!errors.languages}
                  helperText={
                    errors.languages?.message ||
                    "You Can choose one or more Language"
                  }
                  SelectProps={{
                    multiple: true,
                    value: watch("languages"),
                    renderValue: (selected) =>
                      (selected as string[]).map((item: string) => (
                        <Chip
                          key={item}
                          label={item}
                          variant="outlined"
                          sx={{
                            bgcolor: "white",
                            fontSize: "8px",
                            width: "40px",
                            height: "20px",
                            marginRight: "3px",
                          }}
                        />
                      )),
                  }}
                  InputProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                >
                  {["Arabic", "English", "Japanese"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option === "" ? "Select Language" : option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  resetField("languages");
                  setAddLanguage((prev) => !prev);
                }}
                disableElevation
                color="secondary"
                disableRipple
                sx={{
                  marginLeft: addLanguage ? "10px" : "0",
                  marginTop: addLanguage ? "5px" : "0",
                  textTransform: "capitalize",
                  fontSize: "13px",
                  fontWeight: "bold",
                  alignSelf: { xs: "flex-end", sm: "flex-start" },
                }}
              >
                {addLanguage ? "Cancel" : "Add Language"}
              </Button>
            </Stack>
            <Stack direction="row" rowGap={1} columnGap={1} flexWrap={"wrap"}>
              {currentLanguages?.length > 0 &&
                currentLanguages?.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                    onDelete={() =>
                      setCurrentLanguages((prev) =>
                        prev.filter((item) => item !== language)
                      )
                    }
                  />
                ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Password */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          mb={{ xs: 4, sm: 2 }}
          minHeight="73px"
        >
          <Typography
            variant="body2"
            component="div"
            width="120px"
            textAlign={{ sm: "right" }}
            fontWeight="bold"
            flexShrink={0}
          >
            Password
          </Typography>
          {addNewPassword && (
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                type="password"
                label="Password"
                size="small"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password should be less than 10 Chars",
                  },
                  minLength: {
                    value: 7,
                    message: "Password should be more than 7 Chars",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,10}$/g,
                    message: `Must contain upper & lower case & number`,
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  maxWidth: "400px",
                  flexGrow: "1",
                  backgroundColor: "white",
                }}
                InputProps={{
                  style: {
                    fontSize: "12px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "12px",
                  },
                }}
              />
              <TextField
                variant="outlined"
                type="password"
                label="Confirm Password"
                size="small"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "This field is Required",
                  },
                  validate: {
                    matchedPassword: (fieldValue) =>
                      fieldValue === watch("password") ||
                      "Passwords do not match.",
                  },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{
                  maxWidth: "400px",
                  flexGrow: "1",
                  backgroundColor: "white",
                }}
                InputProps={{
                  style: {
                    fontSize: "12px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: "12px",
                  },
                }}
              />
            </Stack>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setAddNewPassword((prev) => !prev);
              resetField("password");
              resetField("confirmPassword");
            }}
            disableElevation
            color="secondary"
            disableRipple
            sx={{
              textTransform: "capitalize",
              fontSize: "13px",
              fontWeight: "bold",
              alignSelf: addNewPassword ? "flex-end" : "flex-start",
              color: "black",
            }}
          >
            {addNewPassword ? "Cancel" : "Set New Password"}
          </Button>
        </Stack>

        {/* SMS - based OTP */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          mb={{ xs: 4, sm: 2 }}
        >
          <Typography
            variant="body2"
            component="div"
            width="120px"
            textAlign={{ sm: "right" }}
            fontWeight="bold"
            flexShrink={0}
          >
            SMS-based OTP
          </Typography>
          <Box>
            <Typography
              variant="body2"
              component="p"
              maxWidth="400px"
              fontSize="12px"
            >
              Use your mobile phone to receive a text message with time-based
              OTPs to securely sign in to your Scofolio account.
            </Typography>
            <Button
              variant="contained"
              size="small"
              disableElevation
              color="secondary"
              disableRipple
              sx={{
                textTransform: "capitalize",
                fontSize: "13px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Setup Now
            </Button>
          </Box>
        </Stack>

        {/* Add Topics */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          mb={{ xs: 4, sm: 2 }}
        >
          <Typography
            variant="body2"
            component="div"
            width="120px"
            textAlign={{ sm: "right" }}
            fontWeight="bold"
            flexShrink={0}
          >
            Dialect Response
          </Typography>
          <Stack spacing={1}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {addTopics && (
                <TextField
                  variant="outlined"
                  select
                  label="Select Topic"
                  size="small"
                  id="topics"
                  sx={{
                    maxWidth: "200px",
                    flexGrow: "1",
                    backgroundColor: "white",
                  }}
                  {...register("topics", {
                    validate: {
                      isAlreadyChosen: (fieldValues) => {
                        const arr = fieldValues.map((value) =>
                          showcasesTopics
                            .join(" ")
                            .toLowerCase()
                            .includes(value.toLowerCase())
                        );
                        return (
                          !arr.join(" ").includes("true") ||
                          "some Topics is already current"
                        );
                      },
                    },
                  })}
                  error={!!errors.topics}
                  helperText={
                    errors.topics?.message || "You Can choose one or more Topic"
                  }
                  SelectProps={{
                    multiple: true,
                    value: watch("topics"),
                    renderValue: (selected) =>
                      (selected as string[]).map((item: string) => (
                        <Chip
                          key={item}
                          label={item}
                          variant="outlined"
                          sx={{
                            bgcolor: "white",
                            fontSize: "8px",
                            width: "40px",
                            height: "20px",
                            marginRight: "3px",
                          }}
                        />
                      )),
                  }}
                  InputProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                >
                  {[
                    "Health Care",
                    "Technology",
                    "Education",
                    "Medicine",
                    "Communication",
                    "Programming",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option === "" ? "Select Topic" : option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  resetField("topics");
                  setAddTopics((prev) => !prev);
                }}
                disableElevation
                color="secondary"
                disableRipple
                sx={{
                  marginLeft: addTopics ? "10px" : "0",
                  marginTop: addTopics ? "5px" : "0",
                  textTransform: "capitalize",
                  fontSize: "13px",
                  fontWeight: "bold",
                  alignSelf: { xs: "flex-end", sm: "flex-start" },
                }}
              >
                {addTopics ? "Cancel" : "Add Topic"}
              </Button>
            </Stack>
            <Stack direction="row" rowGap={1} columnGap={1} flexWrap={"wrap"}>
              {showcasesTopics?.length > 0 &&
                showcasesTopics?.map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                    onDelete={() =>
                      setShowcasesTopics((prev) =>
                        prev.filter((item) => item !== topic)
                      )
                    }
                  />
                ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Button Apply */}
        <Box textAlign={{ xs: "center", sm: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            sx={{
              fontSize: "12px",
              color: "white",
              textTransform: "capitalize",
              width: "150px",
              height: "45px",
            }}
          >
            Apply Changes
          </Button>
        </Box>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
}
