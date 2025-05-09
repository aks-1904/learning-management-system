enum Role{
    Instructor = "instructor",
    Student = "student"
}

export interface User{
    _id: string;
    __v: number;
    email: string;
    name: string;
    password: string;
    profilePicture: string;
    enrolledCourses: any[];
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export interface profileData{
    success: boolean;
    user: User;
}

export interface Course{
    _id: string;
    title: string;
    thumbnail: string;
    enrolledStudents: User[] | [];
    lectures: any[];
    creator: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    price: number;
}

export interface CourseData{
    message: string;
    courses: Course[];
    success: boolean
}