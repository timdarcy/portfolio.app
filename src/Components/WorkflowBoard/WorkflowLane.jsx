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
                            <header className="card-header" {...provided.dragHandleProps}>
                                
                                <h3 className="card-header-title">{this.props.lane.title}</h3>
                                <a href="#" className="card-header-icon" onClick={this.handleDeleteLane}>
                                    <span class="icon">
                                        <i class="delete" aria-hidden="true"></i>
                                    </span>
                                </a>
                                
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
                                        >

                                            {this.props.cards.map((card, index) => <WorkflowCard key={card.id} card={card} index={index} laneId={this.props.lane.id}/>)}
                                            {provided.placeholder}
                                        </div>
                                        <footer class="card-footer">
                                            <a href="#" class="card-footer-item"onClick={this.handleAddCard}>Add Card</a>
                                            <a href="#" class="card-footer-item" onClick={this.handleEditLane}>Edit</a>
                                        </footer>
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