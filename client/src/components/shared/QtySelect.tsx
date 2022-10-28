import * as React from "react";
import {Form} from 'react-bootstrap';
import { IProduct } from "../../types/IProduct";

interface Props {
    product: IProduct;
    qty: number;
    onChange: (id: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const QtySelect: React.FC<Props> = ({product, qty, onChange}) => {
  return (
    <Form.Control
      as='select'
      value={qty}
      onChange={(e) => onChange(product.id, e as unknown as React.ChangeEvent<HTMLSelectElement>)}
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