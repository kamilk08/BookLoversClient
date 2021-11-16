import { ToggleActivityState } from "../toggle-activity.reducer";

import * as fromActions from '../toggle-activity.actions';
import * as fromReducer from '../toggle-activity.reducer';
import { UUID } from "angular2-uuid";
import { NEW_FOLLOWER } from "src/app/modules/api/timelines/models/activity-type.interface";
import { TimeLineActivity } from "src/app/modules/api/timelines/models/timeline-activity.interface";

describe('TOGGLE_ACTIVITY_REDUCER', () => {

  let activity: TimeLineActivity = {
    date: new Date(),
    activityData: {
      id: 1,
      activityObjectGuid: UUID.UUID()
    },
    activityType: NEW_FOLLOWER,
    show: true
  };

  const initialState: ToggleActivityState = {
    activity: undefined,
    processing: false,
    error: undefined
  }

  describe('HIDE_ACTIVITY', () => {
    it('should return new state with processing set to true and updated activity property', () => {

      const action = fromActions.HIDE_ACTIVITY({ payload: { activity } });

      const newState = fromReducer.toggleActivityReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.activity).toEqual(activity);

    });
  });

  describe('HIDE_ACTIVITY_SUCCESS', () => {
    it('should return new state with processing property set to false and updated activity property', () => {

      const firstAction = fromActions.HIDE_ACTIVITY({ payload: { activity } });

      let newState = fromReducer.toggleActivityReducer(initialState, firstAction);

      const action = fromActions.HIDE_ACTIVITY_SUCCESS();

      newState = fromReducer.toggleActivityReducer(newState, action);

      expect(newState.activity.show).toBeFalsy();

    });
  });

  describe('SHOW_ACTIVITY', () => {
    it('should return new state with processing property set to true and updated activity property', () => {

      const action = fromActions.SHOW_ACTIVITY({ payload: { activity } });

      const newState = fromReducer.toggleActivityReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.activity).toEqual(activity);

    });
  });

  describe('SHOW_ACTIVITY_SUCCESS', () => {
    it('should return new state with processing property set to false and updated activity property', () => {

      const firstAction = fromActions.SHOW_ACTIVITY({ payload: { activity } });

      let newState = fromReducer.toggleActivityReducer(initialState, firstAction);

      const action = fromActions.SHOW_ACTIVITY_SUCCESS();

      newState = fromReducer.toggleActivityReducer(newState, action);

      expect(newState.activity.show).toBeTruthy();

    });
  });

});
