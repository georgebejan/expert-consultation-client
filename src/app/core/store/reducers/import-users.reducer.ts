import { Error, IUser, User } from '../../models';
import * as fromImportUsers from '../actions/import-users.action';

export interface ImportUserState {
  entities: { [id: number]: IUser };
  loaded: boolean;
  loading: boolean;
  shouldReload: boolean;
  error: Error;
}

export const initialState: ImportUserState = {
  entities: {},
  loaded: false,
  loading: false,
  shouldReload: true,
  error: {} as Error
};

export function reducer(state = initialState, action: fromImportUsers.ImportUsersAction): ImportUserState {
  switch (action.type) {
    case fromImportUsers.ImportUserActionTypes.ImportFromCsvSuccess: {
      const entities = action.payload.reduce((e: { [id: string]: User }, u: any) => {
        return {
          ...e,
          [u.email]: new User(u).toJson(),
        };
      }, {});
      return {
        ...state,
        entities
      };
    }
    case fromImportUsers.ImportUserActionTypes.ImportedUsersSaveFailed: {
      const error: Error = action.payload as Error;

      return {
        ...state,
        error,
      } as ImportUserState;
    }


    default: {
      return {
        ...state,
      } as ImportUserState;
    }
  }
}

export const getImportedUsersEntities = (state: ImportUserState) => state.entities;
export const getUsersLoading = (state: ImportUserState) => state.loading;
export const getUsersLoaded = (state: ImportUserState) => state.loaded;
export const getUsersShouldReload = (state: ImportUserState) => state.shouldReload;
export const getImportUsersErrors = (state: ImportUserState) => state.error;
