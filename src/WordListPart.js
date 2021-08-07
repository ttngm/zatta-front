import React from "react";
import "./WordListPart.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import {
  fetchKeywords,
  selectAllKeywords,
} from "./features/keywords/keywordsSlice";

import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const WordListPart = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const keywords = useSelector(selectAllKeywords);

  useEffect(() => {
    dispatch(fetchKeywords());
  }, []);

  const renderedKeywords = keywords.map((keyword) => (
    <ListItem key={keyword.id}>
      <ListItemText primary={keyword.keyword} />
    </ListItem>
  ));

  return (
    <div className="wordList-part">
      <u>
        <h1>キーワード一覧</h1>
      </u>
      <List>{renderedKeywords}</List>
    </div>
  );
};

export default WordListPart;
