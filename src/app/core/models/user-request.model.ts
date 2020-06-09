export class UserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  invitationCode: string;

  fromForm(request: any) {
    this.name = request.name;
    this.username = request.username;
    this.email = request.email;
    this.password = request.password;
  }
}
