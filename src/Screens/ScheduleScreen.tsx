// src/Screens/ScheduleScreen.tsx
import React, { useContext, useEffect } from 'react';
import CalenderAgenda from '../Components/Calendars/CalenderAgenda';
import { AppContext } from '../Context/AppContext';

const ScheduleScreen = React.memo(() => {
  const {user} = useContext(AppContext);
  
  // Check if user is not null
  useEffect(() => {
    if (!user) {
        console.log('ERROR: User not found');
    }
  }, [user]);

  
  return (
    <CalenderAgenda
      rootCollection="Events"
      eventDocs="PersonalEvents"
      eventCollection={user?.email || "useremail@ucsd.edu"} // Dynamic email
    />
  );
});

export default ScheduleScreen;