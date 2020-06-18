import { Action } from '@ngrx/store';
import { User } from '../../models';

export enum ImportUserActionTypes {
  ImportFromCsvSuccess = '[Import Users] Import From Csv Success',
  SaveImportedUsers = '[Import Users] Save Imported Users',
  ImportedUsersSaveSuccess = '[Import Users] Imported Users Save Success',
  ImportedUsersSaveFailed = '[Import Users] Imported Users Save Failed',
}
export class SaveImportedUsers implements Action {
  readonly type = ImportUserActionTypes.SaveImportedUsers;

  constructor(public users: User[]) {
  }
}

export class ImportedUsersSaveSuccess implements Action {
  readonly type = ImportUserActionTypes.ImportedUsersSaveSuccess;

  constructor(public payload: User[]) {
  }
}

export class ImportedUsersSaveFailed implements Action {
  readonly type = ImportUserActionTypes.ImportedUsersSaveFailed;

  constructor(public payload: any) {
  }
}

export class ImportFromCsvSuccess implements Action {
  readonly type = ImportUserActionTypes.ImportFromCsvSuccess;

  constructor(public payload: User[]) {
  }
}

export type ImportUsersAction = ImportFromCsvSuccess
    | SaveImportedUsers
    | ImportedUsersSaveSuccess
    | ImportedUsersSaveFailed;
