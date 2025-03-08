

export const searchClubs = (clubList: any, search: string) => {
    return clubList._j.filter((club:any) => {
        return club.Name.toLowerCase().includes(search.toLowerCase());
    });
}