import jwt from "jsonwebtoken";

export const generateToken = (userId: string) : string => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  return token;
};
