import React from 'react';
import {Draggable, DraggableStateSnapshot, DraggableProvided} from 'react-beautiful-dnd';
import CardModal from './CardModal';
import { connect } from 'react-redux';

class WorkflowCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showEditModal: false
        }
    }

    handleUpdateCardValues = (values) => {
        var newCard = {
            ...this.props.card,
            title: values.title,
            content: values.content
        }
        this.props.updateCard(newCard)
    }
    handleModalOpen = () => {
        this.setState({
            showEditModal: true
        });
    }
    handleModalClose = () => {
        this.setState({
            showEditModal: false
        });
    }
    handleCardDelete = () => {
        this.props.deleteCard(this.props.card.id, this.props.laneId)
    }

    render(){
        return (
            <>
                <Draggable
                    draggableId={this.props.card.id} 
                    index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <a className="delete" onClick={this.handleCardDelete}></a>
                            <h3>{this.props.card.title}</h3>
                            <p>{this.props.card.content}</p>
                            <button className="button is-warning is-rounded is-small" onClick={this.handleModalOpen}>Edit</button>
                        </div>
                    )}
                
                </Draggable>
                <CardModal
                    isOpen={this.state.showEditModal}
                    handleClose={this.handleModalClose}
                    cardValues={{ title: this.props.card.title, content: this.props.card.content }}
                    updateCardValues={this.handleUpdateCardValues}
                />
             </>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCard: (updatedCard) => dispatch({ type: 'UPDATE_CARD', updatedCard }),
        deleteCard: (cardId, laneId) => dispatch({ type: 'DELETE_CARD', cardId, laneId})
    }
    
}

export default connect(
    null,
    mapDispatchToProps
)(WorkflowCard);