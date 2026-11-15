import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  return (
    <AuthLayout>
      <h1 className="text-base font-bold text-neutral-10">회원가입</h1>
      <p className="mt-2 text-small text-primary-10">이메일로 시작해보세요.</p>

      <form className="mt-8 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <FormField label="이메일로 시작하기">
          <Input type="email" value={email} onChange={setEmail} placeholder="example@email.com" />
        </FormField>

        <FormField label="비밀번호">
          <Input type="password" value={password} onChange={setPassword} placeholder="최소 8자 이상 입력" />
        </FormField>

        <FormField label="닉네임">
          <Input value={nickname} onChange={setNickname} placeholder="닉네임" />
        </FormField>

        <Button type="submit" size="lg" fullWidth className="mt-2">
          가입하기
        </Button>
      </form>

      <p className="mt-6 text-[16px] leading-[24px] text-neutral-70">
        이미 계정이 있나요?{" "}
        <button type="button" className="text-primary-10">
          로그인
        </button>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;