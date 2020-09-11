import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function FormData() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState();
  const [message, setMessage] = React.useState();

  async function addUrl() {
    const response = await axios.post("/api/add", { url });

    if (response.data.success) {
      console.log(response.data);
      setOpen(true);
      setMessage(response.data.data);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ marginTop: 25 }}>
          Enter Url To Shorten
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="url"
            label="URL"
            name="url"
            autoComplete="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => addUrl()}
          >
            Submit
          </Button>
        </form>
        <br />
      </div>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        message={message}
        setUrl={setUrl}
      />
    </Container>
  );
}
