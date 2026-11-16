import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import SelectCard from "../../components/SelectCard";
import CheckIcon from "../../components/CheckIcon";
import Button from "../../components/Button";
import jjakiUrl from "../../assets/characters/jjaki.png";
import kkongiUrl from "../../assets/characters/kkongi.png";

const characters = [
  { name: "짝이", image: jjakiUrl, left: "-left-[2px]" },
  { name: "꽁이", image: kkongiUrl, left: "left-[17px]" },
];

function CharacterSelectPage() {
  const [selectedName, setSelectedName] = useState(characters[0].name);

  return (
    <AuthLayout size="lg">
      <h1 className="text-base font-bold text-neutral-10">초기 캐릭터 선택</h1>
      <p className="mt-0.5 text-small text-primary-10">
        첫 시작을 함께할 캐릭터를 골라보세요! (최초 1회)
      </p>

      <div className="mt-[33px] grid grid-cols-2 gap-[25px]">
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
                className={`relative w-full h-[240px] rounded-t-[10px] bg-gradient-to-b from-white
                  ${selected ? "to-gradient-3" : "to-gradient-1"}`}
              >
                <img
                  src={character.image}
                  alt=""
                  className={`absolute -bottom-[8px] ${character.left} h-[283px] w-auto max-w-none`}
                />
              </div>

              <span className="mt-[11px] mb-1 flex items-center gap-2.5 text-small font-bold">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100
                    ${selected ? "shadow-50 text-primary-10" : "border border-neutral-60 text-neutral-80"}`}
                >
                  <CheckIcon className="w-6 h-6" />
                </span>
                {character.name}
              </span>
            </SelectCard>
          );
        })}
      </div>

      <Button size="lg" fullWidth className="mt-[33px]">
        가입하기
      </Button>
    </AuthLayout>
  );
}

export default CharacterSelectPage;