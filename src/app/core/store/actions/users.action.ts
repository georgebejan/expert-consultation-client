import { Action } from '@ngrx/store';
import { CurrentUser, Error, Page, PageRequest, User } from '../../models';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
  SaveUser = '[Users] Save User',
  SaveUserSuccess = '[Users] Save User Success',
  SaveUserFail = '[Users] Save User Fail',
  SaveUsersExcel = '[Users] Save Users Excel',
  SaveUserExcelSuccess = '[Users] Save Users Excel Success',
  SaveUserExcelFail = '[Users] Save Users Excel Fail',
  LoadCurrentUser = '[Current User] Load Current User',
  LoadCurrentUserSuccess = '[Current User] Load Current User Success',
  LoadCurrentUserFail = '[Current User] Load Current User Fail',
  LoadUserSpecializations = '[User] Load User Specializations',
  LoadUserSpecializationsSuccess = '[User] Load Current User Success',
  LoadUserSpecializationsFail = '[User] Load Current User Fail'
}

export class LoadCurrentUser implements Action {
  readonly type: string = UserActionTypes.LoadCurrentUser;

  constructor(public payload: any) {
  }
}

export class LoadCurrentUserSuccess implements Action {
  readonly type: string = UserActionTypes.LoadCurrentUserSuccess;

  constructor(public payload: CurrentUser) {
  }
}

export class LoadCurrentUserFail implements Action {
  readonly type: string = UserActionTypes.LoadCurrentUserSuccess;

  constructor(public payload: any) {
  }
}

export class LoadUsers implements Action {
  readonly type: string = UserActionTypes.LoadUsers;

  constructor(public payload: PageRequest) {
  }
}

export class LoadUsersSuccess implements Action {
  readonly type: string = UserActionTypes.LoadUsersSuccess;

  constructor(public payload: Page<User>) {
  }
}

export class LoadUsersFail implements Action {
  readonly type: string = UserActionTypes.LoadUsersFail;

  constructor(public payload: any) {
  }
}

export class SaveUser implements Action {
  readonly type: string = UserActionTypes.SaveUser;

  constructor(public payload: User) {
  }
}

export class SaveUserSuccess implements Action {
  readonly type: string = UserActionTypes.SaveUserSuccess;

  constructor(public payload: User) {
  }
}

export class SaveUserFail implements Action {
  readonly type: string = UserActionTypes.SaveUserFail;

  constructor(public payload: Error) {
  }
}

export class SaveUsersExcel implements Action {
  readonly type: string = UserActionTypes.SaveUsersExcel;

  constructor(public payload: string) {
  }
}

export class SaveUserExcelSuccess implements Action {
  readonly type: string = UserActionTypes.SaveUserExcelSuccess;

  constructor(public payload: User[]) {
  }
}

export class SaveUserExcelFail implements Action {
  readonly type: string = UserActionTypes.SaveUserExcelFail;

  constructor(public payload: Error) {
  }
}

export class LoadUserSpecializations implements Action {
  readonly type: string = UserActionTypes.LoadUserSpecializations;

  constructor() {
  }
}

export class LoadUserSpecializationsSuccess implements Action {
  readonly type: string = UserActionTypes.LoadUserSpecializationsSuccess;

  constructor(public payload: string[]) {
  }
}

export class LoadUserSpecializationsFail implements Action {
  readonly type: string = UserActionTypes.LoadCurrentUserSuccess;

  constructor(public payload: any) {
  }
}

export type UsersAction = LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | SaveUser
    | SaveUserSuccess
    | SaveUserFail
    | SaveUsersExcel
    | SaveUserExcelSuccess
    | SaveUserExcelFail
    | LoadCurrentUser
    | LoadCurrentUserSuccess
    | LoadCurrentUserFail;
