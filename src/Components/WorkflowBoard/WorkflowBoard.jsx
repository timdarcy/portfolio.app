import * as React from 'react';
import WorkflowLane from './WorkflowLane';
import LaneModal from './LaneModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

class WorkflowBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showNewLaneModal: false
        }
    }
    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        if (type === 'lane') {
            const newLaneOrder = Array.from(this.props.laneOrder);
            newLaneOrder.splice(source.index, 1);
            newLaneOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.props,
                laneOrder: newLaneOrder
            };
            this.props.updateState(newState)
            return
        }
        
        const startLane = this.props.lanes[source.droppableId];
        const endLane = this.props.lanes[destination.droppableId]

        if (startLane === endLane) {
            //moving in the same lane
            const newCardIds = Array.from(startLane.cardIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);

            const newLane = {
                ...startLane,
                cardIds: newCardIds
            };
            const newState = {
                ...this.props,
                lanes: {
                    ...this.props.lanes,
                    [newLane.id]: newLane
                }
            };
            this.props.updateState(newState);
            //call server here
        }
        else {
            //moving between lanes
            const startLaneIds = Array.from(startLane.cardIds)
            startLaneIds.splice(source.index, 1);
            const newStartLane = {
                ...startLane,
                cardIds: startLaneIds
            };

            const endLaneIds = Array.from(endLane.cardIds);
            endLaneIds.splice(destination.index, 0, draggableId);
            const newEndLane = {
                ...endLane,
                cardIds: endLaneIds
            };

            const newState = {
                ...this.props,
                lanes: {
                    ...this.props.lanes,
                    [newStartLane.id]: newStartLane,
                    [newEndLane.id]: newEndLane
                }
            };
            this.props.updateState(newState);
            //call server here
        };
        
    }
    handleAddLane = () => {
        this.setState({
            showNewLaneModal: true
        });
    }
    handleNewLaneModalClose = () => {
        this.setState({
            showNewLaneModal: false
        });
    }
    addNewLane = (values) => {
        this.props.addNewLane(values);
    }

    render() {
        return (
            <>
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable
                        droppableId="all-lanes"
                        direction="horizontal"
                        type="lane"
                    >
                        {(provided) => (
                            <div className="columns"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.props.laneOrder.map((laneId, index) => {
                                    const lane = this.props.lanes[laneId];
                                    const cards = lane.cardIds.map((cardId) => this.props.cards[cardId])

                                    return <WorkflowLane key={laneId} lane={lane} cards={cards} index={index}/>
                                })}
                                {provided.placeholder}
                                <button className="button is-info is-rounded is-small" onClick={this.handleAddLane}>Add Lane</button>
                            </div>
                            )}
                         
                    </Droppable>
                </DragDropContext>
                <LaneModal
                    isOpen={this.state.showNewLaneModal}
                    handleClose={this.handleNewLaneModalClose}
                    laneValues={{ title: '' }}
                    updateLaneValues={this.addNewLane}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (newState) => dispatch({ type: 'UPDATE_STATE', newState } ),
        addNewLane: (values) => dispatch({ type: 'ADD_NEW_LANE', values })
    }
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkflowBoard);