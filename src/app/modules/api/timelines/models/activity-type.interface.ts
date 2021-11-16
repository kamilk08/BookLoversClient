import { TimeLineActivity } from './timeline-activity.interface';

export interface ActivityType {
  id: number
  name: string
}

export const NEW_BOOK_IN_BOOKCASE: ActivityType = { id: 1, name: 'NEW_BOOK_IN_BOOKCASE' };
export const NEW_FOLLOWER: ActivityType = { id: 2, name: 'NEW_FOLLOWER' };
export const LOST_FOLLOWER: ActivityType = { id: 3, name: 'LOST_FOLLOWER' };
export const NEW_REVIEW: ActivityType = { id: 4, name: 'NEW_REVIEW' };
export const REVIEW_LIKED: ActivityType = { id: 5, name: 'REVIEW_LIKED' };
export const REVIEW_REPORETED: ActivityType = { id: 6, name: 'REVIEW_REPORTED' };
export const ADDED_BOOK: ActivityType = { id: 7, name: 'ADDED_BOOK' };
export const ADDED_AUTHOR: ActivityType = { id: 8, name: 'ADDED_AUTHOR' };
export const FAVOURITE_AUTHOR: ActivityType = { id: 9, name: 'FAVOURITE_AUTHOR' };
export const FAVOURITE_BOOK: ActivityType = { id: 10, name: 'FAVOURITE_BOOK' };
export const ADDED_PUBLISHER: ActivityType = { id: 11, name: 'ADDED_PUBLISHER' };
export const ADDED_SERIES: ActivityType = { id: 12, name: 'ADDED_SERIES' };
export const ADDED_AUTHOR_QUOTE: ActivityType = { id: 15, name: 'ADDED_AUTHOR_QUOTE' };
export const ADDED_BOOK_QUOTE: ActivityType = { id: 16, name: 'ADDED_BOOK_QUOTE' };

export const ACTIVITY_TYPES: ActivityType[] = [
  NEW_BOOK_IN_BOOKCASE, NEW_FOLLOWER, LOST_FOLLOWER, NEW_REVIEW,
  REVIEW_LIKED, REVIEW_REPORETED, ADDED_BOOK, ADDED_AUTHOR,
  FAVOURITE_AUTHOR, FAVOURITE_BOOK, ADDED_PUBLISHER,
  ADDED_SERIES, ADDED_AUTHOR_QUOTE, ADDED_BOOK_QUOTE
];

export enum ActivityTypesEnum {
  NEW_BOOK_IN_BOOKCASE = 1,
  NEW_FOLLOWER = 2,
  LOST_FOLLOWER = 3,
  NEW_REVIEW = 4,
  REVIEW_LIKED = 5,
  REVIEW_REPORTED = 6,
  ADDED_BOOK = 7,
  ADDED_AUTHOR = 8,
  FAVOURITE_AUTHOR = 9,
  FAVOURITE_BOOK = 10,
  ADDED_PUBLISHER = 11,
  ADDED_SERIES = 12,
  ADDED_AUTHOR_QUOTE = 13,
  ADDED_BOOK_QUOTE = 14
};


export function selectActivityData(activityType: ActivityType, action: (activity: TimeLineActivity) => any) {
  return (activities: TimeLineActivity[]) => activities.filter(f => f.activityType === activityType).forEach(activity => action(activity))
}
