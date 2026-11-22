import { ReactComponent as MaterialIcon } from "../../../assets/icons/list-alt-check.svg";

type SelectedMaterialBannerProps = {
  materialName: string | null;
};

function SelectedMaterialBanner({ materialName }: SelectedMaterialBannerProps) {
  return (
    <section
      aria-live="polite"
      className="rounded-[15px] bg-primary-10 px-[38px] py-7 text-white shadow-50"
    >
      <h2 className="flex items-center gap-2 text-small font-bold">
        <MaterialIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {materialName ? `선택한 자료 : ${materialName}` : "선택한 자료가 없어요"}
      </h2>
      <p className="mt-2 text-caption font-medium">
        {materialName
          ? "학습 화면의 AI 문답 · 문제 생성에 사용돼요. 선택하지 않아도 자료 없이 학습할 수 있어요."
          : "자료 없이 학습해요. 목록에서 자료를 선택하면 AI 문답 · 문제 생성에 사용돼요."}
      </p>
    </section>
  );
}

export default SelectedMaterialBanner;
