import { deleteDoc, collection, doc, getDocs, getDoc, setDoc, addDoc, Timestamp, writeBatch } from 'firebase/firestore';
import { EventData } from '../Types/Interfaces';
import { db, auth } from './FirebaseConfig';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { AgendaSchedule } from 'react-native-calendars';
import { readFile } from 'react-native-fs';

const FirestoreService = {
  getEventsFromCollection: async (...paths: string[]) => {
    try {
      // Dynamically create the reference by joining the paths
      const ref = collection(db, paths.join('/'));
      const snapshot = await getDocs(ref);

      if (snapshot.empty) {
        console.log('No documents found');
        return [];
      }

      // Map documents to an array of data
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EventData[];
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  },
  getEventById: async (...paths: string[]) => {
    try {
      // Get the document reference using the collection and document ID
      const docRef = doc(db, paths.join('/'));
      
      // Fetch the document
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // If the document exists, return the data
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as EventData;
      } else {
        // If the document doesn't exist, return null
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      return null;
    }
  },
  updateDocField : async (fieldName: string, value: any, ...paths: string[]) => {
    try {
      // Construct reference for the document
      const ref = doc(db, paths.join('/')); 
      // Update the specific field or create the document with that field
      await setDoc(ref, { [fieldName]: value }, { merge: true });
  
      return ref.id; 
    } catch (error) {
      console.error('Error adding or updating event field: ', error);
      throw new Error('Error adding or updating event field');
    }
  },
  // Function to add a new event to Firestore
  addEventToCollection: async (eventData: EventData, ...paths: string[]) => {
    try {
      const ref = collection(db, paths.join('/'));
      // Add a new document with auto-generated ID
      const docRef = await addDoc(ref, eventData);
      console.log("Document added with ID: ", docRef.id);
      // update the document with the ID
      await FirestoreService.updateDocField('id', docRef.id, ...paths, docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw new Error('Error adding event');
    }
  },

  // Function to update an existing event in Firestore
  updateEventInCollection: async (eventId: string, eventData: EventData, ...paths: string[]) => {
    try {
      const docRef = doc(db, paths.join('/'), eventId);
      // Update the document with the new data
      await setDoc(docRef, eventData, { merge: true });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error('Error updating document: ', error);
      throw new Error('Error updating event');
    }
  },

  // Function to delete an event from Firestore
  deleteEventFromCollection: async (eventId: string, ...paths: string[]) => {
    try {
      // Construct the document reference using the paths and eventId
      const docRef = doc(db, paths.join('/'), eventId);
  
      // Delete the document using deleteDoc
      await deleteDoc(docRef);
  
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error('Error deleting document: ', error);
      throw new Error('Error deleting event');
    }
  },

  createTimestampFromTimeString : (timeString: string, selectedDate: string) => {
    // Combine the current date with the time string
    const dateTimeString = `${selectedDate} ${timeString}`;
    
    // Create a new Date object with the combined string
    const date = new Date(dateTimeString);
    
    // Check if the date is valid before creating the Firestore Timestamp
    if (isNaN(date.getTime())) {
      console.error('Invalid Date:', dateTimeString);
      return null;
    }
    
    return Timestamp.fromDate(date); // Return the Firestore Timestamp
  },

  fetchGlobalEvents : async () => {
    const { globalEvents, setGlobalEvents } = useContext(AppContext);
    try {
      const eventsList = await FirestoreService.getEventsFromCollection(
        'Events', 
        'GlobalEvents',
        'Date'
      );
      if (eventsList.length === 0) {
        setGlobalEvents({});
        return;
      }
      
      const formattedEvents: AgendaSchedule = {};
      for (const eventDate of eventsList) {
        const dailyEvents = await FirestoreService.getEventsFromCollection(
          'Events', 'GlobalEvents', 'Date', eventDate.id, 'DailyAgenda'
        );
        
        dailyEvents.forEach(event => {
          const startDate = event.StartTime instanceof Timestamp ? event.StartTime.toDate() : new Date(event.StartTime);
          const dateKey = startDate.toLocaleDateString('en-CA');
          
          if (!formattedEvents[dateKey]) formattedEvents[dateKey] = [];
          formattedEvents[dateKey].push({
            ...event,
            day: startDate.toLocaleTimeString(),
            name: event.EventName,
            height: 50, 
          });
        });
      }
      
      setGlobalEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  },
  uploadClubsToFirestore: async (clubsData: any) => {
    try {
        // Validate that the parsed data is an array
        if (!Array.isArray(clubsData)) {
            throw new Error('Invalid JSON format: Expected an array of objects.');
        }

        // Upload each club to Firestore
        const batch = writeBatch(db);
        const clubsCollection = collection(db, 'Clubs');

        clubsData.forEach((club) => {
            if (club.Name) {
              const sanitizedClubName = club.Name.includes('/') 
              ? club.Name.replace(/\//g, '_') 
              : club.Name;
                const docRef = doc(clubsCollection, sanitizedClubName);
                batch.set(docRef, club);
            } else {
                console.warn('Skipping an entry due to missing "Name" field:', club);
            }
        });

        // Commit the batch write to Firestore
        await batch.commit();
        console.log('All clubs uploaded successfully!');
    } catch (error) {
        console.error('Error uploading club data:', error);
    }
  },
};

export default FirestoreService;
