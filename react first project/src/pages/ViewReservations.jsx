import {useState,useEffect} from 'react';

function ViewReservations() {
    const[reservations,setReservations]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/api/reservations")
        .then((res)=>res.json())
        .then((data)=>setReservations(data))
        .catch((err)=> console.log(err));
    },[]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Reservations</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Guests</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Table</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.name}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.phone}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.guests}</td>
                            <td>{reservation.table_number}</td>
                            <td>{reservation.capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewReservations;