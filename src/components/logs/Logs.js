import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading, filtered }, getLogs }) => {
    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, []);

    if (loading || logs === null) {
        return <Preloader />
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {!loading && logs.length === 0 ? (<p className="center">No logs to show...</p>) : 
                filtered !== null ? filtered.map(log => <LogItem log={log} key={log.id} />) : logs.map(log => <LogItem log={log} key={log.id} />)}
        </ul>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    filtered: PropTypes.object,
    getLogs: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    log: state.log,
    filtered: state.filtered
})

export default connect(mapStateToProps, { getLogs })(Logs)