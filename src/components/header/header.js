import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { ListGroup } from 'react-bootstrap';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

const LinkNew = styled(Link) `
text-decoration: none;
color: white;
padding: 5px;
transition: .5s ease;
:hover {
    background-color: white;
    color: black;
    border-radius: 5px;
}
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderTitle>
                <LinkNew to='/'>
                Game of Thrones DB
                </LinkNew>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                    <LinkNew to='/characters'>Characters</LinkNew>
                </li>
                <li>
                    <LinkNew to='/houses'>Houses</LinkNew>
                </li>
                <li>
                    <LinkNew to ='/books'>Books</LinkNew>  
                </li>
            </HeaderLinks>
        </HeaderBlock>
    );
};

export default Header;