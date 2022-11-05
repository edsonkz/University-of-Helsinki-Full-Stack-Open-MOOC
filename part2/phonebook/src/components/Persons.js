import React from 'react';
import Person from './Person';

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
