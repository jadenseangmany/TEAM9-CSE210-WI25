import FirestoreService from '../src/Services/FirestoreService';  // Correct path to your FirestoreService file

jest.mock('../src/Services/FirestoreService', () => ({
    getEventsFromCollection: jest.fn(),
  }));

describe('FirestoreService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEventsFromCollection', () => {
    it('should return an empty array if no documents are found', async () => {
        (FirestoreService.getEventsFromCollection as jest.Mock).mockResolvedValue([]);

      const result = await FirestoreService.getEventsFromCollection('Events', 'GlobalEvents');
      expect(result).toEqual([]);
    });

    it('should return events when documents are found', async () => {
        // Mock the Firestore response to simulate events found in Firestore
        (FirestoreService.getEventsFromCollection as jest.Mock).mockResolvedValue([
          { id: '1', name: 'Event 1', date: '2023-02-25' },
          { id: '2', name: 'Event 2', date: '2023-02-26' },
        ]);
    
        const result = await FirestoreService.getEventsFromCollection('Events', 'GlobalEvents');
        
        expect(result).toEqual([
          { id: '1', name: 'Event 1', date: '2023-02-25' },
          { id: '2', name: 'Event 2', date: '2023-02-26' },
        ]);
      });
  });
});
