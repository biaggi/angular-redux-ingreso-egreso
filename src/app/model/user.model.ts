export interface UserModel {
  uid: string;
  nombre: string;
  email: string | null;
}

export const createUser = (uid: string, nombre: string, email: string | null ):UserModel => {
  return {uid, nombre, email}
}

