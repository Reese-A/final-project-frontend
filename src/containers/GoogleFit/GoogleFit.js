import React from 'react';
import { connect } from 'react-redux';

import './GoogleFit.css'

class GoogleFit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caloriesExpended: '',
      totalSteps: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.caloriesExpended && state.totalSteps) return state;
    const stateChanges = {};

    if (props.totalSteps) {
      stateChanges.totalSteps = props.totalSteps;
    }
    if (props.caloriesExpended) {
      stateChanges.caloriesExpended = props.caloriesExpended;
    }
    return stateChanges;
  }

  render() {
    const stepsTaken = this.state.totalSteps ? this.state.totalSteps : null
    const caloriesExpended =
      this.state.caloriesExpended ?
        this.state.caloriesExpended : null
    return (
      <div id="google_fit_wrap">
        <div id="google_fit_header">
        <span id="google_fit_header_text">Today's Google Fit Data</span>
        </div>
          <div id="caloriesExpended">Calories expended: {caloriesExpended}</div>
          <div id="stepsTaken">Steps taken: {stepsTaken}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    totalSteps: state.fitness.totalSteps,
    caloriesExpended: state.fitness.caloriesExpended
  }
}


export default connect(mapStateToProps, null)(GoogleFit);