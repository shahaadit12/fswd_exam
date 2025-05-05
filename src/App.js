import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './EventForm.js';
import EventList from './EventList.js';
import './App.css'
const App = () => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:3000/api/events')
			.then(response => setEvents(response.data))
			.catch(error => console.error(error));
	}, []);
	const handleEventAdd = (newEvent) => {
		setEvents([...events, newEvent]);
	};
	const handleEventDelete = (id) => {
		console.log("delete event " + id)
		axios.delete(`http://localhost:3000/api/events/${id}`)
			.then(
				() =>
					setEvents(events.filter(event => event._id !== id)))
			.catch(error => console.error(error));
	};
	const handleToggleReminder = (eventId) => {
		const selectedEvent =
			events.find(event => event._id === eventId);
		const updatedEvent =
		{
			...selectedEvent,
			reminder: !selectedEvent.reminder
		};
		axios.put(`http://localhost:3000/api/events/${eventId}`, updatedEvent)
			.then(response => {
				const updatedEvents = events.map(event =>
					event._id === eventId ? updatedEvent : event
				);
				setEvents(updatedEvents);
			})
			.catch(
				error =>
					console.error(`Error updating reminder status for
				event with ID ${eventId}:`, error));
	};
	const onEventEdit = (eventId, updatedData) => {
		axios.put(`http://localhost:3000/api/events/${eventId}`, updatedData)
			.then(response => {
				const updatedEvents = events.map(event =>
					event._id ===
						eventId ?
						{ ...event, ...updatedData } : event
				);
				setEvents(updatedEvents);
			})
			.catch(
				error =>
					console.error(`Error updating event with
						ID ${eventId}:`, error)
			);
	};
	return (
		<div className='main-container'>
			<h1 className='gfg'>
				GFG
			</h1>
			<h2>Event Management App</h2>
			<EventForm onEventAdd={handleEventAdd} />
			<EventList
				events={events}
				onEventDelete={handleEventDelete}
				onToggleReminder={handleToggleReminder}
				onEventEdit={onEventEdit}
			/>
		</div>
	);
};

export default App;