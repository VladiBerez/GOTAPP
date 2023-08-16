import React, {Component} from "react";
import ItemList from "../../itemList";
import CharDetails, {Field} from "../../charDetails";
import ErrorMessage from "../../errorMessage";
import GotService from '../../../services/gotService';
import RowBlock from "../../rowBlock/rowBlock";

export default class HousePage extends Component {

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
                getData={this.GotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}/>
        )

        const charDetails = (
            <CharDetails itemId = {this.state.selectedItem}
                        getData={this.GotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </CharDetails>

        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
            )
    }
}