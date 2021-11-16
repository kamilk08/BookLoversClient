export const GET_AUTHOR_STATISTICS = (authorId: number) => `http://localhost:64892/api/ratings/author/${authorId}`;
export const GET_SERIES_STATISTICS = (seriesId: number) => `http://localhost:64892/api/ratings/series/${seriesId}`;
export const GET_PUBLISHER_STATISTICS = (publisherId:number)=> `http://localhost:64892/api/ratings/publishers/${publisherId}`;
export const GET_MULTIPLE_SERIES_STATISTICS = `http://localhost:64892/api/ratings/series`;
