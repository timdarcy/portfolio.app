import React from 'react'
import { Droppable,  Draggable } from 'react-beautiful-dnd';
import LaneModal from './LaneModal';
import CardModal from './CardModal';
import WorkflowCard from './WorkflowCard';
import { connect } from 'react-redux';

class WorkflowLane extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showCardModal: false,
            showLaneModal: false
        }
    }

    handleTitleChange = (event) => {
        var newLane = {
            ...this.props.lane,
            ['title']: event.target.value
        }
        this.props.updateLane(newLane)
    }

    handleAddCard = () => {
        this.setState({
            showCardModal: true
        });
    }

    handleCardModalClose = () => {
        this.setState({
            showCardModal: false
        });
    }
    handleUpdateCardValues = (values) => {
        this.props.addNewCard(this.props.lane.id, values);
    }
    handleEditLane = () => {
        this.setState({
            showLaneModal: true
        });
    }
    handleLaneModalClose = () => {
        this.setState({
            showLaneModal: false
        });

    }
    handleUpdateLaneValues = (values) => {
        var newLane = {
            ...this.props.lane,
            title: values.title
        }
        this.props.updateLane(newLane)
    }

    handleDeleteLane = () => {
        this.props.deleteLane(this.props.lane.id)
    }

    render() {
        return (
            <>
                <Draggable
                    draggableId={this.props.lane.id}
                    index={this.props.index}
                >
                    {(provided) => (
                        <div className="card workflow-lane"
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                        >
                            <header class="card-header" {...provided.dragHandleProps}>
                                <a className="delete" onClick={this.handleDeleteLane}></a>
                                <h3>{this.props.lane.title}</h3>
                            </header>
                            
                            
                            <Droppable
                                droppableId={this.props.lane.id}
                                type="card"
                            >
                                {(provided, snapshot) => (
                                    <>
                                        <div className="cardList"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            isDraggingOver={snapshot.isDraggingOver}
                                        >

                                            {this.props.cards.map((card, index) => <WorkflowCard key={card.id} card={card} index={index} laneId={this.props.lane.id}/>)}
                                            {provided.placeholder}
                                        </div>
                                        <button className="button is-info is-rounded is-small" onClick={this.handleAddCard}>Add Card</button>
                                        <button className="button is-warning is-rounded is-small" onClick={this.handleEditLane}>Edit Lane</button>
                                    </>
                                )}

                            </Droppable>
                        </div>
                        )
                    }
                </Draggable>
                <CardModal
                    isOpen={this.state.showCardModal}
                    handleClose={this.handleCardModalClose}
                    cardValues={{ title: '', content: '' }}
                    updateCardValues={this.handleUpdateCardValues}
                />
                <LaneModal
                    isOpen={this.state.showLaneModal}
                    handleClose={this.handleLaneModalClose}
                    laneValues={{ title: this.props.lane.title}}
                    updateLaneValues={this.handleUpdateLaneValues}
                />

            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLane: (updatedLane) => dispatch({ type: 'UPDATE_LANE', updatedLane}),
        addNewCard: (laneId, values) => dispatch({ type: 'ADD_NEW_CARD', laneId, values}),
        deleteLane: (laneId) => dispatch({ type: 'DELETE_LANE', laneId})
    }
    
}

export default connect(
    null,
    mapDispatchToProps
)(WorkflowLane);