import { v4 as uuid } from 'uuid'
import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS } from './types'

export const getLogs = () => async dispatch => {
    try {
        setLoading()

        const res = await fetch('https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/logs.json');
        const data = await res.json();

        const logs = [];

        for (const key in data) {
            const log = {
                id: key,
                attention: data[key].attention,
                date: data[key].date,
                message: data[key].message,
                tech: data[key].tech,
                logId: data[key].logId
            }

            logs.push(log);
        }

        dispatch({
            type: GET_LOGS,
            payload: logs
        })
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        })
    }
}

export const addLog = (log) => async dispatch => {
    try {
        setLoading();

        const res = await fetch('https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/logs.json', {
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        const newLog = { ...log, id: data.name, logId: uuid() }

        dispatch({
            type: ADD_LOG,
            payload: newLog
        })
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const deleteLog = (id) => async dispatch => {
    try {
        setLoading()

        await fetch(`https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/logs/${id}.json`, {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_LOG,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const updateLog = (log) => async dispatch => {
    try {
        setLoading()

        const res = await fetch(`https://react-it-logger-redux-3a52b-default-rtdb.firebaseio.com/logs/${log.id}.json`, {
            method: 'PUT',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        dispatch({
            type: UPDATE_LOG,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const searchLogs = (text) => async dispatch => {
    try {
        setLoading()

        dispatch({
            type: SEARCH_LOGS,
            payload: text
        })
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.statusText
        })
    }
}

export const setCurrent = (log) => {
    return {
        type: SET_CURRENT,
        payload: log
    }
}

export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}