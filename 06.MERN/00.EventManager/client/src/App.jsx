
import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react'
import formatDateTime from './utils/fomatDate';
/*eslint-disable */
const App = () => {
  const [events, setEvents] = useState([]);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  useEffect(()=>{
    try{
       axios.get('http://localhost:3000/events')
    .then((response)=>{
      console.log(response);
      const sortedEvents = response.data.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      });
      setEvents(sortedEvents);
    })
    }catch(e){
      console.log(e);
      console.log(e.message);
    }
   
  },[]);

  const getEventsByDay = (day) => 
  {
    return events.filter((event)=>{
      const eventDate=new Date(event.date);
      return daysOfWeek[eventDate.getDay()]===day;
  })
};

  return (
    <>
    <div>
    <div className="calendar-container">
      {daysOfWeek.map((day) => (
        <div key={day} className="day-row">
          <div className="day-name">{day}</div>
          <div className="day-events">
            {getEventsByDay(day).map((event, index) => (
              <div key={index} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-timing">
                <span>{formatDateTime(event.date).date}</span>
                <span>{formatDateTime(event.date).time}</span>
              </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  )
}

export default App;