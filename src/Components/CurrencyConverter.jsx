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
        this.updateAmount = this.updateAmount.bind(this);
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


    convertCurrency() {

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
        this.setState({ [event.target.name]: event.target.value }, this.convertCurrency);
    }

    updateAmount(event){
        this.setState({amountFrom: event.target.value}, this.convertCurrency)
    }

    render() {
        return (

                <div className="small-widget-container">
                    
                        <div className="field">
                            <label>Select current currency</label>
                        </div>
                        <div className="field">
                            <div className="control">
                                <div className="select">
                                    <select  name="currencyFrom" value={this.state.currencyFrom} onChange={this.handleSelect}>
                                        {this.state.currencies.map((name, index) => {
                                            return <option key={index} value={name} >{name}</option>
                                        })}
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                        <div className="field">
                            <label>Amount</label>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="number" name="amountFrom" step="any" value={this.state.amountFrom} onChange={this.updateAmount}/>
                            </div>
                        </div>

                        <div className="field">
                            <label>Select target currency</label>
                        </div>
                        <div className="field">
                            <div className="control">
                                <div className="select">
                                    <select  name="currencyTo" value={this.state.currencyTo} onChange={this.handleSelect}>
                                        {this.state.currencies.map((name, index) => {
                                            return <option key={index} value={name} >{name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <label>Converted Amount:</label> <br />
                        <p>$ {this.state.amountTo}</p>
                    
                </div>
            
        );
    }
}