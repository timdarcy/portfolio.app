import { v4 as uuidv4 } from 'uuid';
// Use the initialState as a default value
export default function appReducer(state, action) {

    if (state === undefined) {
        return {
            cards: {
                
            },
            lanes: {
                'lane-1': {
                    id: 'lane-1',
                    title: 'Lane 1 title',
                    cardIds: []
                },
                'lane-2': {
                    id: 'lane-2',
                    title: 'Lane 2 title',
                    cardIds: []
                },
                'lane-3': {
                    id: 'lane-3',
                    title: 'Lane 3 title',
                    cardIds: []
                }
            },
            laneOrder: ['lane-1', 'lane-2', 'lane-3']
        }
    }

    const createNewCard = (values) => {
        return {
            id: uuidv4(),
            title: values.title,
            content: values.content
        }
    }

    const createNewLane = (values) => {
        return {
            id: uuidv4(),
            title: values.title,
            cardIds: []
        }
    }

    switch (action.type) {
        case 'UPDATE_CARD':
            var newState = {
                ...state
            }
            newState.cards[action.updatedCard.id] = { ...action.updatedCard }
            return newState
        case 'UPDATE_LANE':
            var newState = {
                ...state
            }
            newState.lanes[action.updatedLane.id] = { ...action.updatedLane }
            return newState
        case 'UPDATE_STATE':
            return action.newState
        case 'ADD_NEW_CARD':
            var newCard = createNewCard(action.values);
            var newState = {
                ...state
            }
            newState.cards[newCard.id] = newCard;
            newState.lanes[action.laneId].cardIds.push(newCard.id)
            //saveToServer(newState);
            return newState;
        case 'DELETE_CARD':
            var newState = { ...state }
            delete newState.cards[action.cardId];
            var index = newState.lanes[action.laneId].cardIds.indexOf(action.cardId);
            newState.lanes[action.laneId].cardIds.splice(index, 1);
            return newState;
        case 'ADD_NEW_LANE':
            var newState = { ...state }
            var newLane = createNewLane(action.values)
            newState.lanes[newLane.id] = newLane;
            newState.laneOrder.push(newLane.id);
            return newState;
        case 'DELETE_LANE':
            var newState = { ...state }
            delete newState.lanes[action.laneId]
            var laneIndex = newState.laneOrder.indexOf(action.laneId);
            newState.laneOrder.splice(laneIndex, 1);
            return newState
        default:
            return state;
        }

}