import * as React from "react";
import {Spinner} from 'react-bootstrap';

export const Loader: React.FC = () => {
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