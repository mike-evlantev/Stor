import React from 'react';
import {Spinner} from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner 
      animation='border' 
      variant='primary'
      role='status'
      style={{
        margin: 'auto',
        display: 'block',
      }} />
  )
}

export default Loader;
