import { ClubList } from '../src/Services/ClubService';

jest.mock('../src/Services/ClubService', () => ({
  ClubList: jest.fn(),
}));

describe('ClubService Tests', () => {
  it('Empty ClubList', async () => {
    (ClubList as jest.Mock).mockResolvedValue([]);

    const result = await ClubList();
    expect(result).toEqual([]);
  });

  it('Return 1 Club', async () => {
    (ClubList as jest.Mock).mockResolvedValue([
      { Name: 'test club', 'Organization Email': 'test@gmail.com', 'Organization Type': 'Combined', 'Purpose': 'test purpose', 'Social Media': "", 'Status': 'current' },
    ]);

    const result = await ClubList();
    expect(result).toEqual([
      { Name: 'test club', 'Organization Email': 'test@gmail.com', 'Organization Type': 'Combined', 'Purpose': 'test purpose', 'Social Media': "", 'Status': 'current' },
    ]);
  });

  it('Return 2 Clubs', async () => {
    (ClubList as jest.Mock).mockResolvedValue([
      { Name: 'Club A', 'Organization Email': 'a@gmail.com', 'Organization Type': 'Sports', 'Purpose': 'Sports Activities', 'Social Media': "a_club", 'Status': 'current' },
      { Name: 'Club B', 'Organization Email': 'b@gmail.com', 'Organization Type': 'Music', 'Purpose': 'Music and Arts', 'Social Media': "b_club", 'Status': 'active' },
    ]);

    const result = await ClubList();
    expect(result).toEqual([
      { Name: 'Club A', 'Organization Email': 'a@gmail.com', 'Organization Type': 'Sports', 'Purpose': 'Sports Activities', 'Social Media': "a_club", 'Status': 'current' },
      { Name: 'Club B', 'Organization Email': 'b@gmail.com', 'Organization Type': 'Music', 'Purpose': 'Music and Arts', 'Social Media': "b_club", 'Status': 'active' },
    ]);
  });

  it('Return 3 Clubs', async () => {
    (ClubList as jest.Mock).mockResolvedValue([
      { Name: 'Club X', 'Organization Email': 'x@gmail.com', 'Organization Type': 'Tech', 'Purpose': 'Technology Innovation', 'Social Media': "x_club", 'Status': 'active' },
      { Name: 'Club Y', 'Organization Email': 'y@gmail.com', 'Organization Type': 'Dance', 'Purpose': 'Dance and Performance', 'Social Media': "y_club", 'Status': 'current' },
      { Name: 'Club Z', 'Organization Email': 'z@gmail.com', 'Organization Type': 'Drama', 'Purpose': 'Theater Arts', 'Social Media': "z_club", 'Status': 'pending' },
    ]);

    const result = await ClubList();
    expect(result).toEqual([
      { Name: 'Club X', 'Organization Email': 'x@gmail.com', 'Organization Type': 'Tech', 'Purpose': 'Technology Innovation', 'Social Media': "x_club", 'Status': 'active' },
      { Name: 'Club Y', 'Organization Email': 'y@gmail.com', 'Organization Type': 'Dance', 'Purpose': 'Dance and Performance', 'Social Media': "y_club", 'Status': 'current' },
      { Name: 'Club Z', 'Organization Email': 'z@gmail.com', 'Organization Type': 'Drama', 'Purpose': 'Theater Arts', 'Social Media': "z_club", 'Status': 'pending' },
    ]);
  });
});
