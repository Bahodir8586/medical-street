import { useEffect, useState, useCallback } from 'react';

import MultipleChoiceQuestion from '@/components/Questions/MultipleChoiceQuestion/';
import SelectQuestion from '@/components/Questions/SelectQuestion';
import axios from '@/utils/axios';

export default function Interview({ submit, initialInterview }) {
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState(initialInterview);
  const [showMultiple, setShowMultiple] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const [activeQuestion, setActiveQuestion] = useState({});
  const [newData, setNewData] = useState([]);

  const loadNextQuestion = useCallback(async () => {
    setShowMultiple(false);
    setShowSelect(false);
    setIsLoading(true);
    try {
      const response = await axios.post('/diagnosis', information);
      console.log(response.data);
      setIsLoading(false);
      if (response.data.should_stop) {
        // return;
        submit(response.data.conditions);
        return
      }
      const question = response.data.question;
      const newData = question.items.map((el) => {
        return { id: el.id, choice_id: undefined };
      });
      setNewData(newData);
      setActiveQuestion(question);
      console.log(question.items[0]);
      if (question.type === 'group_single') {
        setShowMultiple(true);
      } else if (question.type === 'single') {
        setShowSelect(true);
      } else if (question.type === 'group_multiple') {
        setShowMultiple(true);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [information, submit]);

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  const submitInterview = () => {
    const updatedInfo = { ...information };
    updatedInfo.evidence = [...updatedInfo.evidence, ...newData];
    setInformation(updatedInfo);
    loadNextQuestion();
  };

  const multiSelectHandler = (questionId, answerId) => {
    const questions = [...newData];
    const selectedQuestion = questions.find((el) => el.id === questionId);
    selectedQuestion.choice_id = answerId;
    setNewData(questions);
  };
  const singleSelectHandler = (answerId) => {
    const questions = [...newData];
    const selectedQuestion = questions[0];
    selectedQuestion.choice_id = answerId;
    setNewData(questions);
  };

  return (
    <div className="flex flex-col">
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-108">Loading...</div>
      )}
      {showMultiple && (
        <MultipleChoiceQuestion
          title={activeQuestion.text}
          questions={activeQuestion.items}
          onChange={(questionId, answerId) => multiSelectHandler(questionId, answerId)}
        />
      )}
      {showSelect && (
        <SelectQuestion
          title={activeQuestion.text}
          choices={activeQuestion.items[0].choices}
          onChange={(answerId) => singleSelectHandler(answerId)}
        />
      )}
      <div className="border-t flex justify-end items-center py-4">
        <button
          onClick={submitInterview}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
