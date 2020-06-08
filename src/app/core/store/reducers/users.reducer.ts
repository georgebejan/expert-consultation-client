import { Error, IPageData, IUser, PageData, User } from '../../models';
import * as fromUsers from '../actions/users.action';

export interface UserState {
  entities: { [id: number]: IUser };
  loaded: boolean;
  loading: boolean;
  shouldReload: boolean;
  pageData: IPageData;
  error: Error;
}

export const initialState: UserState = {
  entities: {},
  loaded: false,
  loading: false,
  shouldReload: true,
  pageData: {pageable: {}} as IPageData,
  error: {} as Error
};

export function reducer(state = initialState, action: fromUsers.UsersAction): UserState {
  switch (action.type) {
    case fromUsers.UserActionTypes.LoadUsersSuccess: {
      const usersPage = action.payload;
      const users: User[] = usersPage.content;
      const entities = users.reduce((e: { [id: number]: User }, user: User) => {
        return {
          ...e,
          [user.id]: user.toJson(),
        };
      }, {});

      const pageData = new PageData();
      pageData.fromPage(usersPage);

      return {
        ...state,
        loading: false,
        loaded: true,
        shouldReload: false,
        pageData: pageData.toJson(),
        entities,
      };
    }

    case fromUsers.UserActionTypes.LoadUsersFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      } as UserState;
    }

    case fromUsers.UserActionTypes.SaveUserSuccess: {
      return {
        ...state,
        shouldReload: true
      };
    }

    case fromUsers.UserActionTypes.SaveUserFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return {
        ...state,
      } as UserState;
    }
  }
}

export const getUsersEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsersShouldReload = (state: UserState) => state.shouldReload;
export const getUsersPageData = (state: UserState) => state.pageData;
export const getUsersErrors = (state: UserState) => state.error;
