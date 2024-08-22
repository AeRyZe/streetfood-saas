
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';


function Event(props) {

    const [SubmitValidator, setSubmitValidator] = useState(true)
    const [DeleteValidator, setDeleteValidator] = useState(true)
    const [ModifyValidator, setModifyValidator] = useState(true)
    const sessionToken = sessionStorage.getItem("token")
    console.log(sessionToken)
    const reduxId = useSelector((state) => state.CompanyProfile.idv);
    console.log(reduxId)
    function SubmitEvent() {
        console.log(SubmitValidator)
        if (SubmitValidator == true) {
            setSubmitValidator(!SubmitValidator)
            fetch(`http://88.125.148.207:21000/api/iswaiting/${reduxId}/plan-verif`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
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
            fetch(`http://88.125.148.207:21000/api/iswaiting/${reduxId}/plan-del`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
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

    function ModifyEvent() {
        const actualstart = new Date(props.test.start)
        const actualend = new Date(props.test.end)
        if (ModifyValidator == true) {
            const popup = window.prompt('Combien de minutes de retard ?')
            if (popup) {
                actualstart.setMinutes(actualstart.getMinutes())
                actualend.setMinutes(actualstart.getMinutes() + parseInt(popup / 2))
                console.log(actualstart)
                console.log(props.test._id)
                fetch(`http://88.125.148.207:21000/api/iswaiting/${reduxId}/plan-edit`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionToken}`
                    },
                    body: JSON.stringify({
                        start: actualstart,
                        end: actualend,
                        _id: props.test._id,
                    })
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('Succès:', data);
                        setModifyValidator(!ModifyValidator)
                    })
                    .catch(function (error) {
                        console.error('Erreur:', error);
                    })
                setModifyValidator(!ModifyValidator)
            }
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
                        <div onClick={ModifyEvent} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", width: "100%", border: "1px solid black", height: "100%" }}>
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <div onClick={DeleteEvent} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", width: "100%", border: "1px solid black", height: "100%" }}>
                            <i className="fa-solid fa-xmark"></i>


                        </div>
                        <div onClick={SubmitEvent} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", width: "100%", border: "1px solid black", height: "100%", zIndex: "10" }}>
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