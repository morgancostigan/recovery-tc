import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './LogOutButton.css';

class LogOutButton extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'LOGOUT' })
      // this.props.history.push('/login');
  
  }

  render() {
    return (
      <Link to="/home">
        <Button
          // This button shows up in multiple locations and is styled differently
          // because it's styled differently depending on where it is used, the className
          // is passed to it from it's parents through React props
          className="button"
          onClick={() => this.handleClick()}
        >
          Log Out
        </Button>
      </Link>
   )
  }
};

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
