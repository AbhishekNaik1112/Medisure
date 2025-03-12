// src/hooks/useAuth.ts
import { useEffect, useState } from "react";

const useAuth = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return { role };
};

export default useAuth;
