// توسيع Express Request type لإضافة user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        userType: string;
      };
    }
  }
}

export {};
