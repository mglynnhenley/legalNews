import { useEffect, useState } from "react";
import { IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Email } from "@mui/icons-material";
import styles from "../styles/enterEmail.scss";
import { signUpToNewsletter } from "@/utils/dataService";
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function EmailInput() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ success: "", error: "" });

  useEffect(() => {}, [message]);

  const handleSubmit = async (event: any) => {
    event?.preventDefault(); // Prevents default refresh by the browser

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      setMessage({ success: "", error: "Ungültige E-Mail-Adresse" });
      return;
    }
    try {
      const signedUp = await signUpToNewsletter(email);

      if (signedUp?.ok) {
        setMessage({ success: "Erfolgreiche Anmeldung", error: "" });
        setEmail("");
      } else {
        setMessage({ success: "", error: "Anmeldung gescheitert" });
      }
    } catch (error) {
      setMessage({ success: "", error: "Ein Fehler ist aufgetreten" });
    }
  };

  const submitIfPressedEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };
  
  const hasError = !!message.error;
  const isSuccess = !!message.success;

  return (
    <div style={styles.enterEmailContainer}>
      {isSuccess && (
        <Alert
          severity="success"
          className="fixedAlert"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMessage({ ...message, success: "" });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            position: "fixed",
            bottom: "3vh",
            left: "32vw",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          {message.success}
        </Alert>
      )}
      <Paper
        component="form"
        className="email-form-container"
        onSubmit={handleSubmit}
      >
        <IconButton sx={{ p: "10px" }} aria-label="email">
          <Email htmlColor="#011a5f" />
        </IconButton>
        <TextField
          fullWidth
          id="filled-textarea"
          label="Abonniere unseren Newsletter"
          margin="dense"
          placeholder="Geben sie ihre E-Mail Adresse ein"
          size="small"
          variant="outlined"
          className="email-text-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={hasError}
          helperText={message.error}
          onKeyDown={submitIfPressedEnter}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SendIcon htmlColor="#011a5f" />
        </IconButton>
      </Paper>
    </div>
  );
}
