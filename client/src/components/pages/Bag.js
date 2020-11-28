import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card, Container} from 'react-bootstrap';
import QtySelect from '../QtySelect.js';
import {Message} from '../Message.js';
import {addToBag} from '../../actions/bagActions.js'; 

const Bag = ({match, location, history}) => {
  const bag = useSelector(state => state.bag);
  const {bagItems} = bag;

  const dispatch = useDispatch();

  const handleShopNow = () => {
    history.push('/');
  };

  const handleQtyChange = (productId, e) => {
    dispatch(addToBag(productId, Number(e.target.value)));
  }

  return(
    <Container className='d-flex'>
    {bagItems.length === 0 
      ? <div className='mx-auto text-center py-5'>
          <Row>
            <h1>You haven't added anything to your bag yet!</h1>
          </Row>
          <span>
            <Button 
              type='button' 
              variant='primary' 
              onClick={handleShopNow}
            >
              <i className='fas fa-burn text-inverse'></i>
              &nbsp;&nbsp;
              SHOP NOW
            </Button>
          </span>          
        </div>
      : <Row>
          <Col md={8}>
            <h1>My Bag</h1>
            <ListGroup variant='flush'>
              {bagItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <QtySelect product={item} qty={item.qty} onChange={handleQtyChange} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={2}>
          </Col>
          <Col md={2}>
            Items: {bagItems.length}
          </Col>
        </Row>}
    </Container>
  );
};

export default Bag;
