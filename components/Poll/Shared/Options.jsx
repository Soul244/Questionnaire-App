import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';

class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      checkedAnswerIndex: undefined,
    };
  }

  onClick = (answerIndex) => {
    const {
      questionIndex, addParticipantAnswer, changeQuestion,
    } = this.props;
    const { checkedAnswerIndex } = this.state;
    if (!checkedAnswerIndex) {
      this.setState({
        checkedAnswerIndex: answerIndex,
      });
      addParticipantAnswer(questionIndex, answerIndex);
      changeQuestion();
    }
  };

  render() {
    const {
      answers,
      questionCount,
      questionIndex,
      rightAnswerIndex,
    } = this.props;
    const { checkedAnswerIndex } = this.state;
    return (
      <Fragment>
        {answers.map((answer, index) => (
          <Option
            key={index}
            answerIndex={index}
            questionCount={questionCount}
            questionIndex={questionIndex}

            answerCount={answer.count}
            type={answer.type}
            content={answer.content}

            rightAnswerIndex={rightAnswerIndex}
            checkedAnswerIndex={checkedAnswerIndex}
            onClick={this.onClick}
          />
        ))}
      </Fragment>
    );
  }
}

Options.defaultProps = {
  rightAnswerIndex: null,
};

Options.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  questionCount: PropTypes.number.isRequired,
  rightAnswerIndex: PropTypes.number,
  answers: PropTypes.array.isRequired,
  addParticipantAnswer: PropTypes.func.isRequired,
};

export default Options;
