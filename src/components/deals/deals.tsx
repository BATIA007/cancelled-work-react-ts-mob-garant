import styles from "./deals.module.scss";
import sprite from "../../assets/images/svg/sprite.svg";
import avatar1 from "../../assets/images/deals/avatar1.png";
import avatar2 from "../../assets/images/deals/avatar2.png";
import avatar3 from "../../assets/images/deals/avatar3.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Deals: React.FC = () => {
  return (
    <div className={styles.deals + " page"}>
      <div className={styles.deals__wrapper + " wrapper"}>
        <div className={styles.deals__top}>
          <h1 className={styles.deals__title + " title"}>Сделки</h1>
          <Link to="/deals/create">
            <button className={styles.deals__create}></button>
          </Link>
        </div>
        <ListActive mode="actives" data={actives} />
        <ListActive mode="complited" data={complited} />
        <ListActive mode="draft" data={draft} />
      </div>
    </div>
  );
};

const actives = [
  {
    title: "Сделать чат–бот в Telegram",
    name: "Елена Морозова",
    money: "200₴",
    time: "3ч 40м",
    avatar: avatar1,
  },
  {
    title: "Дать 15 минутную консультацию",
    name: "Андрей Семенов",
    money: "1000₴",
    time: "15м",
    avatar: avatar2,
  },
];

const complited = [
  {
    title: "Создать дизайн landing page",
    name: "Елена Морозова",
    money: "10, 000₴",
    time: "3ч 40м",
    avatar: avatar1,
  },
  {
    title: "Создать прототип сайта",
    name: "Андрей Семенов",
    money: "5000₴",
    time: "3ч 40м",
    avatar: avatar2,
  },
  {
    title: "Создать бриф",
    name: "Елена Зайцева",
    money: "1000₴",
    time: "3ч 40м",
    avatar: avatar3,
  },
];

const draft = [
  {
    title: "Создать дизайн landing page",
    name: "Андрей Семенов",
    money: "10, 000₴",
    time: "2ч 40м",
    avatar: avatar2,
  },
  {
    title: "Создать бриф",
    name: "Елена Зайцева",
    money: "200₴",
    time: "45м",
    avatar: avatar3,
  },
];

interface ListActiveProps {
  mode: string;
  data: {
    title: string;
    name: string;
    money: string;
    time: string;
    avatar: string;
  }[];
}

const ListActive: React.FC<ListActiveProps> = ({ mode, data }) => {
  const [show, setShow] = useState<boolean>(true);
  const [clear, setClear] = useState<boolean>(false);
  let title: string = "";
  if (mode === "actives") title = "Активные";
  if (mode === "complited") title = "Завершенные";
  if (mode === "draft") title = "Черновик";

  return (
    <>
      <div className={styles.actives__top}>
        <div className={styles.actives__left}>
          <h4 className={styles.actives__info}>{title}</h4>
          <span className={styles.actives__num}>{clear ? 0 : data.length}</span>
        </div>
        <div className={styles.actives__right}>
          {mode !== "actives" ? (
            <button
              onClick={() => setShow(!show)}
              className={styles.actives__hide}
            >
              {show ? "Скрыть" : "Показать"}
            </button>
          ) : null}
          {mode === "draft" ? (
            <button
              onClick={() => setClear(true)}
              className={styles.actives__clear}
            >
              Очистить
            </button>
          ) : null}
        </div>
      </div>
      {clear ? null : (
        <ul
          className={
            styles.actives__list + ` ${show ? "" : styles.actives__list_hide}`
          }
        >
          {data.map((data) => (
            <LinkActive key={data.title} mode={mode} data={data} />
          ))}
        </ul>
      )}
    </>
  );
};

interface LinkActiveProps {
  mode: string;
  data: {
    title: string;
    name: string;
    money: string;
    time: string;
    avatar: string;
  };
}

const LinkActive: React.FC<LinkActiveProps> = ({ mode, data }) => {
  return (
    <li
      className={
        styles.actives__link +
        ` ${mode === "draft" ? styles.actives__link_draft : ""}`
      }
    >
      <h5 className={styles.actives__title}>
        {mode !== "complited" ? (
          <span className={styles.actives__circle}></span>
        ) : null}
        {data.title}
      </h5>
      <p className={styles.actives__order}>{data.name}</p>
      <div className={styles.actives__bottom}>
        <div className={styles.actives__order_informs}>
          {mode !== "complited" ? (
            <span className={styles.actives__order_info}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <use xlinkHref={`${sprite}#time`} />
              </svg>
              {data.time}
            </span>
          ) : (
            <span className={styles.actives__nice}>
              <svg
                fill="none"
                stroke="white"
                width={14}
                height={10}
                viewBox="0 0 14 10"
              >
                <use xlinkHref={`${sprite}#nice`} />
              </svg>
            </span>
          )}
          <span className={styles.actives__order_info}>
            <svg
              fill="none"
              stroke="white"
              width={14}
              height={10}
              viewBox="0 0 14 10"
            >
              <use xlinkHref={`${sprite}#money`} />
            </svg>
            {data.money}
          </span>
        </div>
        <span className={styles.actives__avatar}>
          <Link to="/deals/semen">
            <img
              src={data.avatar}
              alt="avatar"
              className={styles.actives__image}
            />
          </Link>
        </span>
      </div>
    </li>
  );
};
