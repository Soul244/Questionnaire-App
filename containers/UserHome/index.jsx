import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import PropTypes from 'prop-types';

import * as userActions from '../../redux/actions/userActions';
import * as pollsActions from '../../redux/actions/pollsActions';
import Table from '../../components/UserHome';
import { Loading } from '../../components/Shared';
import withAuth from '../../hoc/withAuth';
import withNavbar from '../../hoc/withNavbar';

@withNavbar
@withAuth
class UserHome extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    const { pollsActions } = this.props;
    if (!token && token === '') {
      Router.push({ pathname: '/giris-yap' });
    } else {
      const { getPolls } = pollsActions;
      getPolls();
    }
  }

  render() {
    const {
      polls, message, fetching, fetched,
    } = this.props.polls;
    const { deletePoll } = this.props.pollsActions;
    if (fetching && !fetched) {
      return (
        <Loading />
      );
    }
    return (
      <Table
        polls={polls}
        message={message}
        deletePoll={deletePoll}
      />
    );
  }
}

UserHome.propTypes = {
  polls: PropTypes.shape({
    polls: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  pollsActions: PropTypes.shape({
    getPolls: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    polls: state.polls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    pollsActions: bindActionCreators(pollsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHome);
