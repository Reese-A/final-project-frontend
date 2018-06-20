import React from 'react';
import { connect } from 'react-redux';

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
      caloriesExpended: this.props.caloriesExpended,
      totalSteps: this.props.totalSteps
    })
  }

  render() {
    const stepsTaken = this.state.totalSteps ? this.state.totalSteps : null

    const caloriesExpended = 
    this.state.caloriesExpended ?
    this.state.caloriesExpended : null

    return (
      <div id="googleFitWrap">
        <div id="caloriesExpended">Calories expended:{caloriesExpended}</div>
        <div id="stepsTaken">Steps taken:{stepsTaken}</div>
      </div>
    )
  }
}

const matchStateToProps = state => {
  return {
    totalSteps: state.fitness.totalSteps,
    caloriesExpended: state.fitness.caloriesExpended
  }
}


export default connect(matchStateToProps, null)(GoogleFit);