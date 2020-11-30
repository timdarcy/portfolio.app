import React from 'react'
import { Droppable,  Draggable } from 'react-beautiful-dnd';
import LaneModal from './LaneModal';
import CardModal from './CardModal';
import WorkflowCard from './WorkflowCard';

export default class WorkflowLane extends React.Component{
    construction(props){
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
        this.props.actions.updateLane(newLane)
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
        this.props.actions.addNewCard(this.props.lane.id, values);
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
        this.props.actions.updateLane(newLane)
    }

    handleDeleteLane = () => {
        this.props.actions.deleteLane(this.props.lane.id)
    }

    render() {
        return (
            <>
                <Draggable
                    draggableId={this.props.lane.id}
                    index={this.props.index}
                >
                    {(provided) => (
                        <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                        >
                            <a className="delete" onClick={this.handleDeleteLane}></a>
                            <h3
                                {...provided.dragHandleProps}
                            >{this.props.lane.title}</h3>
                            
                            <Droppable
                                droppableId={this.props.lane.id}
                                type="card"
                            >
                                {(provided, snapshot) => (
                                    <>
                                        <div
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