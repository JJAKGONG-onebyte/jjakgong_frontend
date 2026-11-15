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
      <p className="mt-2 text-[16px] leading-[24px] text-neutral-70">
        가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드려요.
      </p>

      <form className="mt-8 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <FormField label="이메일">
          <Input type="email" value={email} onChange={setEmail} placeholder="example@email.com" />
        </FormField>

        <Button type="submit" size="lg" fullWidth className="mt-2">
          확인
        </Button>
      </form>
    </AuthLayout>
  );
}

export default PasswordResetPage;