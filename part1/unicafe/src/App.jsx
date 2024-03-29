import { useState } from "react";

const Statistics = ({ total, score, positivePercentage }) => {
  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    );
  }

  const average = score / total;

  return (
    <div>
      <h1>statistics</h1>
      <p>all: {total}</p>
      <p>average: {average.toFixed(2)}</p>
      <p>positive: {positivePercentage.toFixed(2)}%</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    setTotal(total + 1);
    setGood(good + 1);
    setScore(score + 1);
  };

  const handleNeutralClick = () => {
    setTotal(total + 1);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setTotal(total + 1);
    setBad(bad + 1);
    setScore(score - 1);
  };

  const positivePercentage = (good / total) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <Statistics total={total} score={score} positivePercentage={positivePercentage} />
    </div>
  );
};

export default App;
