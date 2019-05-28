import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { userActions, pollActions } from '~redux/actions';
import { TableList, MasonryList } from '~components/Dashboard';
import { Loading, SectionHeader } from '~components/Shared';
import { withAuth, withNavbar } from '~hoc';
import Icon, { IconContainer, masonry, list } from '~css/icons';
import colors from '~css/colors';

const PageContainer = styled.div`
  color: white;
  background-color: darkgray;
  border-radius: 14px;
  padding: 0.375rem 0.75rem;
  font-size: 0.85rem;
`;

@withNavbar
@withAuth
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: null,
      page: 0,
      initialLoad: true,
    };
  }

  componentDidMount() {
    this.setState({
      viewType: parseInt(localStorage.getItem('viewType'), 10) || 0,
    });
    const { pollActions } = this.props;
    const { getPolls } = pollActions;
    getPolls(0);
  }

  onClick = (value) => {
    this.setState({
      viewType: value,
    });
    localStorage.setItem('viewType', value);
  };

  loadMore = (page) => {
    const { pollActions } = this.props;
    const { getPolls } = pollActions;
    this.setState({
      page,
      initialLoad: false,
    });
    getPolls(page);
  }

  render() {
    const { pollReducer, pollActions } = this.props;
    const { viewType, page, initialLoad } = this.state;
    const {
      polls, message, fetching, fetched, pageCount,
    } = pollReducer;
    const { deletePoll, copyPoll } = pollActions;
    if (fetching && !fetched) {
      return <Loading />;
    }
    return (
      <>
        <Row>
          <Col md="12">
            <SectionHeader title="Dashboard">
              <PageContainer>
                {`Anket Sayısı: ${pageCount * 10}`}
              </PageContainer>
              <IconContainer
                color={viewType === 0 ? colors.color3 : 'lightgray'}
                onClick={() => this.onClick(0)}
              >
                <Icon size={32} icon={masonry} />
              </IconContainer>
              <IconContainer
                color={viewType === 1 ? colors.color3 : 'lightgray'}
                onClick={() => this.onClick(1)}
              >
                <Icon size={32} icon={list} />
              </IconContainer>
            </SectionHeader>
          </Col>
        </Row>
        <InfiniteScroll
          pageStart={0}
          initialLoad={initialLoad}
          loadMore={this.loadMore}
          hasMore={page < pageCount}
          loader={(<div className="loader" key={0}>Loading ...</div>)}
        >
          {viewType === 0 && (
            <Row>
              <Col md="12">
                <MasonryList polls={polls} />
              </Col>
            </Row>
          )}
          {viewType === 1 && (
            <Row>
              <Col md="12">
                <TableList
                  polls={polls}
                  message={message}
                  deletePoll={deletePoll}
                  copyPoll={copyPoll}
                />
              </Col>
            </Row>
          )}
        </InfiniteScroll>
      </>
    );
  }
}

Dashboard.propTypes = {
  pollReducer: PropTypes.shape({
    polls: PropTypes.array,
    message: PropTypes.string,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  pollActions: PropTypes.shape({
    getPolls: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    pollReducer: state.pollReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    pollActions: bindActionCreators(pollActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
