import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import KeyMapper from './KeyMapper';
import WorkflowBoard from './WorkflowBoard/WorkflowBoard';
import { Provider } from 'react-redux'
import store from './Redux/store'

export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currencyCalculator: true,
            keyMapper: false,
            workFlowBoard: false
        }
    }
    handleCurrencyCalulator = () => {
        this.setState({
            currencyCalculator: true,
            keyMapper: false,
            workFlowBoard: false
        })
    }

    handleKeyMapper = () => {
        this.setState({
            currencyCalculator: false,
            keyMapper: true,
            workFlowBoard: false
        })
    }

    handleWorkFlowBoard = () => {
        this.setState({
            currencyCalculator: false,
            keyMapper: false,
            workFlowBoard: true
        })
    }
    displayActiveProject = () => {
        if (this.state.currencyCalculator){
            return (
                <>
                    <CurrencyConverter/>
                </>
            )
        }
        else if(this.state.keyMapper){
            return (
                <>
                    <KeyMapper/>
                </>
            )
        }
        else if(this.state.workFlowBoard){
            return (
                <>
                    <Provider store={store}>
                        <WorkflowBoard/>
                    </Provider>
                    
                </>
                )
        }
    }

    render(){
        return(
        <>
            <div className="tabs is-centered projects">
                <ul>
                    <li className={this.state.currencyCalculator ? "is-active" : ""} onClick={this.handleCurrencyCalulator}><a>Currency Calculator</a></li>
                    <li className={this.state.keyMapper ? "is-active" : ""} onClick={this.handleKeyMapper}><a>Key Mapper</a></li>
                    <li className={this.state.workFlowBoard ? "is-active" : ""} onClick={this.handleWorkFlowBoard}><a>Work Flow Board</a></li>
                </ul>
            </div>

            <div className="is-centered">
                {this.displayActiveProject()}
            </div>
            
        </>
        )
    }
}
