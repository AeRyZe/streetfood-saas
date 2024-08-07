
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/fr'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { setValidateOrder } from '../../redux/features/ValidateOrderSlice';
import Event from "../CustomComposants/Event"
import '../../assets/style.css'



const minTime = new Date();
minTime.setHours(11, 0, 0); // La journée commence à 11h

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

const dayLayoutAlgorithm = 'no-overlap'


function UserAgenda() {
    const [reservationRequest, setReservationsRequest] = useState()
    const [myLocalEvents, setLocalEvents] = useState([])
    const [DBEvents, setDBEvents] = useState()
    const [getReservations, setGetReservations] = useState()
    const ValidateOrderValue = useSelector((state) => state.ValidateOrder.validateOrder)
    const dispatch = useDispatch()

    // useEffect(() => { // Fetch qui permet de récuperer les créneaux reservé a la db.
    //     fetch('http://88.125.148.207:21000/api/reservations/1/plan-get', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             const reservations = data.fastfoodPlanning.map((mmDate => {
    //                 let start = moment.utc(mmDate.start);
    //                 let end = moment.utc(mmDate.end);

    //                 mmDate.start = start.local().format();
    //                 mmDate.end = end.local().format();
    //                 mmDate.start = moment(start).toDate()
    //                 mmDate.end = moment(end).toDate()
    //                 return mmDate;
    //             }))
    //             setGetReservations(reservations)
    //         })
    //         .catch(function (error) {
    //             console.error('Erreur:', error);
    //         });
    // }, [])

    useEffect(() => { // Bout de code qui permet d'éviter les doublons'
        if (getReservations) {
            const onlyResa = [...myLocalEvents, ...getReservations].reduce((acc, current) => {
                const x = acc.find(resa => resa._id === current._id)
                if (!x) {
                    return acc.concat([current])

                } else {
                    return acc
                }
            }, [])
            setLocalEvents(onlyResa)
        }
    }, [getReservations]);



    const handleSelectSlot = useCallback(
        ({ start, end }) => { // ETANT DONNE QUE LA METHOD DE BIG CALENDAR POUR SELECTEVENT RETOURNE START ET END ET PAS DAUTRES NORMAL QUICI IL Y A QUE START END
            const popup = window.prompt('Nouveau Crénaux')
            if (popup) {
                console.log(popup)
                let newEvent = { // ICI SON NOTE LES PROPRIETES DES EVENTS DE MANIERE GENERALE
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

                setLocalEvents((prevEvents) => [...prevEvents, newEvent]) //ON STOCK DANS UN STATE POUR LES EVENTS LOCAUX PAS ENVOYE A LA DB ET PAS CONFIRME
                setDBEvents(newEvent) // ON SETUP UN STATE POUR SAVOIR SI ON LE GARDE OU LE REFUSE DANS L'AgENDA

                // setReservationsRequest({
                //     start: start.toUTCString(),
                //     end: end.toUTCString(),
                //     title: title,
                // })
            }
        },
        []

    )


    const handleSelectEvent = useCallback(
        (event) => {
            window.alert(event.isWaiting)
        }

        , []
    )

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(),
            scrollToTime: new Date(),
        }),
        []
    )


    useEffect(() => {
        if (ValidateOrderValue == true) {
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
                    dispatch(setValidateOrder(null))
                })
                .catch(function (error) {
                    console.error('Erreur:', error);
                });
        }
    }, [ValidateOrderValue])


    const CustomUserComponents = {

        agenda: {
            event: () => {
                if (myLocalEvents.isWaiting == true || DBEvents.isWaiting == true) {
                    return (
                        <Event tempBg="grey" />
                    )
                }

                else {
                    return (
                        <Event tempBg="#F1F1F1F1" />
                    )
                }



            }
        }

    }

    return (
        <div style={{ display: "flex" }}>
            <Calendar
                dayLayoutAlgorithm={dayLayoutAlgorithm}
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
        </div>)

}



export default UserAgenda;
