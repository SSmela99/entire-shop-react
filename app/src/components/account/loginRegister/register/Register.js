import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, withRouter, useHistory } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Checkbox,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";

const Register = ({ loggedIn, logout }) => {
  const classes = useStyles();
  let history = useHistory();

  const [check, setCheck] = useState(false);

  //registration states
  const [regUsername, setRegUsername] = useState("");
  const [regFirstname, setRegFirstname] = useState("");
  const [regLastname, setRegLastname] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regInfo, setRegInfo] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const registered = {
      username: regUsername,
      firstname: regFirstname,
      lastname: regLastname,
      email: regEmail.toLowerCase(),
      password: regPassword.trim(),
    };

    const sendData = await axios.post(
      "http://localhost:4000/account/register",
      registered
    );

    const { data } = sendData;

    if (data.success === true) {
      console.log(data.success);
      history.push("/account/login");
    } else {
      console.log(Object.keys(data.keyValue).toString());
      setRegInfo(Object.keys(data.keyValue).toString());
    }

    setRegUsername("");
    setRegFirstname("");
    setRegLastname("");
    setRegEmail("");
    setRegPassword("");
    setCheck(false);
  };

  return (
    <>
      {loggedIn ? (
        <Box className={classes.account}>
          <Typography variant="subtitle1">
            sesja w której jesteś posiada już zalogowanego użytkownika,&nbsp;
            <Link
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              to="/account/login"
              onClick={() => logout()}
            >
              Wyloguj się!
            </Link>
          </Typography>
        </Box>
      ) : (
        <div className={classes.account}>
          <form onSubmit={onSubmit} className={classes.form} autoComplete="off">
            <Typography variant="h6" className={classes.title}>
              Rejestracja
            </Typography>
            <TextField
              name="username"
              label="username"
              variant="outlined"
              required
              onChange={(e) => setRegUsername(e.target.value)}
              value={regUsername}
              className={classes.input}
              placeholder="username"
              autoComplete="new-password"
            />
            <TextField
              name="firstname"
              label="imię"
              variant="outlined"
              required
              onChange={(e) => setRegFirstname(e.target.value)}
              value={regFirstname}
              className={classes.input}
              placeholder="imię"
              autoComplete="new-password"
            />
            <TextField
              name="lastname"
              label="nazwisko"
              variant="outlined"
              required
              onChange={(e) => setRegLastname(e.target.value)}
              value={regLastname}
              className={classes.input}
              placeholder="nazwisko"
              autoComplete="new-password"
            />
            <TextField
              name="email"
              label="e-mail"
              variant="outlined"
              required
              onChange={(e) => setRegEmail(e.target.value)}
              value={regEmail}
              className={classes.input}
              placeholder="e-mail"
              autoComplete="new-password"
            />
            <TextField
              name="password"
              label="hasło"
              variant="outlined"
              required
              onChange={(e) => setRegPassword(e.target.value)}
              value={regPassword}
              className={classes.input}
              placeholder="hasło"
              type="password"
            />
            {regInfo.length !== 0 && (
              <Typography style={{ margin: "10px", color: "red" }}>
                Podany {regInfo} istnieje już w bazie danych
              </Typography>
            )}
            <div className={classes.checkbox}>
              <Checkbox
                required
                checked={!check ? false : true}
                onClick={() => setCheck(!check)}
                color="primary"
                style={{ height: "30px" }}
              />
              <Typography variant="subtitle2" color="textSecondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                iaculis condimentum aliquet. Sed tempus nisi dapibus finibus
                placerat. Donec sit amet sem quis justo commodo varius id at
                ipsum. Cras commodo sollicitudin velit, ac viverra tellus
                pulvinar ut.
              </Typography>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Zarejestruj się
            </Button>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ padding: "20px 0" }}
            >
              Masz już konto?&nbsp;
              <Link to="/account/login">Zaloguj się</Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
};

Register.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

export default withRouter(Register);
