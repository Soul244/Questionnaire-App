import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Progress,
} from 'reactstrap';
import styled from 'styled-components';

import {
  Last, First, ShowType,
} from './Shared';
import colors from '../../css/colors';

const RightContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

const CountContainer = styled.div`
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  background-color: ${colors.color10};
  border-radius: 50px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;

const Controls = styled.div`
  display:flex;
  margin-bottom: 1rem;
`;

const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      progressValue: 0,
    };
    this.swiper = null;
  }

  timer = () => {
    const { progressValue, interval } = this.state;
    this.setState(prevState => ({
      progressValue: prevState.progressValue + 1,
    }));
    if (progressValue > 100) {
      clearInterval(interval);
      setTimeout(() => {
        this.setState({
          progressValue: 0,
        });
        this.slideNext();
      }, 1000);
    }
  }

  changeQuestion = () => {
    // If counter still doesn't finish, won't change question
    const { progressValue } = this.state;
    if (progressValue !== 0) return;
    const { poll } = this.props;
    const { settings } = poll;
    const { answerAutoChangeTime, hasAnswerAutoChangeTime } = settings;
    // If poll has auto change time, will start timer. Otherwise continue...
    if (hasAnswerAutoChangeTime) {
      const interval = setInterval(this.timer, answerAutoChangeTime / 100);
      this.setState({ interval });
    }
  }

  slideNext = () => {
    const { slideIndex } = this.state;
    const { poll, handleTestFinished } = this.props;
    const { questions } = poll;
    const remainingCount = questions.length - slideIndex;
    if (remainingCount > 1) {
      if (this.swiper) this.swiper.slideNext();
      this.setState({
        slideIndex: slideIndex + 1,
      });
    } else {
      handleTestFinished();
    }
  }

  slidePrev = () => {
    const { slideIndex } = this.state;
    if (slideIndex > 0) {
      if (this.swiper) this.swiper.slidePrev();
      this.setState({
        slideIndex: slideIndex - 1,
      });
    }
  }

  render() {
    const {
      slideIndex, progressValue,
    } = this.state;

    const {
      showType,
      testStarted,
      testFinished,
      handleTestStarted,
      addParticipantAnswer,
      postParticipant,
      participant,
      poll,
      message,
    } = this.props;

    const {
      questions, name, desc, lastDesc,
    } = poll;

    const {
      hasAnswerAutoChangeTime,
      userDataCollectType,
      type,
    } = poll.settings;

    return (
      <>
        {/* IF POLL(TEST) IS NOT STARTED, SHOW START PAGE' */}
        {!testStarted && (
          <First
            name={name}
            desc={desc}
            handleTestStarted={handleTestStarted}
          />
        )}
        {/* IF POLL IS STARTED AND IF POLL IS NOT YET FINISHED, SHOW POLL DATA' */}
        {testStarted && !testFinished && (
          <>
            {/* IF THERE IS AUTO ANSWER CHANGE TIME, SHOW PROGRESS BAR */}
              {hasAnswerAutoChangeTime && (
              <>
                <ProgressContainer>
                  <Progress value={progressValue} max={100} />
                </ProgressContainer>
                <CountContainer color="secondary">
                  {`${slideIndex + 1}/${questions.length} soru`}
                </CountContainer>
              </>
              )}
            {/* IF NOT, SHOW BUTTONS */}
            {!hasAnswerAutoChangeTime && (
            <Controls>
              <Button onClick={this.slidePrev}>Önceki Soru</Button>
              <RightContainer>
                <CountContainer color="secondary">
                  {`${slideIndex + 1}/${questions.length} soru`}
                </CountContainer>
                <Button onClick={this.slideNext}>Sıradaki Soru</Button>
              </RightContainer>
            </Controls>
            )}
            {/* POLL DATA */}
            <ShowType
              questions={questions}
              showType={showType}
              changeQuestion={this.changeQuestion}
              addParticipantAnswer={addParticipantAnswer}
            />
          </>
        )}
        {/* IF POLL FINISH, SHOW FINISH PAGE */}
        {testFinished && (
        <Last
          name={name}
          lastDesc={lastDesc}
          pollId={poll._id}
          participant={participant}
          postParticipant={postParticipant}
          userDataCollectType={userDataCollectType}
          type={type}
          message={message}
        />
        )}
      </>
    );
  }
}

Index.defaultProps = {
  message: null,
};

Index.propTypes = {
  showType: PropTypes.oneOf(['sideBySide', 'full']).isRequired,
  testStarted: PropTypes.bool.isRequired,
  testFinished: PropTypes.bool.isRequired,
  handleTestStarted: PropTypes.func.isRequired,
  addParticipantAnswer: PropTypes.func.isRequired,
  postParticipant: PropTypes.func.isRequired,
  participant: PropTypes.object.isRequired,
  handleTestFinished: PropTypes.func.isRequired,
  message: PropTypes.string,
  poll: PropTypes.shape({
    settings: PropTypes.shape({
      answerAutoChangeTime: PropTypes.string.isRequired,
      hasAnswerAutoChangeTime: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Index;
