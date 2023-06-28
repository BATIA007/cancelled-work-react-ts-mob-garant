import styles from "./withdraw.module.scss";
import { CustomInput } from "../../finance/Deposit/deposit";
import card1 from "../../../assets/images/finance/card1.png";
import card2 from "../../../assets/images/finance/card2.png";
import { Button } from "../../profile/profile";
import { MouseEventHandler, useState } from "react";
import { CSSTransition } from "react-transition-group";

export const InvestWithdraw: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.withdraw}>
      <div className={styles.withdraw__wrapper + " wrapper"}>
        <CustomInput isWithdraw={true} />
        <p className={styles.withdraw__info}>Выберите карту</p>
        <ul className={styles.withdraw__cards}>
          <li className={styles.withdraw__card}>
            <img src={card1} alt="card" className={styles.withdraw__image} />
          </li>
          <li className={styles.withdraw__card}>
            <img src={card2} alt="card" className={styles.withdraw__image} />
          </li>
        </ul>
        <button className={styles.withdraw__button}>
          <span className={styles.withdraw__icon}>+</span>
          <span className={styles.withdraw__text}>Добавить новую</span>
        </button>
        <div className={styles.withdraw__bottom}>
          <Button
            w={17}
            h={18}
            icon="add"
            text="Вывести"
            dopClass={styles.withdraw__button_get}
          />
          <p className={styles.withdraw__danger}>
            <span className={styles.withdraw__info_icon}>!</span>
            <span>Вывод средств производится в течении 24 ч.</span>
          </p>
          <button
            onClick={() => setOpen(true)}
            className={styles.withdraw__rules}
          >
            Условия вывода
          </button>
        </div>
        <CSSTransition
          classNames="opacity"
          in={open}
          timeout={300}
          unmountOnExit
        >
          <Modal handleClose={() => setOpen(false)} />
        </CSSTransition>
      </div>
    </div>
  );
};

interface ModalProps {
  handleClose: MouseEventHandler;
}

const Modal: React.FC<ModalProps> = ({ handleClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__wrapper}>
        <div className={styles.modal__container}>
          <button
            onClick={handleClose}
            className={styles.modal__close}
          ></button>
          <h2 className={styles.modal__title}>Условия вывода</h2>
          <p className={styles.modal__text}>
            Ставки на футбольные матчи принимаются на основное время,
            обусловленное регламентом матча/турнира. Оно включает в себя
            добавочное/компенсированное время, назначенное судьей /
            представителем встречи по истечению основного времени игры
            (матча/тайма).Минутами событий, состоявшихся в
            компенсированное/добавленное судьей время, считаются 45 или 90
            минута. Футбольные матчи предлагается играть как на чистую победу
            одной из команд или ничью, так и с форой. Предлагаются различные
            значения фор и тоталов. Игра на суммарное количество забитых голов
            ("тотал"). При попадании в "тотал" ставки рассчитываются с коэфф. 1.
            Для кубковых соревнований, состоящих из нескольких матчей,
            предлагается игра на проход в следующий раунд. Проход определяется
            по сумме всех состоявшихся матчей. Игра "Кто лучше по забитым
            мячам". Для сравнения предлагаются две команды из разных матчей.
            Лучшей будет признана та из команд, которая забьет больше мячей. При
            одинаковой результативности - ставка рассчитывается с коэфф. 1.
            Ставки на игру "Кто лучше по забитым мячам" не принимаются в
            экспрессы, системы с участием предложенных команд. Можно делать
            ставки на индивидуальный "тотал" команды (при указанных
            коэффициентах). При попадании в "тотал" - ставки рассчитываются с
            коэфф. 1. Можно сделать ставку на двойной результат: 1Х - победа
            первой команды или ничья; Х2 - победа второй команды или ничья; 12 -
            победа первой команды или второй. Ставки на футбольные матчи
            принимаются на основное время, обусловленное регламентом
            матча/турнира. Оно включает в себя добавочное/компенсированное
            время, назначенное судьей / представителем встречи по истечению
            основного времени игры (матча/тайма).Минутами событий, состоявшихся
            в компенсированное/добавленное судьей время, считаются 45 или 90
            минута. Футбольные матчи предлагается играть как на чистую победу
            одной из команд или ничью, так и с форой. Предлагаются различные
            значения фор и тоталов. Игра на суммарное количество забитых голов
            ("тотал"). При попадании в "тотал" ставки рассчитываются с коэфф. 1.
            Для кубковых соревнований, состоящих из нескольких матчей,
            предлагается игра на проход в следующий раунд. Проход определяется
            по сумме всех состоявшихся матчей. Игра "Кто лучше по забитым
            мячам". Для сравнения предлагаются две команды из разных матчей.
            Лучшей будет признана та из команд, которая забьет больше мячей. При
            одинаковой результативности - ставка рассчитывается с коэфф. 1.
            Ставки на игру "Кто лучше по забитым мячам" не принимаются в
            экспрессы, системы с участием предложенных команд. Можно делать
            ставки на индивидуальный "тотал" команды (при указанных
            коэффициентах). При попадании в "тотал" - ставки рассчитываются с
            коэфф. 1. Можно сделать ставку на двойной результат: 1Х - победа
            первой команды или ничья; Х2 - победа второй команды или ничья; 12 -
            победа первой команды или второй. Ставки на футбольные матчи
            принимаются на основное время, обусловленное регламентом
            матча/турнира. Оно включает в себя добавочное/компенсированное
            время, назначенное судьей / представителем встречи по истечению
            основного времени игры (матча/тайма).Минутами событий, состоявшихся
            в компенсированное/добавленное судьей время, считаются 45 или 90
            минута. Футбольные матчи предлагается играть как на чистую победу
            одной из команд или ничью, так и с форой. Предлагаются различные
            значения фор и тоталов. Игра на суммарное количество забитых голов
            ("тотал"). При попадании в "тотал" ставки рассчитываются с коэфф. 1.
            Для кубковых соревнований, состоящих из нескольких матчей,
            предлагается игра на проход в следующий раунд. Проход определяется
            по сумме всех состоявшихся матчей. Игра "Кто лучше по забитым
            мячам". Для сравнения предлагаются две команды из разных матчей.
            Лучшей будет признана та из команд, которая забьет больше мячей. При
            одинаковой результативности - ставка рассчитывается с коэфф. 1.
            Ставки на игру "Кто лучше по забитым мячам" не принимаются в
            экспрессы, системы с участием предложенных команд. Можно делать
            ставки на индивидуальный "тотал" команды (при указанных
            коэффициентах). При попадании в "тотал" - ставки рассчитываются с
            коэфф. 1. Можно сделать ставку на двойной результат: 1Х - победа
            первой команды или ничья; Х2 - победа второй команды или ничья; 12 -
            победа первой команды или второй.
          </p>
        </div>
      </div>
    </div>
  );
};
