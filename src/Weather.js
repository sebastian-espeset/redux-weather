import {React, useEffect, useState} from "react";
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

const timeLinesURL=`https://api.tomorrow.io/v4/timelines`;
const apikey = `ETMKiJgnxZ8Q4Nr2QX0kpMA04v5Sfn1f`;
const location =['41.8781, 87.6298'];
const fields = ["temperature","weatherCode"];
const units = "imperial";
const timesteps=["1d"];
const now=moment.utc();
const startTime=moment.utc(now).add(0,"minutes").toISOString();
const endTime=moment.utc(now).add(7,"days").toISOString();
const timezone=`America/Chicago`;

const getTimeLineParameters = queryString.stringify({
  apikey,
  location,
  fields,
  units,
  timesteps,
  startTime,
  endTime,
  timezone,
}, {arrayFormat:"comma"});




function Weather() {
  const [weather, setWeather]=useState([])
  const classes = useStyle();
  useEffect(() => {
      axios.get(timeLinesURL+"?"+getTimeLineParameters)
      .then(res=>setWeather(res.data.data.timelines[0].intervals))
      .catch(err=>console.log(err))
  }, [])
  console.log(weather)
  return (
    <>
      <AppBar  color="secondary" justify="center">
        <Toolbar >
            <Typography variant="h4"> Weather app</Typography>

        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={4} justify="center">
          {weather.length>1 ? weather.map((day) => {
            return (
              <Card className={classes.fullCard}>
                <Grid item >
                  <Typography variant="title1"></Typography>
                  <Typography variant="subtitle1">{day.values.weatherCode}</Typography>
                  <Typography variant="subtitle2"> high of {day.values.temperature}</Typography>
                </Grid>
              </Card>
            );
          }) : <div>"nothing to see here"</div>}
        </Grid>
      </Container>
    </>
  );
}

export default Weather;
