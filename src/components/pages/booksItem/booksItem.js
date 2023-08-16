import React, {Component} from 'react';
// import { useParams } from 'react-router-dom';
import GotService from '../../../services/gotService';
import CharDetails, {Field} from "../../charDetails";


export default class BooksItem extends Component {
    GotService = new GotService();

    // state = {
    //     id: null
    // }

    // componentDidUMount() {
    //     function Params(){
    //         let {id} = useParams();
    //         console.log({id});
    //         return this.setState({
    //             id: {id}
    //         });
    //     }
    //     Params();

    // }

  
    render () {
        return (
            <CharDetails itemId = {this.props.bookid}
                        getData={this.GotService.getBook}>
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </CharDetails>
        )
    }
}
