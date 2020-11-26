import React from 'react';
import CurrencyConverter from './CurrencyConverter';
class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currencyCalculator: false,
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
                    <h1>CurrencyCalculator On</h1>
                    <CurrencyConverter/>
                </>
            )
        }
        else if(this.state.keyMapper){
            return <h1>KeyMapper On</h1>
        }
        else if(this.state.workFlowBoard){
            return <h1>WorkFlowBoard On</h1>
        }
        else{
            return <h1>Nothing selected</h1>
        }
    }

    render(){
        return(
        <>
            <div className="tabs is-centered">
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

export default Projects;
