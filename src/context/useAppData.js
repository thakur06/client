import { useContext } from "react";
import DataContext from "./DataContext";

export const useAuth = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};