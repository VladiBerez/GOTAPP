import React from 'react';
// import './charDetails.css';
import styled from 'styled-components';
import ListGroup from 'react-bootstrap/ListGroup';
import GotService from '../../services/gotService';
import Spinner from '../spinner';

const H4 = styled.div`
margin-bottom: 20px;
text-align: center;
`;

const H1 = styled.h1`
color: white;
text-transform: uppercase;
`;

const Title = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 40px;
`;

const Field  = ({item, field, label}) => {
    return(
        <ListGroup.Item as='li' className=" d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroup.Item>
    )
}

export {
    Field
}

export default class CharDetails extends React.Component {

    GotService = new GotService();
    
    state = {
        item: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !==prevProps.itemId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }

        const {getData} = this.props;

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
        }

    render () {

        if(!this.state.item) {
            return <H1 className='select-error'>Please select character</H1>;
        };

        if(!this.state.item) {
            return <Spinner/>;
        }

        const {item} = this.state;
        const {name} = item;


        return (
            <Title className="char-details rounded">
                    <H4>{name}</H4>
                    <ListGroup as='ul' variant="flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item})
                            })
                        }
                    </ListGroup>
                </Title>
        )
    }
}
