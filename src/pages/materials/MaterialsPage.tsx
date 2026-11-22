import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import UploadDropzone from "./components/UploadDropzone";
import MaterialTable from "./components/MaterialTable";
import SelectedMaterialBanner from "./components/SelectedMaterialBanner";
import { materialsMockData as mock } from "./data/materialsMockData";
import { navigateToMenu } from "../../utils/navigation";

type MaterialsPageProps = {
  onMenuClick?: (label: string) => void;
};

function MaterialsPage({ onMenuClick = navigateToMenu }: MaterialsPageProps) {
  const [materials] = useState(mock.materials);
  const [selectedId, setSelectedId] = useState<string | null>(mock.selectedMaterialId);

  // 이미 선택된 자료를 다시 누르면 선택 해제 (자료 없이 학습 가능)
  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const selectedMaterial = materials.find((m) => m.id === selectedId) ?? null;

  return (
    <MainLayout activeMenu="학습 자료 관리" onMenuClick={onMenuClick} userName={mock.userName}>
      <h1 className="text-base font-bold text-neutral-10">학습 자료</h1>

      <div className="mt-5 flex flex-col gap-7">
        <UploadDropzone />
        <MaterialTable materials={materials} selectedId={selectedId} onSelect={handleSelect} />
        <SelectedMaterialBanner materialName={selectedMaterial?.name ?? null} />
      </div>
    </MainLayout>
  );
}

export default MaterialsPage;
