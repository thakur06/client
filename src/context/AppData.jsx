import { useState } from "react";
import DataContext from "./DataContext";

export const LiefContext = ({ children }) => {
  const [myUserData, setUserData] = useState({});
    // localStorage.getItem("app_data")?setUserData(JSON.parse(localStorage.getItem("app_data"))):{};
  const userlogin = (user) => {
    if (!user) {
      console.error("Invalid login credentials");
      return;
    }
    setUserData(user);
  };



  return (
    <DataContext.Provider value={{ myUserData,userlogin}}>
      {children}
    </DataContext.Provider>
  );
};