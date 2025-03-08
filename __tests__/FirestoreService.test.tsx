import FirestoreService from '../src/Services/FirestoreService'; // Correct path to your FirestoreService file

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

    it('should return only upcoming events', async () => {
      const today = '2023-02-26';
      (FirestoreService.getEventsFromCollection as jest.Mock).mockResolvedValue([
        { id: '1', name: 'Past Event', date: '2023-02-20' },
        { id: '2', name: 'Today’s Event', date: '2023-02-25' },
        { id: '3', name: 'Future Event', date: '2023-02-05' },
      ]);

      const result = (await FirestoreService.getEventsFromCollection('Events', 'GlobalEvents')).filter(
        (event) => event.StartTime >= today
      );

      expect(result).toEqual([]);
    });

    it('should throw an error when Firestore retrieval fails', async () => {
      (FirestoreService.getEventsFromCollection as jest.Mock).mockRejectedValue(new Error('Firestore Error'));

      await expect(FirestoreService.getEventsFromCollection('Events', 'GlobalEvents')).rejects.toThrow('Firestore Error');
    });

    it('should return events with missing optional fields handled', async () => {
      (FirestoreService.getEventsFromCollection as jest.Mock).mockResolvedValue([
        { id: '1', name: 'Event 1' }, // Missing date
        { id: '2', name: 'Event 2', date: '2023-02-26' },
      ]);

      const result = await FirestoreService.getEventsFromCollection('Events', 'GlobalEvents');

      expect(result).toEqual([
        { id: '1', name: 'Event 1' },
        { id: '2', name: 'Event 2', date: '2023-02-26' },
      ]);
    });
  });
});
