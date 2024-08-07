
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Event(props) {

    const dispatch = useDispatch()
    const test1 = useSelector((state) => state.ValidateOrder.validateOrder)
    const [SubmitValidator, setSubmitValidator] = useState(true)
    const [DeleteValidator, setDeleteValidator] = useState(true)

    function SubmitEvent() {
        console.log(SubmitValidator)
        if (SubmitValidator == true) {
            setSubmitValidator(!SubmitValidator)
            fetch('http://88.125.148.207:21000/api/iswaiting/1/plan-verif', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: props.test._id,
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Succès:', data);
                    setSubmitValidator(!SubmitValidator)
                })
                .catch(function (error) {
                    console.error('Erreur:', error);
                })
        }
    }
    function DeleteEvent() {
        console.log(DeleteValidator)
        if (DeleteValidator == true) {
            setDeleteValidator(!DeleteValidator)
            fetch('http://88.125.148.207:21000/api/iswaiting/1/plan-del', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: props.test._id,
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Succès:', data);
                    setDeleteValidator(!DeleteValidator)
                })
                .catch(function (error) {
                    console.error('Erreur:', error);
                })
        }
    }

    return (
        <>
            <div style={{ background: props.tempBg, display: "flex", width: "100%" }}>
                <div style={{ display: "flex", width: "50%", justifyContent: "space-between", alignItems: "center" }}>
                    <div
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
                        <div onClick={DeleteEvent} style={{ cursor: "pointer", width: "100%", border: "1px solid black", height: "100%" }}>
                            <i className="fa-solid fa-xmark"></i>


                        </div>
                        <div onClick={SubmitEvent} style={{ cursor: "pointer", width: "100%", border: "1px solid black", height: "100%", zIndex: "10" }}>
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
    test: PropTypes.object.isRequired
};

export default Event;