import { Arrow } from "../../register/register";
import styles from "./otkat.module.scss";
import sprite from "../../../assets/images/svg/sprite.svg";
import { CustomRange } from "../../invest/Plans/plans";
import { useState } from "react";
import { CustomTextarea } from "../Create/create";
import { Link } from "react-router-dom";

export const Otkat: React.FC = () => {
  return (
    <div className={styles.otkat + " page"}>
      <OtkatTop
        title="Взаимооткат"
        text="Решив отменить задание, вы можете предложить исполнителю
            компенсацию. Если вам не удастся договориться, передайте задание в
            Арбитраж."
      />
      <div className={styles.otkat__wrapper + " wrapper"}>
        <OtkatMain />
        <OtkatBottom />
      </div>
    </div>
  );
};

interface OtkatTopProps {
  title: string;
  text: string;
}

export const OtkatTop: React.FC<OtkatTopProps> = ({ title, text }) => {
  return (
    <div className={styles.otkat__top}>
      <div className={styles.otkat__wrapper + " wrapper"}>
        <Arrow link="/deals" />
        <h1 className={styles.otkat__title}>{title}</h1>
        <div className={styles.otkat__block}>
          <svg width={20} height={20} viewBox="0 0 20 20">
            <use xlinkHref={`${sprite}#inform`} />
          </svg>
          <p className={styles.otkat__text}>{text}</p>
        </div>
      </div>
    </div>
  );
};

interface OtkatMainProps {
  isArbitr?: boolean;
}

export const OtkatMain: React.FC<OtkatMainProps> = ({ isArbitr }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <div className={styles.range__flex}>
        <span className={styles.range__label}>Вам</span>
        <span className={styles.range__label}>Исполнителю</span>
      </div>
      <div className={styles.range}>
        <div className={styles.range__left}>
          <input
            readOnly
            inputMode="numeric"
            type="text"
            className={styles.range__input}
            value={100 - value + "%"}
          />
        </div>
        <CustomRange
          start={0}
          end={100}
          value={value}
          handleChange={(num: number) => setValue(num)}
          isOtkat={true}
        />
        <div className={styles.range__right}>
          <input
            readOnly
            inputMode="numeric"
            type="text"
            value={value + "%"}
            className={styles.range__input}
          />
        </div>
      </div>
      {isArbitr ? null : (
        <OtkatTextarea text="Аргументируйте, пожалуйста, свое предложение" />
      )}
    </>
  );
};

interface OtkatTextareaProps {
  text: string;
}

export const OtkatTextarea: React.FC<OtkatTextareaProps> = ({ text }) => {
  return (
    <div className={styles.range__container}>
      <CustomTextarea
        text={text}
        height={85}
        max={500}
        dopClass={styles.range__textarea}
      />
    </div>
  );
};

export const OtkatBottom: React.FC = () => {
  return (
    <div className={styles.bottom}>
      <button className={styles.bottom__button}>Отправить</button>
      <Link to="/deals">
        <button className={styles.bottom__cancel}>Отмена</button>
      </Link>
    </div>
  );
};
