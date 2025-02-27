import React from 'react';
import FirestoreService from '../Services/FirestoreService';

// Get all Clubs return as a list
export const ClubList = () => { 
    const clubs = FirestoreService.getEventsFromCollection('Clubs');
    console.log(clubs);
    return clubs;
}