import React from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";
import MySpinner from "../components/MySpinner";
import Paper from "@material-ui/core/Paper";
import logo from "../images/404.png";

// function Copyright() {
//   return (
//     <Typography
//       variant="body2"
//       color="textSecondary"
//       style={{ textAlign: "center" }}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="/">
//         Short Url
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#414FAA",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  main: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function RedirectPage(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  async function goToUrl() {
    const response = await axios.get(`/api/url/${props.match.params.id}`);

    if (response.data.success) {
      window.location.replace(response.data.data);
    } else {
      console.log("url not found");
      setLoading(false);
    }
  }

  React.useEffect(() => {
    goToUrl();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        {loading ? (
          <div style={{ marginTop: 175 }}>
            <MySpinner />
          </div>
        ) : (
          <Paper
            style={{ height: "400px" }}
            elevation={5}
            variant="outlined"
            square
          >
            <div className={classes.paper}>
              <div style={{ marginTop: 5, padding: 30 }}>
                <div style={{ textAlign: "center" }}>
                  <img src={logo} width={150} />
                </div>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ textAlign: "center" }}
                  gutterBottom
                >
                  {
                    "Sorry the url you have entered doesn't exist or has already expired."
                  }
                </Typography>
              </div>
            </div>
          </Paper>
        )}
      </Container>
      {/* <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" style={{ textAlign: "center" }}>
            Sorry page not found
          </Typography>
          <Copyright />
        </Container>
      </footer> */}
    </div>
  );
}
