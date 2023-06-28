import { useState } from "react";
import { CheckInput } from "../Create/create";
import {
  OtkatBottom,
  OtkatMain,
  OtkatTextarea,
  OtkatTop,
} from "../Otkat/otkat";
import styles from "./arbitration.module.scss";

export const Arbitration: React.FC = () => {
  return (
    <div className={styles.arbitr + " page"}>
      <OtkatTop
        title="Арбитраж"
        text="Предложите вариант распределения средств по заданию. Ваше предложение будет учтено Арбитражем."
      />
      <div className={styles.arbitr__wrapper + " wrapper"}>
        <OtkatMain isArbitr={true} />
        <RadioButtons />
        <OtkatTextarea text="Оставьте отзыв об исполнителе" />
      </div>
      <OtkatBottom />
    </div>
  );
};

const checkLabels = [
  "Результат не соответствует ТЗ",
  "Задание выполнено не до конца",
  "Исполнитель назначен по ошибке",
  "Другое",
];

const RadioButtons: React.FC = () => {
  const [check, setCheck] = useState<string>("");
  return (
    <>
      <span className={styles.radio__title}>Укажите суть претензии</span>
      <ul className={styles.radio__list}>
        {checkLabels.map((label) => (
          <CheckInput
            key={label}
            isCheck={check === label}
            handleCheck={() => setCheck(label)}
            label={label}
          />
        ))}
      </ul>
    </>
  );
};
