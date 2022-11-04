import React from 'react';

const Total = ({ parts }) => {
  return (
    <>
      <b>
        total of {parts.reduce((acc, next) => acc + next.exercises, 0)}{' '}
        exercises
      </b>
    </>
  );
};

export default Total;
