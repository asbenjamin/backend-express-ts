import express from "express";
import User from "../../models/users";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
