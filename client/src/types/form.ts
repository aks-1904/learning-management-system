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
