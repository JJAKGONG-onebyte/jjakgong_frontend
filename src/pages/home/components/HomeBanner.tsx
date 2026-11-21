import bannerImage from "../../../assets/home/banner-image.png";

function HomeBanner() {
  return (
    <section className="relative h-full overflow-hidden rounded-[15px] bg-primary-10 shadow-50">
      <img
        src={bannerImage}
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full w-auto opacity-80"
      />
      <div className="pointer-events-none absolute top-0 h-full w-[120px] bg-gradient-to-r from-primary-10 to-transparent right-[760px]" />

      <div className="relative z-10 px-9 pt-7">
        <span className="inline-flex rounded-full bg-white px-5 py-1 text-caption font-medium text-primary-10">
          학습 자료 관리
        </span>

        <h2 className="mt-2.5 text-base font-bold text-white">
          나의 학습 자료를 올리고 짝공과 함께 공부해 보세요!
        </h2>

        <p className="mt-2.5 text-small text-white">
          막히는 문제가 있다면 언제든 짝공에게 물어보세요.
          <br />
          AI 에이전트가 스스로 답을 찾을 수 있도록 친절하게 길을 안내해 줘요.
        </p>
      </div>
    </section>
  );
}

export default HomeBanner;