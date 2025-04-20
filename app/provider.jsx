"use client";
import { UserDetailContext } from "../context/UserDetailContext";
import { supabase } from "../services/supabaseClient";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();
  // Gọi khi mount
  useEffect(() => {
    CreateNewUser();
  }, []);

  // Hàm này được định nghĩa trước khi sử dụng
  const CreateNewUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Kiểm tra user có trong bảng Users chưa
    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    console.log("Found users:", Users);

    if (Users?.length === 0) {
      const { data, error } = await supabase.from("Users").insert([
        {
          name: user.user_metadata?.name,
          email: user.email,
          picture: user.user_metadata?.picture,
        },
      ]);
      setUser(data);
      return;
    }
    setUser(Users[0]);
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
