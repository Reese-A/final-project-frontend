import React from 'react';
import { connect } from 'react-redux';
import { getCaloriesExpended, getTotalSteps } from '../../redux/actions/fitness-actions';

class GoogleFit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caloriesExpended: '',
      totalSteps: ''
    };
  }


  componentDidMount() {
    this.setState({ 
      caloriesExpended: this.props.getCaloriesExpended(),
      totalSteps: this.props.getTotalSteps()
    })
  }


  render() {
    return (
      <div id="googleFitWrap">
        <div id="caloriesExpended">Calories expended:{this.state.caloriesExpended}</div>
        <div id="stepsTaken">Steps taken:{this.state.totalSteps}</div>
      </div>
    )
  }
}

const matchDispatchToProps = dispatch => {
  return {
    getCaloriesExpended: () => {
      dispatch(getCaloriesExpended());
    },
    getTotalSteps: () => {
      dispatch(getTotalSteps());
    }
  }
};

export default connect(null, matchDispatchToProps)(GoogleFit);