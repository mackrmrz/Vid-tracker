import React, { Component } from 'react';
import './style/main.scss';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@material-ui/core';

//COMPONENTS
import CountryInfoBox from './components/infoBoxes';
import Map from './components/map';
import Table from './components/table';
import LineGraph from './components/theGraph';

class App extends Component {
  constructor() {
    super();

    this.state = {
      countries: [],
      country: 'worldwide',
      countryInfo: [],
      errorMSG: '',
      mapCenter:{ lat: 34.80746, lng: -40.4796 },
      // mapCenter: {},
      mapZoom: 3,
      mapCountries: [],
      casesType: 'cases'
    };

    this.selectCountries = this.selectCountries.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
  }

  handleChangeCountry = async (event) => {
    console.log('Checking Event', event.target.value);
    const countryCode = event.target.value;

    const URL =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        // : null;
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await axios
      .get(URL)
      //.then(res => console.log('All', res.data, 'CountryInfo', res.data.countryInfo, 'Lat', res.data.countryInfo.lat))
      .then(res => {
        // console.log("MAPCENTER", {lat:res.data.countryInfo.lat, long:res.data.countryInfo.long});
        this.setState({
          country: countryCode,
          countryInfo: res.data,
          mapCenter: { lat:res.data.countryInfo.lat, lng:res.data.countryInfo.long} || { lat: 34.80746, lng: -40.4796 },
          mapZoom: 4
        })
      })
      .catch((error) => console.log(`${error}`));
  };

  selectCountries = () => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        this.setState({
          countries: res.data,
          mapCountries: res.data
        });
      })
      .catch((error) => console.log(error));
  };

  mappingCountries = () => {
    return this.state.countries.map((country) => {
      return <MenuItem value={country.country}>{country.country}</MenuItem>;
    });
  };

  getWorldInfo = () => {
    axios
      .get('https://disease.sh/v3/covid-19/all')
      .then((res) =>
        this.setState({
          countryInfo: res.data
        })
      )
      .catch((error) => console.log('ERROR', error));
  };

  componentDidMount() {
    this.selectCountries();
    this.getWorldInfo();
  }
  render() {
    const {
      cases,
      todayCases,
      deaths,
      recovered,
      todayRecovered,
      todayDeaths,
      index
    } = this.state.countryInfo;
    return (
      <div className="app">
        <div className="app-container__left">
          <div className="app-header__header">
            <h1>Covid-19 Tracker</h1>
            <FormControl>
              <Select
                varient="outlined"
                value={this.state.country}
                onChange={this.handleChangeCountry}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {this.mappingCountries()}
              </Select>
            </FormControl>
          </div>
          <div className="app-infoBoxes">
            <div className="app-infoBoxes__wrapper">
              <CountryInfoBox
                title="Covid Cases"
                cases={todayCases}
                total={cases}
              />
              <CountryInfoBox
                title="Recovered"
                cases={todayRecovered}
                total={recovered}
              />
              <CountryInfoBox
                title="Deaths"
                cases={todayDeaths}
                total={deaths}
              />
            </div>
          </div>
          <div className="app-map">
            <div className="app-map__wrapper">
              <Map
                countries={this.state.mapCountries}
                casesType={this.state.casesType}
                center={this.state.mapCenter}
                zoom={this.state.mapZoom}
              />
            </div>
          </div>
        </div>
        <div className="app-contianer__right">
          <div className="app-live">
            <div className="app-live__content">
              <h3>Cases by country live</h3>
              <Table className="table" />
              <h3>world wide new cases</h3>
              <LineGraph />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
