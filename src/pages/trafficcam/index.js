import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faCloudRain,
  faCloud,
  faCloudShowersHeavy
} from '@fortawesome/free-solid-svg-icons';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import useStyles from './styles';
import cameraLocation from '../../_Mocks/mock.json';

const selector = ({ store }) => ({
  trafficImagesList: store.trafficImagesList,
  areaDataList: store.areaDataList,
  forecastList: store.forecastList,
  isLoading: store.isLoading,
  isLoadingWF: store.isLoadingWF,
  objPosition: store.objPosition
});

export default function Album() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { trafficImagesList, forecastList } = useSelector(selector);
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState([]);
  const [image, setImage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  useEffect(() => {
    dispatch(actions.requestTrafficImages.request(''));
  }, [dispatch]);

  useEffect(() => {
    const requstDate =
      '/?date_time=' +
      moment(selectedDate).format('YYYY-MM-DD') +
      'T' +
      moment(selectedTime).format('HH:mm:ss');
    dispatch(actions.requestTrafficImages.request(requstDate));
  }, [dispatch, selectedDate, selectedTime]);

  useEffect(() => {
    const requstDate =
      '/?date_time=' +
      moment(selectedDate).format('YYYY-MM-DD') +
      'T' +
      moment(selectedTime).format('HH:mm:ss');
    dispatch(actions.requestWeatherForecast.request(requstDate));
    mapLocation();
  }, [trafficImagesList, selectedDate, selectedTime, dispatch]);

  useEffect(() => {
    if (location.length > 0 && location.length > 0) {
      const forecast = forecastList[0].forecasts.find((item) => {
        return item.name === location.neighborhood;
      });
      let weatherIcon = faCloud;
      weatherIcon =
        forecast.forecast.toLowerCase().indexOf('rain') > 0
          ? faCloudRain
          : weatherIcon;
      weatherIcon =
        forecast.forecast.toLowerCase().indexOf('thunder') > 0
          ? faCloudShowersHeavy
          : weatherIcon;
      const weatherObj = {
        forecast: forecast.forecast,
        icon: weatherIcon,
        neighborhood: location.neighborhood
      };
      setWeather(weatherObj);
    }
  }, [location, forecastList]);

  const mapLocation = () => {
    setLocation([]);
    trafficImagesList.length > 0 &&
      trafficImagesList[0].cameras.forEach((item) => {
        // const latLng = item.location.latitude + "," + item.location.longitude;
        // const appKey = "AIzaSyAEywNgZGKwp4ghKoBOcFvZrj5lfvjfXYI";
        // dispatch(actions.requestLocation.request(latLng, appKey));
        const location = cameraLocation.find((itemLocation) => {
          return (
            itemLocation.location.latitude === item.location.latitude &&
            itemLocation.location.longitude === item.location.longitude
          );
        });
        const locationGis = {
          street: location ? location.street : '',
          neighborhood: location ? location.neighborhood : '',
          camera_id: item.camera_id
        };
        setLocation((prev) =>
          [...prev, locationGis].sort((a, b) =>
            a.neighborhood + a.street > b.neighborhood + b.street ? 1 : -1
          )
        );
      });
  };

  // useEffect(()=>{
  //   if (objPosition.length > 0 ){
  //
  //       const street = objPosition[0].address_components.find(
  //         item =>{return item.types[0] === "route"}
  //       )
  //       const neighborhood = objPosition[0].address_components.find(
  //         item =>{return item.types[0] === "neighborhood"}
  //       )
  //     const locationGis = {"street":street?street.long_name:"", "location": neighborhood?neighborhood.long_name:"" };
  //     setLocation((prev) => ([ ...prev, locationGis]));
  //   }
  // }, [objPosition])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const changeInfo = (neighborhood, street, camaraId) => {
    const forcastList = forecastList[0].forecasts;
    const forecast = forcastList.find((item) => {
      return item.area === neighborhood;
    });
    const image = trafficImagesList[0].cameras.find((item) => {
      return item.camera_id === camaraId;
    });
    // setWeather(forecast?forecast.forecast:"");
    let weatherIcon = faCloud;
    weatherIcon =
      forecast.forecast.toLowerCase().indexOf('rain') > 0
        ? faCloudRain
        : weatherIcon;
    weatherIcon =
      forecast.forecast.toLowerCase().indexOf('thunder') > 0
        ? faCloudShowersHeavy
        : weatherIcon;
    const weatherObj = {
      forecast: forecast ? forecast.forecast : 'Cloudy',
      icon: weatherIcon,
      neighborhood: neighborhood
    };
    setWeather(weatherObj);

    const imageObj = {
      imageId: image.image,
      neighborhood: neighborhood,
      street: street,
      timestamp: image.timestamp
    };
    const emptyImage = {
      imageId: '',
      neighborhood: '',
      street: '',
      timestamp: ''
    };
    setImage(camaraId ? imageObj : emptyImage);
  };

  return (
    <Container>
      <Grid container justify="space-between" spacing={5}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12}>
            <Grid container justify="space-between" lg={8} xs={12} spacing={5}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Select Date"
                  value={selectedDate}
                  maxDate={new Date()}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Select Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid container spacing={5} className={classes.locationContainer}>
          <Grid item lg={8} xs={12}>
            <Paper>
              <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                  <TableBody>
                    {location && location.map && location.length ? (
                      location.map((item, index) => {
                        return (
                          <TableRow
                            hover
                            onClick={() =>
                              changeInfo(
                                item.neighborhood,
                                item.street,
                                item.camera_id
                              )
                            }
                          >
                            <TableCell>
                              {item.neighborhood} - {item.street}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableContainer type="desktop">
                        <FontAwesomeIcon icon={faSpinner} size="2x" />
                      </TableContainer>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card className={classes.weatherRoot}>
              <div className={classes.weatherDetails}>
                <CardContent className={classes.weatherContent}>
                  <Typography component="h5" variant="h5">
                    {weather.forecast}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {weather.neighborhood}
                  </Typography>
                </CardContent>
              </div>
              <CardMedia className={classes.weatherMedia}>
                <FontAwesomeIcon
                  icon={weather.icon}
                  size="4x"
                  className={classes.weatherIcon}
                />
              </CardMedia>
            </Card>
          </Grid>
        </Grid>

        <Grid item lg={8} xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {image.neighborhood
                    ? image.neighborhood.substring(0, 1)
                    : 'P'}
                </Avatar>
              }
              title={
                image.neighborhood
                  ? image.neighborhood + ' - ' + image.street
                  : 'Please select a location'
              }
              subheader={image.timestamp}
            />
            <CardActionArea>
              <CardMedia
                className={classes.cameraMedia}
                image={image.imageId}
                title="Cameras Information"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
