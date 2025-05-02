import "express";

declare global {
  namespace Express {
    interface Request {
      id?: string; // declaring globally id which is userId
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      // Declaring globally file and files to upload files using multer and cloudinary
      file?: Multer.File;
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
    }
  }
}
