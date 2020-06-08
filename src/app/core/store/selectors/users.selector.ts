import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/users.reducer';
import { IPageData, IUser, PageData, User } from '../../models';

export const getUsersState = createSelector(fromFeature.getCoreState, (state: fromFeature.CoreState) => state.users);

const getUsersEntitiesAsInterfaces = createSelector(getUsersState, fromUsers.getUsersEntities);
export const getUsersEntities = createSelector(getUsersEntitiesAsInterfaces,
    (users: { [id: number]: IUser }) => {
      const userEntities: { [id: number]: User } = {};
      const userInterfaces = {...users};

      Object.keys(userInterfaces).map(key => {
        userEntities[key] = new User(userInterfaces[key]);
      });

      return userEntities;
    }
);

export const getUsers = createSelector(getUsersEntities, (entities: { [id: number]: User }) => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getUsersLoaded = createSelector(getUsersState, fromUsers.getUsersLoaded);
export const getUsersLoading = createSelector(getUsersState, fromUsers.getUsersLoading);
export const getUsersShouldReload = createSelector(getUsersState, fromUsers.getUsersShouldReload);

const getUsersPageDataEntityAsInterface = createSelector(getUsersState, fromUsers.getUsersPageData);
export const getUsersPageData = createSelector(getUsersPageDataEntityAsInterface,
    (iPageData: IPageData) => {
      const pageData = new PageData();
      pageData.fromJson(iPageData);
      return pageData;
    });

export const getUsersErrors = createSelector(getUsersState, fromUsers.getUsersErrors);
