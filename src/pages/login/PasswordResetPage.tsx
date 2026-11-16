import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import FormField from "../../components/FormField";
import Input from "../../components/Input";
import Button from "../../components/Button";

function PasswordResetPage() {
  const [email, setEmail] = useState("");

  return (
    <AuthLayout>
      <h1 className="text-base font-bold text-neutral-10">비밀번호 재설정</h1>
      <p className="mt-0.5 text-small text-neutral-60">
        가입한 이메일 주소로 비밀번호 재설정 링크를 보내드려요.
      </p>

      <form className="mt-[33px] flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <FormField label="가입한 이메일">
          <Input type="email" value={email} onChange={setEmail} placeholder="example@email.com" />
        </FormField>

        <Button type="submit" size="lg" fullWidth className="mt-[13px]">
          확인
        </Button>
      </form>
    </AuthLayout>
  );
}

export default PasswordResetPage;