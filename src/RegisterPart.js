import React from "react";
import "./RegisterPart.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registKeyword } from "./features/keywords/keywordsSlice";
function RegisterPart() {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = async(event) => {
    // formのデフォルト動作をキャンセル
    event.preventDefault();

    await dispatch(registKeyword({ keyword }));
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
    </div>
  );
}

export default RegisterPart;
