import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LoadMoreAnswers from '../buttons/LoadMoreAnswers.jsx';
import AsFeedback from '../buttons/AsFeedback.jsx';
import { fetchAnswers } from '../helpers/server-requests';
import AddAnswer from '../buttons/AddAnswerBtn.jsx';
import Modal from '../Modal';

const moment = require('moment');

const Answers = ({ questionId, questionBody }) => {
  const [answers, setAnswers] = useState([]);
  const [display, updateDisplay] = useState([]);
  const [imageOpen, setImageOpen] = useState(false);
  const pointer = useRef(2);

  useEffect(() => {
    fetchAnswers(questionId, (results) => {
      setAnswers(results);
      updateDisplay(results.slice(0, 2));
    });
  }, []);

  const loadMore = (e) => {
    if (e.target.innerHTML === 'COLLAPSE ANSWERS') {
      e.target.innerHTML = 'SEE MORE ANSWERS';
      pointer.current = 2;
      return updateDisplay(answers.slice(0, 2));
    }
    if (pointer.current >= answers.length - 2) {
      e.target.innerHTML = 'COLLAPSE ANSWERS';
      return updateDisplay(answers.slice());
    }
    pointer.current += 2;
    updateDisplay(answers.slice(0, pointer.current));
  };

  return (
    <div id="answersContainer">
  {display.map((answer) => (
          <span className="answerElement" key={answer.answer_id}>
          <span key={`${answer.answer_id}/span`} className="answerBody">{answer.body}</span>
          <br></br>
          {answer.photos.length > 0 ? <span><img className="answerImg" onClick={() => setImageOpen(true)} src="https://placeimg.com/50/50/any"></img><Modal id="imageModal" open={imageOpen} onClose={() => setImageOpen(false)}>
          <img className="modalImg" src="https://placeimg.com/400/400/any"></img>
            </Modal> </span> : <></>}
          <br />
          {answer.answerer_name === 'Seller' ? <span className="bold answerer">by{' '}{answer.answerer_name}</span> : <span className="answerer"> by{' '}{answer.answerer_name}</span>}
          <span className="answerer">,{' '}{moment(answer.date).format('MMMM Do YYYY')}</span>
          {' '}<span id="helpTxtA">Helpful?{' '}</span>
          <span id={answer.answer_id}>
            <AsFeedback answerId={answer.answer_id} answerHelpfulness={answer.helpfulness || 0}/>
          </span>
        </span>
  ))}
        <div id="answer-btn-container">
        {answers.length > 2 ? <LoadMoreAnswers handler={loadMore} />
          : <></>}
          {answers.length === 0
            ? <span className="bold"> No answers found... would you like to add a new one?
               <AddAnswer questionId={questionId} questionBody={questionBody} /></span>
            : <></>}
          </div>
          <br></br>
      </div>
  );
};

Answers.propTypes = {
  questionId: PropTypes.number,
  questionBody: PropTypes.string,
};

export default Answers;
