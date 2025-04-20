"use client";
import { supabase } from "../../services/supabaseClient";
import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogIn, Mail } from "lucide-react";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push( "http://localhost:3000/dashboard");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const sighInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      
    });
    if (error) {
      console.log("error", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col items-center border round-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={100}
          className="w-[180px] "
        />
        <div className="flex items-center flex-col">
          <Image
            src={"/login.png"}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">Chào Mừng Đến Với AI Cruiter</h2>
          <span className="text-gray-500 text-center mt-3 flex items-center justify-center"><Mail className="w-4 h-4 mr-2 "/> Đăng nhập với Gmail</span>
          <Button className="mt-5 flex items-center" onClick={sighInWithGoogle}>
            <LogIn className="w-4 h-4"/>
          Đăng nhập  
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
