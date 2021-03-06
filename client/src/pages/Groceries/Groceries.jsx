// phase 2
import axios from 'axios';
// import GroceryTable from '../../components/GroceryTable/GroceryTable';

import React, { Component } from 'react'
import { API_URL } from '../../config';

export class Groceries extends Component {

    state = {
        groceries: null,
        groceriesActive: false,
        summary: '',
        token: ''
    }

    componentDidMount = () => {
        
        axios
            .all([
                axios.get(API_URL + "/groceries"),
            ])
            .then(axios.spread((response1) => {
                this.setState({
                    groceries: response1.data,
                })
            }))
    }

    toggleClass = () => {
        const currentState = this.state.groceriesActive;
        this.setState({ groceriesActive: !currentState });
    };

    addToSummary = (grocery, qty) => {

        let groceryItem = {};
        groceryItem.food = grocery.food
        groceryItem.carbon = grocery.carbon * qty
        groceryItem.land = grocery.land * qty
        groceryItem.water = grocery.water * qty
        groceryItem.pollutants = grocery.pollutants * qty

        this.setState({
            summary: [...this.state.summary, groceryItem]
        }, () => {
            console.log(this.state.summary)
        })
    }

    render() {
        if (!this.state.groceries) {
            return <p>Loading...</p>
        }
        return (
            <div>
                <button className={`activities__collapsible ${this.state.groceriesActive ? "activities__active" : ""}`} 
                    onClick={this.toggleClass}>
                    <h2>+ groceries</h2>
                </button>
                <div className={this.state.groceriesActive ? "activities__content-expanded" : "activities__content-collapsed"}>
                    {/* <GroceryTable groceries={this.state.groceries} addToSummary={this.addToSummary}/> */}
                </div>
                
            </div>
        )
    }
}

export default Groceries
