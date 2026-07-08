import "./InfoSection.css";

const PREVIEW_VIDEO_SRC = "/videos/momentum-preview.mp4";

export function InfoSection() {
  return (
    <section className="info-section" id="info" aria-labelledby="info-title">
      <div className="info-section__inner">
        <p className="info-section__eyebrow">O ebooku</p>
        <h2 className="info-section__title" id="info-title">
          Momentum — przewodnik po pełni życia
        </h2>

        <div className="info-section__prose">
          <p>
            W życiu każdego (mam nadzieję) człowieka przychodzi czas, gdy myśli,
            by coś zmienić.
          </p>
          <p>
            Mój to gdy pomyślałem, by to zacząć, a Twój — by tu wejść. To krok
            pierwszy — za każdym pomysłem, by zmaterializować zmianę, musi pójść
            działanie. Na ten moment Twoim następnym krokiem jest przeczytanie
            ebooka.
          </p>
          <p>
            Pomyśl sobie, że to taki tekst marketingowy — po części tak jest, bo
            każdy chce zarobić. Jednak nie do końca.
          </p>
          <p>
            Jeśli jesteś w sytuacji, gdzie chcesz przeczytać to, co napisałem, a
            nie masz 75&nbsp;zł na wydanie, napisz do mnie na Instagramie{" "}
            <a
              className="info-section__link"
              href="https://instagram.com/szarasik"
              target="_blank"
              rel="noopener noreferrer"
            >
              @szarasik
            </a>
            , a ebooka wyślę Ci za darmo.
          </p>
          <p>
            Jak chcesz, może to zadziałać w drugą stronę — jak masz na koncie o
            kilka milionów za dużo i już nie możesz na nie patrzeć — na dole masz
            mój numer konta.
          </p>
          <p>
            Zależnie ile przelejesz, kupię sobie nowy rower lub dom. Domu jeszcze
            nie posiadam.
          </p>
          <p>10 czy 20&nbsp;zł też przyjmę, pójdę na kawę.</p>
        </div>

        <div className="info-section__bank">
          <p className="info-section__bank-label">Numer konta</p>
          <p className="info-section__bank-number">95102036680000560204739811</p>
          <p className="info-section__author">Miłosz Szaraniec</p>
        </div>

        <div className="info-section__video-block">
          <h3 className="info-section__video-title">Momentum — podgląd 4K</h3>
          <div className="info-section__video-frame">
            <video
              className="info-section__video"
              controls
              playsInline
              preload="metadata"
              src={PREVIEW_VIDEO_SRC}
            >
              Twoja przeglądarka nie obsługuje odtwarzania wideo.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
