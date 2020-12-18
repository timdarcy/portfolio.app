import React from 'react'


export default class KeyMapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        document.onkeydown = (keyDown) => {
            
            keyDown.preventDefault()
            this.setState({
                keyPress: keyDown.code,
                keyCode: keyDown.keyCode
            })
        }
    }

    render(){
        return(
            <>
                <div className="small-widget-container has-text-centered">
                    <h3>Press a Key</h3>
                    <table className="table">
                        <tr>
                            <td>KeyPress</td>
                            <td>{this.state.keyPress}</td>
                        </tr>
                        <tr>
                            <td>KeyCode</td>
                            <td>{this.state.keyCode}</td>
                        </tr>
                    </table>
                </div>
                
            </>
        )
    }
}