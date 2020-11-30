import React, { Component } from 'react';
import Axios from 'axios';

export default class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currencies: ["AUD"],
            currencyFrom: "AUD",
            currencyTo: "AUD",
            amountFrom: 0,
            amountTo: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

        
    }
    componentDidMount(){
        //get exchange rates on load and store
        let apiAddress = "https://api.exchangeratesapi.io/latest";
        let requestAddress = apiAddress;
        Axios.get(requestAddress).then((response) => {
            this.setState({
                rates: response.data.rates,
                baseCurrency: response.data.base,
                currencies: Object.keys(response.data.rates).sort()
            })
        })
    }


    handleSubmit(event) {
        event.preventDefault();

        let fromRate = this.state.rates[this.state.currencyFrom];
        let baseValue =  this.state.amountFrom / fromRate;
        if (this.state.currencyTo === this.state.baseCurrency){
            this.setState({ amountTo: baseValue.toFixed(3) })
        }
        else{
            let toRate = this.state.rates[this.state.currencyTo];
            let conversion = baseValue * toRate;
            this.setState({ amountTo: conversion.toFixed(3) })
        }
        
    }

    handleSelect(event) {
        console.log(event.target.name, event.target.value);
        this.setState({ [event.target.name]: event.target.value });

    }

    handleInput(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Select current currency</label><br />
                <select name="currencyFrom" value={this.state.currencyFrom} onChange={this.handleSelect}>
                    {this.state.currencies.map((name, index) => {
                        return <option key={index} value={name} >{name}</option>
                    })}
                </select><br />

                <input type="number" name="amountFrom" step="any" onChange={this.handleInput}/> <br />
                <label>Select target currency</label> <br />
                <select name="currencyTo" value={this.state.currencyTo} onChange={this.handleSelect}>
                    {this.state.currencies.map((name, index) => {
                        return <option key={index} value={name} >{name}</option>
                    })}
                </select><br />

                <input type="submit" value="Convert" onChange={this.handleInput} /><br />
                <label>Converted Amount:</label> <br />
                <div type="number" name="amountFrom" onChange={this.handleInput}>${this.state.amountTo}</div>
            </form >
        );
    }
}