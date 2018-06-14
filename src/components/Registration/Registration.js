 import React from 'react';
 import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
 //ProfileForm, FitnessForm, ReviewForm

 class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null
    }
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount(){
    this.setState({ page: 1 });
  }

  nextPage() {
    this.setState({ page: this.state.page + 1})
  };

  previousPage() {
    this.setState({ page: this.state.page - 1})
  };


  render() {
    switch (this.state.page) {
      case 1:
        return(
          <div id="registration">
          <RegisterForm nextPage={this.nextPage}/>
          </div> 
        )
      default:
        return(
          <div>hello world</div>
        ) 
    }
  }
 }

 export default Registration;
