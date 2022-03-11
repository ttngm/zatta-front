import React from "react";
import "./WordListPart.css";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  fetchKeywords,
  selectAllKeywords,
} from "./features/keywords/keywordsSlice";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const headCells = [
  {
    id: "No",
    numeric: false,
    disablePadding: true,
    label: "No",
  },
  {
    id: "キーワード",
    numeric: false,
    disablePadding: false,
    label: "キーワード",
  },
  { id: "登録日時", numeric: false, disablePadding: false, label: "登録日時" },
];

/**
 * デーブルヘッダー
 * @param {*} props
 * @returns
 */
function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all keywords" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.id}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 型チェック
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  title: {
    flex: "1 1 100%",
  },
  toolbar: {
    backgroundColor: "#dddddd",
  },
}));

/**
 * テーブル上部のツールバー
 * @param {*} props
 * @returns
 */
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selected, onDeleteClick } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        キーワード一覧
      </Typography>
      <Tooltip title="Delete" disabled={selected.length === 0}>
        <IconButton aria-label="delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

// 型チェック
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

/**
 * キーワード一覧
 * @returns 
 */
const WordListPart = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const keywords = useSelector(selectAllKeywords);
  useEffect(() => {
    dispatch(fetchKeywords());
  }, []);

  // ### テーブル行データ作成
  function createData(id, keyword, date) {
    return { id, keyword, date };
  }
  let rows = [];
  keywords.map((keyword, index) =>
    rows.push(createData(index + 1, keyword.keyword, "xxxx/xx/xx"))
  );

  // ### チェック処理
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.keyword);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;


  // ### ページング
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // ### snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  /**
   * キーワード削除処理
   */
  const deleteKeyword = () => {
    console.log(selected);
    fetch("/keyword", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keywords: selected,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // 選択状態をリセット
          setSelected([]);
          // 削除後のキーワード一覧でstoreを更新
          dispatch(fetchKeywords());
          setOpen(false);
          setMessage("削除成功");
          setSeverity("success");
          setOpen(true);
        },
        (error) => {
          setOpen(false);
          setMessage("削除失敗");
          setSeverity("warning");
          setOpen(true);
        }
      );
  };

  return (
    <div className="wordList-part">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            selected={selected}
            onDeleteClick={deleteKeyword}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
              />
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.keyword);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.keyword)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.keyword}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.keyword}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

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
    </div>
  );
};

export default WordListPart;
