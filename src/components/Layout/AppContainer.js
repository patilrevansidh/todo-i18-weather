import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./layout.style";
import Header from "./Header";
const AppContainer = (props) => {
  const [status, setStatus] = useState("");
  const intl = useIntl();
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("offline", () => handleNetwork("offline"));
    window.addEventListener("online", () => handleNetwork("online"));
    return () => {
      window.removeEventListener("offline", handleNetwork);
      window.removeEventListener("online", handleNetwork);
    };
  }, []);

  const handleNetwork = (status) => {
    setStatus(status);
  };

  const handleClose = () => {
    setStatus("");
  };

  return (
    <>
      <Header status={status} />
      {props.children}
      {status && (
        <Snackbar
          classes={{ root: classes.snackroot }}
          open={!!status}
          autoHideDuration={1000}
          onClose={() => handleClose()}
        >
          <SnackbarContent
            classes={{ root: classes[status] }}
            message={
              <Typography>
                {status === "online"
                  ? intl.formatMessage({ id: "online-messages" })
                  : intl.formatMessage({ id: "offline-messages" })}
              </Typography>
            }
          />
        </Snackbar>
      )}
    </>
  );
};

export default AppContainer;
