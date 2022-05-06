import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, TablePagination } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useIntl } from "react-intl";

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

const headers = ["Title", "Description", "Actions"];
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  listContainer: {
    marginTop: "2rem",
    padding: "0rem",
  },
  action: {
    width: "3rem",
  },
  edit: {
    color: theme.palette.warning.light,
    cursor: "pointer",
  },
  cursor: {
    cursor: "pointer",
  },
}));

export default function CustomizedTables({ onEdit, todoList = [], onDelete }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Container className={classes.listContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <StyledTableCell align="center">{h}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.length === 0 && (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={3}>
                  {intl.formatMessage({ id: "no-data-found" })}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {todoList.map((row) => (
              <StyledTableRow key={`${row.id}`}>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.action}>
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Container>
                      {" "}
                      <EditIcon
                        onClick={() => onEdit(row)}
                        className={classes.edit}
                      />{" "}
                    </Container>
                    <Container>
                      {" "}
                      <DeleteIcon
                        className={classes.cursor}
                        onClick={() => onDelete(row)}
                        color="error"
                      />{" "}
                    </Container>
                  </Container>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={}
          // rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
    </Container>
  );
}
