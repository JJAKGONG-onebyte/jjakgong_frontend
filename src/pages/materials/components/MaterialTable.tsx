import Button from "../../../components/Button";
import CheckCircle from "../../../components/CheckCircle";
import { StudyMaterial } from "../data/materialsMockData";

type MaterialTableProps = {
  materials: StudyMaterial[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRename?: (material: StudyMaterial) => void;
  onDelete?: (material: StudyMaterial) => void;
};

const headCell = "whitespace-nowrap px-5 py-3 text-left text-small font-normal text-neutral-60";
const bodyCell = "px-5 py-4 text-small";

function MaterialTable({ materials, selectedId, onSelect, onRename, onDelete }: MaterialTableProps) {
  return (
    <section className="rounded-[15px] bg-gradient-to-b from-white to-gradient-3 px-[38px] py-7 shadow-50">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-neutral-90">
              <th scope="col" className={`${headCell} w-[46%]`}>파일명</th>
              <th scope="col" className={`${headCell} w-[17%]`}>업로드일</th>
              <th scope="col" className={`${headCell} w-[17%]`}>이번 학습에 사용</th>
              <th scope="col" className={headCell}>관리</th>
            </tr>
          </thead>

          <tbody>
            {materials.map((material) => {
              const selected = material.id === selectedId;
              return (
                <tr
                  key={material.id}
                  className={`border-b border-neutral-90 last:border-b-0 transition-colors
                    ${selected ? "bg-gradient-3" : ""}`}
                >
                  <td className={`${bodyCell} text-neutral-10`}>{material.name}</td>
                  <td className={`${bodyCell} text-neutral-60`}>{material.uploadedAt}</td>
                  <td className={`${bodyCell} text-primary-10`}>
                    <CheckCircle
                      checked={selected}
                      onClick={() => onSelect(material.id)}
                      label={selected ? "선택" : undefined}
                      ariaLabel={`${material.name} 이번 학습에 사용`}
                    />
                  </td>
                  <td className={bodyCell}>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 whitespace-nowrap !border-neutral-60 !text-neutral-60 !font-normal"
                        onClick={() => onRename?.(material)}
                      >
                        이름 변경
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 whitespace-nowrap !border-neutral-60 !text-neutral-60 !font-normal"
                        onClick={() => onDelete?.(material)}
                      >
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {materials.length === 0 && (
        <p className="py-10 text-center text-small text-neutral-60">
          아직 올린 자료가 없어요. 위에서 PDF · TXT 파일을 올려보세요.
        </p>
      )}
    </section>
  );
}

export default MaterialTable;
