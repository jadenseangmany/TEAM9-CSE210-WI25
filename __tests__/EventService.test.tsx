test.todo('Fix tests for this module');
// import { addEvent, updateEvent, deleteEvent } from '../src/Services/EventService';
// import { Event } from '../src/Components/Types/Interfaces';

// describe('EventModel Functions', () => {
//   let eventList: Event[] = [];
//   beforeEach(() => {
//     // Reset eventList before each test
//     eventList.length = 0;
//     eventList.push(
//       {
//         id: '1',
//         title: 'Campus Comedy Night',
//         date: '2025-02-16',
//         time: '8:00 PM',
//         attendees: 45,
//         image: 'https://picsum.photos/100/100',
//         category: 'Entertainment',
//         type: 'Social',
//         isMine: false,
//       },
//       {
//         id: '2',
//         title: 'AI Research Symposium',
//         date: '2025-02-17',
//         time: '2:00 PM',
//         attendees: 120,
//         image: 'https://picsum.photos/100/100',
//         category: 'Academic',
//         type: 'Conference',
//         isMine: true,
//       }
//     );
//   });

//   test('addEvent should add a new event to eventList', () => {
//     addEvent({
//       title: 'Music Concert',
//       date: '2025-02-20',
//       time: '7:00 PM',
//       attendees: 200,
//       category: 'Entertainment',
//       type: 'Concert',
//     });

//     expect(eventList.length).toBe(3);
//     expect(eventList[2].title).toBe('Music Concert');
//     expect(eventList[2].image).toBe('https://picsum.photos/100/100');
//     expect(eventList[2].isMine).toBe(true);
//   });

//   test('updateEvent should update an existing event', () => {
//     updateEvent('1', {
//       title: 'Updated Comedy Night',
//       date: '2025-02-18',
//       time: '9:00 PM',
//       attendees: 50,
//       category: 'Entertainment',
//       type: 'Show',
//     });

//     expect(eventList[0].title).toBe('Updated Comedy Night');
//     expect(eventList[0].date).toBe('2025-02-18');
//     expect(eventList[0].time).toBe('9:00 PM');
//     expect(eventList[0].attendees).toBe(50);
//   });

//   test('deleteEvent should remove an event from eventList', () => {
//     deleteEvent('2');

//     expect(eventList.length).toBe(1);
//     expect(eventList.find(event => event.id === '2')).toBeUndefined();
//   });
// });
