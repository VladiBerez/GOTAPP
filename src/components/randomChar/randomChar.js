import React, {Component} from 'react';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 40px;
`;

const H4 = styled.h4 `
background-color: #fff;
padding: 25px 25px 15px 25px;
margin-bottom: 40px;
`;

const Term = styled.span`
font-weight: bold;
`;

export default class RandomChar extends Component {

    GotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timedId = setInterval(this.updateCharacter, 4000);    }

    componentWillUnmount() {
        clearInterval(this.timedId);
    }

    onCharLoaded = (char) => {
        this.setState({ 
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacter = () => {
        // console.log('Update');
        const id = Math.floor(Math.random() *140 + 25);
        this.GotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        console.log('render');
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <RandomBlock className=" rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}
const View = ({char}) => {

    const {name, gender, born, died, culture} = char;

    return (
        <>
            <H4>Random Character: {name}</H4>
                <ListGroup as='ul' variant='flush'>
                    <ListGroup.Item as='li' className=" d-flex justify-content-between">
                        <Term>Gender</Term>
                        <span>{gender}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as='li'  className=" d-flex justify-content-between">
                        <Term>Born </Term>
                        <span>{born}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as='li'  className="d-flex justify-content-between">
                        <Term>Died </Term>
                        <span>{died}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as='li'  className="d-flex justify-content-between">
                        <Term>Culture </Term>
                        <span>{culture}</span>
                    </ListGroup.Item>
                </ListGroup>
        </>
    )
}