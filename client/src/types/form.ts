export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface UpdateProfile {
  name: string;
  profilePicture: File | null;
}

export interface CreateCourse {
  title: string;
  category: string;
}

export interface CourseDetails {
  _id: string;
  title: string;
  subTitle: string;
  category: string;
  description: string;
  level: string;
  price: Number | undefined;
  thumbnail: File | null;
  __v?: Number | null,
  createdAt?: string;
  updatedAt?: string;
}
