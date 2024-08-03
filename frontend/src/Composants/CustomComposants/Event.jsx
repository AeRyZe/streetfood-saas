
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setValidateOrder } from '../../redux/features/ValidateOrderSlice';


function Event(props) {

    const dispatch = useDispatch()
    const test = useSelector((state) => state.ValidateOrder.validateOrder)
    const HandleClickOrder = () => {
        dispatch(setValidateOrder(true))
        console.log(test)


    }
    return (
        <>
            <div style={{ background: props.tempBg, display: "flex", width: "100%" }}>
                <div style={{ display: "flex", width: "50%", justifyContent: "space-between", alignItems: "center" }}>
                    <div
                        onContextMenu={(e) => { e.preventDefault(); console.log("oui chef"); }}
                        style={{}}
                    >
                        Gregory Thaillandier
                    </div>
                </div>
                <div style={{ display: "flex", width: "50%", justifyContent: "flex-end", alignContent: "center" }}>
                    <div style={{ display: "flex", width: "50%", height: "100%", gap: "15px" }}>
                        <div style={{ cursor: "pointer", width: "100%", border: "1px solid black", height: "100%" }}>
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <div style={{ cursor: "pointer", width: "100%", border: "1px solid black", height: "100%" }}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div onClick={HandleClickOrder} style={{ cursor: "pointer", width: "100%", border: "1px solid black", height: "100%" }}>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Event.propTypes = {
    tempBg: PropTypes.string.isRequired,
};

export default Event;