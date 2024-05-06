
type TypeUser = 'default' | 'pro';

interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  typeUser: TypeUser;
}


interface ILoginUser {
  email: string;
  password: string;
}


export default IUser;
export {TypeUser, ILoginUser};
