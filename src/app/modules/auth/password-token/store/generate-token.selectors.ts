import { createSelector } from "@ngrx/store";
import { GenerateTokenModuleState, generateTokenState } from ".";
import { GenerateTokenState } from "./generate-token.reducer";

const passwordTokenState = createSelector(generateTokenState, (state: GenerateTokenModuleState) => {
  if (state) return state.generatePasswordToken;

  return undefined;
});

export const form = createSelector(passwordTokenState, (state: GenerateTokenState) => {
  if (state) return state.form;

  return undefined;
});
