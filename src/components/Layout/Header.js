import { Container, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import TranslateIcon from "@material-ui/icons/Translate";
import React, { useCallback, useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { Context } from "../../config/HOC/locale";
import options from "../../mock/langlist.json";
import { getMyWeatherReport } from "../../services/weather.service";
import useStyles from "./layout.style";

export default function HeaderAppBar({ status }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [temperature, setTemperature] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
  const classes = useStyles();
  const intl = useIntl();
  const context = useContext(Context);
  const selected = options.find((option) => option.code === context.locale);
  const open = Boolean(anchorEl);

  const fetchData = useCallback(async (data) => {
    setLoader(true);
    const resp = await getMyWeatherReport();
    setTemperature(resp);
    setLoader(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, status]);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.headerButton}
          onClick={handleClick}
          startIcon={<TranslateIcon />}
        >
          {selected.label}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          {options.map((item, index) => (
            <MenuItem
              onClick={(event) => {
                context.selectLanguage(item.code);
                handleClick(event, index);
                handleClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
        <Container className={classes.headerBuffer} />
        <Typography variant="h6">{intl.formatMessage({ id: "weather" })}</Typography>
        <div className={classes.weatherContainer}>
          <div classes={classes.weatherContent}>
            <Container>
              <img
                alt="sky"
                className={classes.icon}
                src={` http://openweathermap.org/img/wn/${temperature?.icon}@2x.png`}
              />
            </Container>
            <Container className={classes.tempContent}>
              <Typography variant="p">
                {temperature?.temp}
                <Typography variant="sup">
                  {"\u00B0"}
                  {"c"}
                </Typography>
              </Typography>
              <Typography>{temperature?.name}</Typography>
            </Container>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
