import React from 'react';
import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + bad + neutral} />
          <StatisticLine
            text="average"
            value={((good * 1 + bad * -1) / (good + bad + neutral)).toFixed(1)}
          />
          <StatisticLine
            text="positive"
            value={` ${(100 * (good / (good + bad + neutral))).toFixed(1)} %`}
          />
        </table>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function setRatingGood() {
    setGood(good + 1);
  }

  function setRatingNeutral() {
    setNeutral(neutral + 1);
  }

  function setRatingBad() {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={setRatingGood} text="good" />
      <Button handleClick={setRatingNeutral} text="neutral" />
      <Button handleClick={setRatingBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
