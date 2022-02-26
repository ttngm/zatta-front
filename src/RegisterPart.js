import React from "react";
import "./RegisterPart.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { registKeyword } from "./features/keywords/keywordsSlice";
function RegisterPart() {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleSubmit = async (event) => {
    // formのデフォルト動作をキャンセル
    event.preventDefault();

    let resultAction = await dispatch(registKeyword({ keyword }));
    if (registKeyword.fulfilled.match(resultAction)) {
      setOpen(false);
      setMessage("登録成功");
      setSeverity("success");
      setOpen(true);
    } else if (registKeyword.rejected.match(resultAction)) {
      setOpen(false);
      setMessage(resultAction.payload);
      setSeverity("warning");
      setOpen(true);
    }
    // fetch("/keyword", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     keyword: keyword,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  };

  return (
    <div className="register-part">
      <u>
        <h1>キーワード登録</h1>
      </u>

      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="word"
            varient="outlined"
            onChange={handleChange}
          />
          <Button
            type="submit"
            value="keyword"
            variant="contained"
            color="primary"
          >
            登録
          </Button>
        </form>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RegisterPart;
