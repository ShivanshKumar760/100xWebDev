import { useState } from "react";
import Auth from "./Auth";
import Office from "./Office";
import { User } from "@/types";

const Index = () => {
  const [user, setUser] = useState<(User & { token: string }) | null>(null);

  return (
    <div className="min-h-screen">
      {!user ? (
        <Auth onAuth={setUser} />
      ) : (
        <Office user={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
};

export default Index;
