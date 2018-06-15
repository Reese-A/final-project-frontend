 import React from 'react';
 import { Switch, Route, Redirect } from 'react-router-dom';
import AccountForm from '../../containers/AccountForm/AccountForm';
import ProfileForm from '../../containers/ProfileForm/ProfileForm';
import FitnessForm from '../../containers/FitnessForm/FitnessForm';
import ReviewForm from '../../containers/ReviewForm/ReviewForm';
 //ProfileForm, FitnessForm, ReviewForm

 class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.secondPage = this.secondPage.bind(this);
  }

  componentDidMount(){
    this.setState({ page: 1 });
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  };

  firstPage() {
    this.setState({ page: 1 });
  };

  secondPage() {
    this.setState({ page: 2  });
  };


  render() {
    switch (this.state.page) {
      case 1:
        return(
          <div id="registration">
          <AccountForm nextPage={this.nextPage}/>
          </div> 
        )
      case 2: 
        return(
          <div id="registration">
          <ProfileForm previousPage={this.previousPage} nextPage={this.nextPage} />
          </div>
        )
      case 3: 
        return(
          <div id="registration">
          <FitnessForm previousPage={this.previousPage} nextPage={this.nextPage} />
          </div>
        )
      case 4: 
        return(
          <div id="registration">
          <ReviewForm previousPage={this.previousPage} firstPage={this.firstPage} secondPage={this.secondPage}/>
          </div>
        )
      default:
      return(
        <div id="registration">
        <AccountForm nextPage={this.nextPage}/>
        </div> 
      )
    };
  };
 };

 export default Registration;
