export class UserModel {
  id: string | number | null;
  name: string;
  email: string;
  phone: string;

  constructor({
                id = null,
                name = '',
                email = '',
                phone = ''
              }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  static populate(data = {}) {
    return new UserModel(data);
  }
}
