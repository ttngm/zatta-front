import React from "react";
import "./WordListPart.css";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  fetchKeywords,
  selectAllKeywords,
} from "./features/keywords/keywordsSlice";

import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: "#dddddd",
  },
  smallCell: {
    width: "10%",
  },
});

const WordListPart = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const keywords = useSelector(selectAllKeywords);

  useEffect(() => {
    dispatch(fetchKeywords());
  }, []);

  function createData(no, keyword, date) {
    return { no, keyword, date };
  }

  const rows = [];
  const renderedKeywords = keywords.map((keyword, index) =>
    rows.push(createData(index+1, keyword.keyword, "xxxx/xx/xx"))
  );

  const deleteKeyword = (keyword) => {
    fetch("/keyword", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch(fetchKeywords());
          setOpen(false);
          setMessage("削除成功");
          setSeverity("success");
          setOpen(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setOpen(false);
          setMessage("削除失敗");
          setSeverity("warning");
          setOpen(true);
        }
      );
  };

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="wordList-part">
      <u>
        <h1>キーワード一覧</h1>
      </u>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.smallCell}>No</TableCell>
              <TableCell>キーワード</TableCell>
              <TableCell>登録日時</TableCell>
              <TableCell className={classes.smallCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.keyword}>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.keyword}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteKeyword(row.keyword)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
};

export default WordListPart;
