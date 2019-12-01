import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  logout = () => {
    //this.props.tasks = [];
    this.props.logout();
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.logout.bind(this)} href='#'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);