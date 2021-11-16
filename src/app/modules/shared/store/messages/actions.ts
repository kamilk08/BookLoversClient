import { createAction, props } from '@ngrx/store';
import { NzMessageDataOptions } from 'ng-zorro-antd';

export const SHOW_SUCCESS_MESSAGE = createAction('[SHARED] Show success message', props<{ payload: { message: string, options?: NzMessageDataOptions } }>())
export const SHOW_FALIURE_MESSAGE = createAction('[SHARED] Show faliure message', props<{ payload: { message: string, options?: NzMessageDataOptions } }>());
