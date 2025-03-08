import { searchClubs } from '../src/Controller/ClubsController';

describe('searchClubs function', () => {
  const mockClubList = {
    _j: [
      { Name: 'Test Club 1', Description: 'Test Description 1', Email: '' },
      { Name: 'Test Club 2', Description: 'Test Description 2', Email: '' },
      { Name: 'Test Club 3', Description: 'Test Description 3', Email: '' },
      { Name: 'Other Club', Description: 'Other Description', Email: '' },
    ],
  };

  it('should return clubs that match the search query', () => {
    const searchQuery = 'Test Club';
    const filteredClubs = searchClubs(mockClubList, searchQuery);

    expect(filteredClubs.length).toBe(3);
    expect(filteredClubs[0].Name).toBe('Test Club 1');
    expect(filteredClubs[1].Name).toBe('Test Club 2');
    expect(filteredClubs[2].Name).toBe('Test Club 3');
  });

  it('should return an empty array when no clubs match the search query', () => {
    const searchQuery = 'Nonexistent Club';
    const filteredClubs = searchClubs(mockClubList, searchQuery);

    expect(filteredClubs.length).toBe(0);
  });

  it('should be case-insensitive when searching', () => {
    const searchQuery = 'test club';
    const filteredClubs = searchClubs(mockClubList, searchQuery);

    expect(filteredClubs.length).toBe(3);
    expect(filteredClubs[0].Name).toBe('Test Club 1');
    expect(filteredClubs[1].Name).toBe('Test Club 2');
    expect(filteredClubs[2].Name).toBe('Test Club 3');
  });

  it('should return all clubs when search query is empty', () => {
    const searchQuery = '';
    const filteredClubs = searchClubs(mockClubList, searchQuery);

    expect(filteredClubs.length).toBe(mockClubList._j.length); // Should return all clubs
  });
});
