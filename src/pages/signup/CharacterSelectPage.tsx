import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import SelectCard from "../../components/SelectCard";
import CheckIcon from "../../components/CheckIcon";
import Button from "../../components/Button";
import jjakiUrl from "../../assets/characters/jjaki.png";
import kkongiUrl from "../../assets/characters/kkongi.png";

const characters = [
  { name: "짝이", image: jjakiUrl },
  { name: "꽁이", image: kkongiUrl },
];

function CharacterSelectPage() {
  const [selectedName, setSelectedName] = useState(characters[0].name);

  return (
    <AuthLayout size="lg">
      <h1 className="text-base font-bold text-neutral-10">초기 캐릭터 선택</h1>
      <p className="mt-2 text-small text-primary-10">
        첫 시작을 함께할 캐릭터를 골라보세요! (최초 1회)
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">
        {characters.map((character) => {
          const selected = selectedName === character.name;

          return (
            <SelectCard
              key={character.name}
              variant="filled"
              selected={selected}
              onClick={() => setSelectedName(character.name)}
            >

              <div
                className={`relative w-full h-[220px] rounded-lg
                  [clip-path:inset(-60px_-30px_0_0_round_8px)]
                  ${selected ? "bg-white" : "bg-gradient-to-b from-white to-gradient-1"}`}
              >
                <img
                  src={character.image}
                  alt=""
                  className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 ml-3 h-[262px] w-auto max-w-none"
                />
              </div>

              {/* 체크 + 이름 */}
              <span className="mt-1 flex items-center gap-2 text-small font-bold">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full border
                    ${
                      selected
                        ? "bg-white border-white text-primary-10"
                        : "bg-white border-neutral-90 text-neutral-80"
                    }`}
                >
                  <CheckIcon className="w-4 h-4" />
                </span>
                {character.name}
              </span>
            </SelectCard>
          );
        })}
      </div>

      <Button size="lg" fullWidth className="mt-8">
        가입하기
      </Button>
    </AuthLayout>
  );
}

export default CharacterSelectPage;