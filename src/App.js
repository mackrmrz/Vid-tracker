import React, { Component } from 'react';
import './style/main.scss';
import axios from 'axios';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@material-ui/core';

import CountryInfoBox from './components/infoBoxes';
import Map from './components/map';

class App extends Component {
  constructor() {
    super();

    this.state = {
      countries: [],
      country: 'worldwide',
      errorMSG: ''
    };

    this.selectCountries = this.selectCountries.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
  }

  handleChangeCountry = (event) => {
    console.log('Looking into the select', event.target.value);
    this.setState({
      country: event.target.value
    });

    const url =
      this.state.country === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${this.state.country}`;

    axios.get(url)
      .then(res => console.log("world or country data", res))
      .catch(error => console.log(error))
  };

  selectCountries = () => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        this.setState({
          countries: res.data
        });
      })
      .catch((error) => console.log(error));
  };

  mappingCountries = () => {
    return this.state.countries.map((country) => {
      return <MenuItem value={country.country}>{country.country}</MenuItem>;
    });
  };

  componentDidMount() {
    this.selectCountries();
  }
  render() {
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
              <CountryInfoBox title="Cases" cases="77" total="100" />
              <CountryInfoBox title="Recovery" cases="177" total="1000" />
              <CountryInfoBox title="Deaths" cases="666" total="3666" />
            </div>
          </div>
          <div className="app-map">
            <div className="app-map__wrapper">
              <Map />
            </div>
          </div>
        </div>
        <div className="app-contianer__right">
          <Card className="app-live">
            <CardContent className="app-live__content">
              <h3>Cases by country live</h3>
              <h3>world wide new cases</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
