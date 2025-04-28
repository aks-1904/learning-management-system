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