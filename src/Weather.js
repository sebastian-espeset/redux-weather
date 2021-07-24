import {React, useEffect} from "react";
import {
  Grid,
  Paper,
  Container,
  makeStyles,
  Card,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {Cloud, WbSunny, AcUnit} from "@material-ui/icons";
import axios from 'axios';

const queryString=require("query-string");
const moment=require("moment"); 
const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
  "Sunday",
];
const useStyle = makeStyles((theme) => ({
  fullCard: {
    display: "block",
    width: "15vw",
    height: "15vw",
    padding: "10px",
  },
}));
const URLWithAuth=`https://api.tomorrow.io/v4/locations?apikey=ETMKiJgnxZ8Q4Nr2QX0kpMA04v5Sfn1f`;
const locationChi = [41.8757,87.6243];
const fields = ["temperature","cloudBase"];
const units = "imperial";
const timesteps=["1d","2d","3d","4d","5d","6d","7d"];
const now=moment.utc();
const startTime=moment.utc(now).add(0,"minutes").toISOString();
const endTime=moment.utc(now).add(7,"days").toISOString();
const timeZone=`America/Chicago`;



function Weather() {
  const classes = useStyle();
  useEffect(() => {
      axios.get(URLWithAuth)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err))
  }, [])
  return (
    <>
      <AppBar  color="secondary" justify="center">
        <Toolbar >
            <Typography variant="h4"> Weather app</Typography>

        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={2} justify="center">
          {daysList.map((day) => {
            return (
              <Card className={classes.fullCard}>
                <Grid item >
                  <Typography variant="title1">{day}</Typography>
                  <Typography variant="subtitle1">Some weather data</Typography>
                  <Typography variant="subtitle2"> high of 72°</Typography>
                  <Typography variant="subtitle2"> low of 52°</Typography>
                  <WbSunny/>/<Cloud/>
                </Grid>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Weather;
