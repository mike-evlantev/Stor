import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import {Message} from '../Message.js';
import {addToBag} from '../../actions/bagActions.js'; 

const Bag = ({match, location, history}) => {
  const bag = useSelector(state => state.bag);
  const {bagItems} = bag;

  const dispatch = useDispatch();

  return (
    <Row>
      <Col md={8}>
        <h1>My Bag</h1>
      </Col>
      <Col md={2}>
      </Col>
      <Col md={2}>
        Items: {bagItems.length}
      </Col>
    </Row>
  )
};

export default Bag;
