import PropTypes from 'prop-types';

function MonthEvent(props) {
    return (
        <div style={{ background: props.tempBg, }}>Hello world !</div>
    )
}

Event.propTypes = {
    tempBg: PropTypes.string.isRequired,
    test: PropTypes.object.isRequired
};

export default MonthEvent