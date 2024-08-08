
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState, useMemo, useCallback, useEffect } from 'react';
import Event from "../CustomComposants/Event"
import MonthEvent from '../CustomComposants/MonthEvent';



moment.defineLocale('fr', {
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort: 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function (hours) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // Used to determine first week of the year.
    }
});

const minTime = new Date();
minTime.setHours(18, 0, 0); // La journée commence à 11h

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


function Agenda() {
    const [myLocalEvents, setLocalEvents] = useState()
    const [getReservations, setGetReservations] = useState()
    const [getResaIncr, setResaIncr] = useState(true)
    let today = new Date



    useEffect(() => {
        fetch('http://88.125.148.207:21000/api/iswaiting/1/plan-get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const reservations = data.fastfoodPlanning.map((mmDate => {
                    let start = moment.utc(mmDate.start);
                    let end = moment.utc(mmDate.end);

                    mmDate.start = start.local().format();
                    mmDate.end = end.local().format();
                    mmDate.start = moment(start).toDate()
                    mmDate.end = moment(end).toDate()
                    return mmDate;
                }))
                setLocalEvents(reservations)
            })
            .catch(function (error) {
                console.error('Erreur:', error);
            });
    }, [getResaIncr])



    useEffect(() => {

        const ws = new WebSocket('ws://88.125.148.207:22000');

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('WebSocket message received:', message.operationType);
            setResaIncr(!getResaIncr)

        };



        ws.onerror = () => {
            console.error('Websocket error')
        }

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, [getResaIncr]);

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
                    isWaiting: true
                };
                setLocalEvents((prevEvents) => [...prevEvents, newEvent]) //ON STOCK DANS UN STATE POUR LES EVENTS LOCAUX PAS ENVOYE A LA DB ET PAS CONFIRME

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
            window.alert("Créneaux Indisponible")
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


    const CustomCompanyComponent = {

        agenda: {
            event: (e) => {
                const event = e.event;
                if (event.validation) {
                    return (
                        <Event tempBg="" test={event} />
                    );
                }

                else if (!event.validation || event.end != today) {
                    return (
                        <Event tempBg="grey" test={event} />
                    );
                }
            }

        },
        month: {
            event: (e) => {
                const event = e.event;
                if (event.end > today) {
                    return (
                        <MonthEvent tempBg="grey" test={event} />
                    );
                }
            }
        },
        day: {
            event: (e) => {
                const event = e.event;
                if (event.end > today) {
                    return (
                        <MonthEvent tempBg="grey" test={event} />
                    );
                }
            }
        },
        week: {
            event: (e) => {
                const event = e.event;
                if (event.end > today) {
                    return (
                        <MonthEvent tempBg="grey" test={event} />
                    );
                }
            }
        }
    };

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
                    agenda: true
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
                components={CustomCompanyComponent}
            />
        </div>)

}



export default Agenda;
