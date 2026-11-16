import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logoTextUrl from "../../assets/icons/logo-text.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout>
      <h1 className="flex items-center gap-[9px] text-base font-bold text-neutral-10">
        <img src={logoTextUrl} alt="짝공" className="h-[34px]" />
        로그인
      </h1>

      <form className="mt-[23px] flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="이메일">
          <Input type="email" value={email} onChange={setEmail} placeholder="example@email.com" />
        </FormField>

        <FormField label="비밀번호">
          <Input type="password" value={password} onChange={setPassword} placeholder="비밀번호" />
        </FormField>

        <Button type="submit" size="lg" fullWidth className="mt-[13px]">
          로그인
        </Button>
      </form>

      <div className="mt-2.5 flex items-center justify-between text-small">
        <button type="button" className="text-neutral-60">
          비밀번호를 잊으셨나요?
        </button>
        <button type="button" className="text-primary-10">
          회원가입
        </button>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;