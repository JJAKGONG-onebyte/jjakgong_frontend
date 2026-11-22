import { useEffect, useState } from "react";
import { getMaterialFile } from "../../../services/materialFileStore";

type SelectedMaterial = {
  materialId: string | null;
  file: File | null;
  loading: boolean;
};

/**
 * 주소의 ?material=<자료 ID> 로 학습 자료 파일을 불러온다.
 * 파일이 없으면(자료 없이 학습, 목업 자료, 저장소에서 지워짐) file 은 null.
 */
export function useSelectedMaterial(): SelectedMaterial {
  const [materialId] = useState(() => new URLSearchParams(window.location.search).get("material"));
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(Boolean(materialId));

  useEffect(() => {
    if (!materialId) return;
    let cancelled = false;

    getMaterialFile(materialId).then((found) => {
      if (cancelled) return;
      setFile(found);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [materialId]);

  return { materialId, file, loading };
}
