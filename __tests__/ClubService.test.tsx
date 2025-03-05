import {ClubList} from '../src/Services/ClubService';

describe('App Component', () => {
  it('test firestore getEventsFromCollection() with some Events', async () => {
    expect(await ClubList()).toEqual([]);
  });
});
