import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import { loadConsumption } from '../../redux/actions/dishes-actions';
import './CalorieChart.css';

class CalorieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.consumption === this.props.consumption) {
  //     this.props.loadConsumption();
  //   }
  // }

  render() {
    const data = this.props.daily
      ? {
          labels: this.props.daily.tracked_calories,
          datasets: [
            {
              label: 'Total Calories Consumed Today',
              fill: true,
              borderColor: 'rgba(255,165,0,0.8)',
              backgroundColor: 'rgba(250,128,114,0.4)',
              data: this.props.daily.tracked_calories
            }
          ]
        }
      : {
          datasets: [
            {
              label: 'Total Calories Consumed Today',
              fill: true,
              borderColor: 'rgba(255,165,0,0.8)',
              backgroundColor: 'rgba(250,128,114,0.4)',
              data: []
            }
          ]
        };
    return (
      <Line
        data={data}
        width={350}
        height={300}
        options={
          {
            // scales: {
            //   yAxes: [
            //     { ticks: { suggestedMax: this.props.user.allowance, min: 0 } }
            //   ]
            // }
          }
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    daily: state.daily,
    user: state.user,
    consumption: state.consumption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadConsumption: () => {
      dispatch(loadConsumption());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalorieChart);
