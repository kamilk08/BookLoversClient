import { ActivitiesState } from "../activities.reducer";

import * as fromActions from '../activities.actions';
import * as fromReducer from '../activities.reducer';
import { TimeLineActivity } from "src/app/modules/api/timelines/models/timeline-activity.interface";
import { UUID } from "angular2-uuid";
import { NEW_FOLLOWER } from "src/app/modules/api/timelines/models/activity-type.interface";

describe('ACTIVITIES_REDUCER', () => {

  const initialState: ActivitiesState = {
    entities: {},
    ids: [],
    error: undefined
  };

  describe('FETCH_ACTIVITIES', () => {
    it('should return new state with updated entities property', () => {
      const item: TimeLineActivity = {
        date: new Date(),
        activityData: {
          id: 1,
          activityObjectGuid: UUID.UUID()
        },
        activityType: NEW_FOLLOWER,
        show: true
      };

      const activities = [item]

      const action = fromActions.FETCH_ACTIVITIES({ payload: { activities } });

      const newState = fromReducer.activitiesReducer(initialState, action);

      expect(newState.entities[item.activityData.id]).toEqual(item);
    });
  });

  describe('UPDATE_ACTIVTY', () => {
    it('should return new state with updated activity', () => {

      const item: TimeLineActivity = {
        date: new Date(),
        activityData: {
          id: 1,
          activityObjectGuid: UUID.UUID()
        },
        activityType: NEW_FOLLOWER,
        show: true
      };

      const activities = [item]

      const fetchAction = fromActions.FETCH_ACTIVITIES({ payload: { activities } });

      let newState = fromReducer.activitiesReducer(initialState, fetchAction);

      item.show = false;

      const action = fromActions.UPDATE_ACTIVITY({ payload: { activity: item } })

      newState = fromReducer.activitiesReducer(newState, action);

      expect(newState.entities[item.activityData.id]).toEqual(item);

    });
  });

  describe('FETCH_ACTIVITIES_ERROR', () => {
    it('should return new state with defined error property', () => {

      const error = new Error();

      const action = fromActions.FETCH_ACTIVITITES_ERROR({ payload: { error } });

      const newState = fromReducer.activitiesReducer(initialState, action);

      expect(newState.error).toBeDefined();


    });

  });

});
