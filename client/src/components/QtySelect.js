import React from 'react';
import {Form} from 'react-bootstrap';

const QtySelect = ({product, qty, onChange}) => {
  return (
    <Form.Control
      as='select'
      value={qty}
      onChange={(e) => onChange(product.product, e)}
    >
      {
        Array
          .from({length: product.countInStock}, (_, i) => i + 1)
          .map(x => (
            <option key={x} value={x}>{x}</option>
          ))
      }
    </Form.Control>
  )
};

export default QtySelect;
