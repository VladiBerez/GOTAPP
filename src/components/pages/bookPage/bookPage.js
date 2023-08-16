import React, {Component} from "react";
import ItemList from "../../itemList";
import CharDetails, {Field} from "../../charDetails";
import ErrorMessage from "../../errorMessage";
import GotService from '../../../services/gotService';
import RowBlock from "../../rowBlock/rowBlock";

export default class BookPage extends Component {

    GotService = new GotService();

    state = {
        selectedItem: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })

    }

    render () {

        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.GotService.getAllBooks}
                renderItem={({name, publisher}) => `${name} (${publisher})`}/>
        )

        const charDetails = (
            <CharDetails itemId = {this.state.selectedItem}
                        getData={this.GotService.getBook}>
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </CharDetails>

        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
            )
    }
}