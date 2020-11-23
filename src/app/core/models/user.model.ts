export enum UserType {
  CONTRIBUTOR,
  ADMIN
}

export interface ICurrentUser {
  id: string;
  fullName: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  district: string;
  organisation: string;
  role: UserType;
  specialization: string;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
  phoneNumber: string;
  district: string;
  organisation: string;
  role: UserType;
  specialization: string;

  constructor(aData?: IUser) {
    this.role = UserType.CONTRIBUTOR;
    if (aData) {
      this.fromJson(aData);
    }
  }

  fromJson(json: IUser) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phoneNumber = json.phoneNumber;
    this.district = json.district;
    this.organisation = json.organisation;
    this.role = json.role ? json.role : this.role;
    this.specialization = json.specialization;
  }

  toJson(): IUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      district: this.district,
      organisation: this.organisation,
      role: this.role,
      specialization: this.specialization
    } as IUser;
  }

  toFormData(): any {
    return this.toJson();
  }

  fromFormData(formData: any) {
    this.fromJson(formData);
  }
}

export class CurrentUser {
  id: string;
  fullName: string;

  constructor(aData?: ICurrentUser) {
    if (aData) {
      this.fromJson(aData);
    }
  }

  fromJson(json: ICurrentUser) {
    this.id = json.id;
    this.fullName = json.fullName;
  }

  toJson(): ICurrentUser {
    return {
      id: this.id,
      fullName: this.fullName,
    } as ICurrentUser;
  }
}
