'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LucideLogOut } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push('/auth'); // chuyển hướng nếu chưa đăng nhập
      }
    };
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // chuyển về trang chủ sau khi đăng xuất
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
   

      {/* User Info Card */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow text-center flex flex-col items-center">
        {user?.user_metadata?.picture && (
          <Image
            src={user.user_metadata.picture}
            alt="user avatar"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4"
          />
        )}
        <h2 className="text-xl font-semibold">{user?.user_metadata?.name}</h2>
        <p className="text-gray-600 mb-6">{user?.email}</p>
        <button
          onClick={handleSignOut}
          className="bg-blue-500 text-white border px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 flex items-center"
        >
            <LucideLogOut className="w-4 h-4 mr-2" />
          Đăng Xuất
        </button>
      </div>
    </div>
  );
}
