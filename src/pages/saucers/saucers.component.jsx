import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";
import columns from "./config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "absolute",
  },
  formControl: {
    minWidth: 200,
  },
  searchAndOthers: {
    marginTop: "70px",
    marginLeft: "20px",
    margin: theme.spacing(1),
  },

  rootTable: {
    width: "100%",
    marginLeft: "20px",
    maxWidth: "1850px",
  },
  tableContainer: {
    maxHeight: 540,
    maxWidth: "1850px",
  },
  addButton: {
    color: "white",
    backgroundColor: "#00A891",
    position: "relative",
  },
  editButton: {
    color: "white",
    backgroundColor: "#FF9900",
    position: "relative",
  },
  deleteButton: {
    color: "white",
    backgroundColor: "red",
    position: "relative",
    marginLeft: "5px",
  },
  images: {
    width: "100px",
    height: "100px",
    borderRadius: "5px",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const UseData = () => {
  const [saucers, setSaucers] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("saucers")
      .onSnapshot((snapshot) => {
        const listSaucers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        listSaucers.sort((a, b) => (a.name > b.name ? 1 : -1));
        setSaucers(listSaucers);
        console.log(listSaucers);
      });
    return () => unsubscribe();
  }, []);
  return [saucers, setSaucers];
};

const CountDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("saucers")
      .get()
      .then((snapshot) => setDocuments(snapshot.size));
  }, []);
  return documents;
};

export default function Saucers() {
  const history = useHistory();
  const classes = useStyles();
  const totalDocuments = CountDocuments();

  const [listUsers, setListUsers] = UseData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <h1 style={{ textAlign: "center" }}> Saucers</h1>
      <Paper className={classes.rootTable}>
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      backgroundColor: "#67bfb1",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {listUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <TableBody>
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.ingredients}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {"Q" + item.price}
                      </StyledTableCell>
                      <StyledTableCell>
                        <img
                          src={item.photoUrl}
                          alt=""
                          className={classes.images}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={listUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
