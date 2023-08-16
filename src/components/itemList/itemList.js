import React, {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Spinner from '../spinner';
// import GotService from '../../services/gotService';

const A = styled.a`
cursor: pointer;
text-decoration: none;
color: black;
:hover {
    color: black;
}
`;

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then ( (data) => {
                updateList(data)
            })
    })

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);

            return (
                <ListGroup.Item as='li' 
                key = {id}
                className="list-group-item"
                onClick={ () => onItemSelected(id)}
                >
                    <A>{label}</A>
                </ListGroup.Item>
            )
        })
    }

    if (!itemList){
        return <Spinner/> 
    }

    const items = renderItems(itemList);

    return (
        <ListGroup as='ul' className="item-list list-group">
            {items}
        </ListGroup>
    );
}

export default ItemList;