import { useState } from "react";
import AuthForm from "../../modules/auth/ui/AuthForm";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("register");
  console.log("is on auth page")

  return <AuthForm mode={mode} onChangeMode={setMode} />
}