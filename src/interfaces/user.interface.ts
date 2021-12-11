export interface IUser {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface IPost {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: Date;
  owner: IUser;
}
