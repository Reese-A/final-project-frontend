import React from 'react';
import { connect } from 'react-redux';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

import './CalorieChart.css';

const moment = require('moment');

class CalorieChart extends React.Component {
  render() {
    const data =
      Object.keys(this.props.daily).length > 0
        ? this.props.daily.tracked_calories
        : [];
    const labels =
      Object.keys(this.props.daily).length > 0
        ? this.props.daily.tracked_calories
        : [];
    const max = this.props.user.allowance ? this.props.user.allowance : 2000;
    const times =
      Object.keys(this.props.daily).length > 0
        ? this.props.daily.tracked_times.map(time => {
            return moment(Number(time)).toDate();
          })
        : [];
    const formatData = [];
    for (let i = 0; i < data.length; i++) {
      formatData.push({ x: times[i], y: data[i] });
    }
    const start = moment(Date.now())
      .subtract(2, 'hours')
      .toDate();
    // .setHours(18);
    const end = moment(Date.now())
      .add(2, 'hours')
      .toDate();
    console.log(start);
    return (
      <div id="chart_wrapper">
        <div id="chart_cover" />
        <VictoryChart
          id="calorie_chart"
          domain={{ x: [start, end], y: [0, max] }}
          animate={{ duration: 500, onLoad: { duration: 500 } }}
          theme={VictoryTheme.material}
          scale={{ x: 'time' }}
        >
          <VictoryLine
            labels={labels}
            data={formatData}
            style={{
              data: {
                stroke: '#FA8072',
                strokeWidth: 3,
                strokeLinecap: 'round'
              }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    daily: state.daily,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(CalorieChart);
