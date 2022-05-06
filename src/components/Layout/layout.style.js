import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackroot: {
    position: "fixed",
    bottom: 0,
  },
  offline: {
    backgroundColor: "red",
  },
  online: {
    backgroundColor: "green",
  },
  headerBuffer: {
    flexGrow: 1,
  },
  weatherContainer: {
    padding: 0,
    color: theme.palette.common.white,
    textAlign: "right",
  },
  weatherContent: {
    display: "flex",
  },
  tempContent: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  icon: {
    height: "3rem",
  },
}));

export default useStyles;
