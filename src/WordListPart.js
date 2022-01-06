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
    // 削除API
    console.log("delete:" + keyword);
  };

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
    </div>
  );
};

export default WordListPart;
