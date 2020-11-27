import React, { Component } from 'react';
import Axios from 'axios';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);
        this.state = { currencies: ["AUD", "USD", "EUR", "GBP"], currencyFrom: "AUD", currencyTo: "AUD", amountFrom: 0, amountTo: 0 }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

        
    }
    


    handleSubmit(event) {
        event.preventDefault();
        //fixer.io api key
        const apiKey = "12980df91b59f4a5256ec5001c31178f";

        let apiAddress = "http://data.fixer.io/api/latest";
        let requestAddress = apiAddress + "?access_key=" + apiKey;
        Axios.get(requestAddress).then((response) => {
            //console.log(response.data.rates);
            let fromRate = response.data.rates[this.state.currencyFrom];
            let toRate = response.data.rates[this.state.currencyTo];
            //returned values are conversion to euro due to api restrictions
            let euro =  this.state.amountFrom / fromRate;
            let conversion = euro * toRate;
            this.setState({ amountTo: conversion.toFixed(3) })
        });
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

export default CurrencyConverter;