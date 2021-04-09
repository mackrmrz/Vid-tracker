import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { buildChartData } from '../utils';
import numeral from "numeral";

class LineGraph extends Component {
  state = {
    graphData: {}
  };

  fetchGraphData = async () => {
    await axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then((res) => {
        console.log("GRAPH DATA", res.data);
        const formattingData = buildChartData(res.data);
        this.setState({
          graphData: formattingData
          //   graphData: res.data
        });
      })
      .catch((error) => console.log('ERROR', error));
  };

  componentDidMount() {
    this.fetchGraphData();
  }
  render() {
    return (
      <div className="line-graph">
        {this.state.graphData?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: 'rgba(204, 16, 52, 0.5)',
                  borderColr: '#cc1034',
                  data: this.state.graphData
                }
              ]
            }}
            options={{
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              },
              maintainAspectRatio: false,
              tooltips: {
                mode: 'index',
                intesect: false,
                callback: {
                  label: (tooltipItem, data) => {
                    return numeral(tooltipItem.value).format('+0, 0');
                  }
                }
              },
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    time: {
                      format: 'MM/DD/YY',
                      tooltipFormat: 'll'
                    }
                  }
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: false
                    },
                    ticks: {
                      callback: (value, index, values) => {
                        return numeral(value).format('0a');
                      }
                    }
                  }
                ]
              }
            }}
          />
        )}
      </div>
    );
  }
}

export default LineGraph;
