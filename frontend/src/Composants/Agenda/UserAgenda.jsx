import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/fr';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { setValidateOrder } from '../../redux/features/ValidateOrderSlice';
import Event from "../CustomComposants/Event";
import '../../assets/style.css';
import { useNavigate } from 'react-router-dom';

const minTime = new Date();
minTime.setHours(18, 0, 0); // La journée commence à 18h

const maxTime = new Date();
maxTime.setHours(23, 59, 59); // La journée finit à 23h59

const localizer = momentLocalizer(moment);
const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: "Aujourd'hui",
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    noEventsInRange: "Aucun événement dans cette plage de dates.",
    showMore: total => `+ ${total} événement(s) supplémentaire(s)`,
};

const dayLayoutAlgorithm = 'no-overlap';

function UserAgenda() {
    const [reservationRequest, setReservationsRequest] = useState();
    const [myLocalEvents, setLocalEvents] = useState([]);
    const [DBEvents, setDBEvents] = useState();
    const [getReservations, setGetReservations] = useState();
    const ValidateOrderValue = useSelector((state) => state.ValidateOrder.validateOrder);
    const dispatch = useDispatch();
    const reduxToken = useSelector((state) => state.UserProfile.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!reduxToken) return; // Attendre que le token soit disponible

        const sessionToken = sessionStorage.getItem("token");

        if (sessionToken === reduxToken) {
            // Les tokens correspondent, exécutez votre fonction
            if (ValidateOrderValue === true) {
                fetch('http://88.125.148.207:21000/api/reservations/1/plan-add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fastfoodId: "1",
                        start: reservationRequest.start,
                        end: reservationRequest.end,
                        title: reservationRequest.title
                    })
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('Succès:', data);
                        dispatch(setValidateOrder(null));
                    })
                    .catch(function (error) {
                        console.error('Erreur:', error);
                    });
            }
        } else {
            console.error('Les tokens ne correspondent pas');
            navigate("/login/clients"); // Rediriger l'utilisateur vers la page de login
        }
    }, [ValidateOrderValue, reduxToken, navigate]);

    useEffect(() => {
        if (getReservations) {
            const onlyResa = [...myLocalEvents, ...getReservations].reduce((acc, current) => {
                const x = acc.find(resa => resa._id === current._id);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setLocalEvents(onlyResa);
        }
    }, [getReservations]);

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const popup = window.prompt('Nouveau Crénaux');
            if (popup) {
                let newEvent = {
                    start: start,
                    end: end,
                    title: popup,
                };
                fetch('http://88.125.148.207:21000/api/iswaiting/1/plan-add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fastfoodId: "1",
                        start: start,
                        end: end,
                        title: popup
                    })
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('Succès:', data);
                    })
                    .catch(function (error) {
                        console.error('Erreur:', error);
                    });

                setLocalEvents((prevEvents) => [...prevEvents, newEvent]);
                setDBEvents(newEvent);
            }
        },
        []
    );

    const handleSelectEvent = useCallback(
        (event) => {
            window.alert("Créneaux Indisponible");
        },
        []
    );

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(),
            scrollToTime: new Date(),
        }),
        []
    );

    const CustomUserComponents = {
        agenda: {
            event: () => {
                if (myLocalEvents.isWaiting === true || DBEvents.isWaiting === true) {
                    return (
                        <Event tempBg="grey" />
                    );
                } else {
                    return (
                        <Event tempBg="#F1F1F1F1" />
                    );
                }
            }
        }
    };

    if (!reduxToken) {
        return (
            <button onClick={() => { navigate("/login/clients") }}>Accueil</button>
        );
    }


    return (
        <div style={{ display: "flex" }}>
            <Calendar
                dayLayoutAlgorithm={dayLayoutAlgorithm}
                step={5}
                localizer={localizer}
                views={{
                    month: true,
                    day: true,
                    week: true,
                }}
                defaultView='week'
                events={myLocalEvents}
                defaultDate={defaultDate}
                scrollToTime={scrollToTime}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                startAccessor="start"
                endAccessor="end"
                style={{ height: "90vh", width: "90vw" }}
                messages={messages}
                min={minTime}
                max={maxTime}
                timeslots={1}
                components={CustomUserComponents}
            />
        </div>
    );
}

export default UserAgenda;
