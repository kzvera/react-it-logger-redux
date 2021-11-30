import { GET_TECHS, ADD_TECH, DELETE_TECH, SET_LOADING, TECHS_ERROR } from "./types";

export const getTechs = () => async dispatch => {
    try {
        setLoading()

        const res = await fetch('https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/techs.json');
        const data = await res.json();

        const techs = [];

        for (const key in data) {
            const tech = {
                id: key,
                firstName: data[key].firstName,
                lastName: data[key].lastName,
                employeeId: data[key].employeeId
            }

            techs.push(tech);
        }

        dispatch({
            type: GET_TECHS,
            payload: techs
        })
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const addTech = (tech) => async dispatch => {
    try {
        setLoading();
                
        const res = await fetch('https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/techs.json', {
            method: 'POST',
            body: JSON.stringify(tech),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        const newTech = { ...tech, id: data.name }

        dispatch({
            type: ADD_TECH,
            payload: newTech
        })
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const deleteTech = (id) => async dispatch => {
    try {
        setLoading()

        await fetch(`https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/techs/${id}.json`, {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_TECH,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}