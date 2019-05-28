import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  Row, Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import Settings from './Settings';
import Questions from './Questions';
import {
  QuestionTool, FormInput, FormEditor,
} from '~components/Shared';
import { checkEmpty } from '~validation/validationFunctions';

import { pollActions } from '~redux/actions';
import { withNavbar } from '~hoc';

@withNavbar
class PollEditor extends Component {
  componentWillMount() {
    const { _id, pollActions } = this.props;
    if (_id) {
      pollActions.getPoll(_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pollReducer } = this.props;
    const { message } = pollReducer;
    if (nextProps.pollReducer.message !== message) {
      this.notify({ apiMessage: nextProps.pollReducer.message });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { pollReducer, pollActions } = this.props;
    const { postPoll, updatePoll } = pollActions;
    const { poll } = pollReducer;
    const { questions, name, id } = poll;
    // Errors
    const questionsErrors = checkEmpty(questions);
    const answersErrors = false;
    const settingsError = false; // checkObjectEmpty(poll.settings);
    const inputsErrors = name === '';

    // If there is a error, won't post anything
    // If poll has id, update that poll
    // Otherwise post a new poll
    if (
      questionsErrors.length > 0
      || answersErrors.length > 0
      || settingsError
      || inputsErrors
    ) {
      this.notify({
        questionsErrors,
        answersErrors,
        settingsError,
        inputsErrors,
        handleOK: false,
      });
    } else if (id === '') {
      postPoll(poll);
    } else {
      updatePoll(poll);
    }
  }

  notify=(messages) => {
    if (messages.questionsErrors) {
      messages.questionsErrors.map(error => toast.error(`${error.index + 1}. sorununun içeriği eksik`, {
        position: toast.POSITION.BOTTOM_LEFT,
      }));
    }
    if (messages.answersErrors) {
      messages.answersErrors.map(error => toast.error(
        `${error.questionIndex + 1}. sorununun ${error.index
            + 1} cevabının içeriği eksik`,
        { position: toast.POSITION.BOTTOM_LEFT },
      ));
    }
    if (messages.settingsError) {
      toast.error('Ayarları Tamamlamadınız...', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    if (messages.inputsErrors) {
      toast.error('Anket ismini yazmadınız...', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    if (messages.apiMessage) {
      if (
        messages.apiMessage === 'Anket Kaydedildi'
        || messages.apiMessage === 'Anket Güncellendi'
      ) {
        toast.success(messages.apiMessage, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error(messages.apiMessage, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  }

  render() {
    const { pollReducer, pollActions } = this.props;
    const {
      addQuestion,
      onChangeName,
      onChangeDesc,
      onChangeLastDesc,
    } = pollActions;

    const {
      poll,
    } = pollReducer;
    const {
      name,
      desc,
      lastDesc,
    } = poll;
    return (
      <>
        <ToastContainer autoClose={3000} />
        <form onSubmit={this.handleSubmit}>
          <QuestionTool addQuestion={addQuestion} />
          <Row>
            <Col md="12" className="mb-2">
              <FormattedMessage id="editor.poll-name-placeholder">
                {placeholder => (
                  <FormInput
                    title="editor.poll-name"
                    value={name}
                    onChange={e => onChangeName(e.target.value)}
                    placeholder={placeholder}
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2">
              <FormattedMessage id="editor.poll-desc-placeholder">
                {placeholder => (
                  <FormEditor
                    title="editor.poll-desc"
                    onChange={onChangeDesc}
                    data={desc}
                  />
                )}
              </FormattedMessage>
            </Col>

            <Col md="12" className="mb-2">
              <FormattedMessage id="editor.poll-end-message-placeholder">
                {placeholder => (
                  <FormEditor
                    title="editor.poll-end-message"
                    data={lastDesc}
                    onChange={onChangeLastDesc}
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2">
              <Settings />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2">
              <Questions />
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

PollEditor.defaultProps = {
  _id: null,
  pollReducer: PropTypes.shape({
    message: '',
  }),
};

PollEditor.propTypes = {
  _id: PropTypes.string,
  pollReducer: PropTypes.shape({
    poll: PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string,
  }),
  pollActions: PropTypes.shape({
    addQuestion: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeDesc: PropTypes.func.isRequired,
    updatePoll: PropTypes.func.isRequired,
    postPoll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    pollReducer: state.pollReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pollActions: bindActionCreators(pollActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PollEditor);
