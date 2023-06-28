import { Arrow } from "../../register/register";
import styles from "./active.module.scss";
import sprite from "../../../assets/images/svg/sprite.svg";
import avatar from "../../../assets/images/deals/avatar2.png";
import avatar2 from "../../../assets/images/deals/avatar3.png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export const Messanger: React.FC = () => {
  return (
    <div className={styles.active + " page"}>
      <MessangerModal />
      <Chat />
    </div>
  );
};

const messagesData = [
  {
    text: "Салют!",
    time: "12:28",
    avatar: avatar2,
  },
  {
    text: "хай! долого ждать еще?",
    time: "12:31",
    avatar: avatar,
  },
  {
    text: "не, еще часик и скину",
    time: "12:32",
    avatar: avatar2,
  },
  {
    text: "ок, не могу дождаьтся",
    time: "12:32",
    avatar: avatar,
  },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState(messagesData);
  return (
    <div className={styles.chat}>
      <div className={styles.chat__wrapper + " wrapper"}>
        <span className={styles.chat__date}>Сегодня</span>
        <ul className={styles.chat__list}>
          {messages.map((message) => (
            <li className={styles.chat__link}>
              <img
                src={message.avatar}
                alt="avatar"
                className={styles.chat__avatar}
              />
              <p className={styles.chat__text}>
                {message.text}
                <span className={styles.chat__time}>{message.time}</span>
              </p>
              <svg
                width={13}
                height={10}
                viewBox="0 0 13 10"
                className={styles.chat__repeat}
              >
                <use xlinkHref={`${sprite}#repeat`} />
              </svg>
            </li>
          ))}
        </ul>
      </div>
      <ChatEnter />
    </div>
  );
};

const ChatEnter: React.FC = () => {
  return (
    <div className={styles.enter}>
      <div className={styles.enter__wrapper + " wrapper"}>
        <svg
          className={styles.enter__upload}
          width={20}
          height={21}
          viewBox="0 0 20 21"
        >
          <use xlinkHref={`${sprite}#upload`} />
        </svg>
        <CustomTextarea />
        <svg
          className={styles.enter__send}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <use xlinkHref={`${sprite}#send`} />
        </svg>
      </div>
    </div>
  );
};

const CustomTextarea: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  function handleChange() {
    if (ref.current) {
      const el = ref.current;
      setTimeout(function () {
        el.style.cssText = `height:18px; padding:0;`;
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 1);
    }
  }

  return (
    <div
      ref={refContainer}
      onClick={() => ref.current?.focus()}
      className={styles.enter__container}
    >
      <textarea
        rows={1}
        ref={ref}
        onChange={handleChange}
        placeholder="Введите сообщение"
        className={styles.enter__textarea}
      />
      <svg
        className={styles.enter__micro}
        width={14}
        height={18}
        viewBox="0 0 14 18"
      >
        <use xlinkHref={`${sprite}#micro`} />
      </svg>
    </div>
  );
};

export const MessangerModal: React.FC = () => {
  return (
    <div className={styles.top}>
      <div className={styles.top__wrapper + " wrapper"}>
        <Arrow link="/deals" />
        <div className={styles.top__flex}>
          <div className={styles.top__left}>
            <h1 className={styles.top__title}>Сделать чат–бот Telegram</h1>
            <InfoTabs />
          </div>
          <TopRight />
        </div>
        <ModalMain />
        <div className={styles.top__buttons}>
          <Link to="/deals/otkat">
            <button className={styles.top__button}>Взаимооткат</button>
          </Link>
          <Link to="/deals/arbitration">
            <button className={styles.top__button}>Арбитраж</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const InfoTabs: React.FC = () => {
  return (
    <ul className={styles.info__tabs}>
      <li className={styles.info__tab}>
        <svg
          className={styles.info__icon}
          width={14}
          height={14}
          viewBox="0 0 14 14"
        >
          <use xlinkHref={`${sprite}#time`} />
        </svg>
        15м
      </li>
      <li className={styles.info__tab}>
        <svg
          className={styles.info__icon}
          width={14}
          height={10}
          viewBox="0 0 14 10"
          fill="none"
          stroke="white"
        >
          <use xlinkHref={`${sprite}#money`} />
        </svg>
        1000₴
      </li>
      <li className={styles.info__tab + ` ${styles.info__tab_gold}`}>
        В работе
      </li>
    </ul>
  );
};

const TopRight: React.FC = () => {
  return (
    <ul className={styles.top__right}>
      <li className={styles.top__icon}>
        <svg
          fill="none"
          stroke="url(#paint0_linear_683_353)"
          width={14}
          height={10}
          viewBox="0 0 14 10"
        >
          <defs>
            <linearGradient
              id="paint0_linear_683_353"
              x1="8.00026"
              y1="1.79999"
              x2="8.00026"
              y2="9.73332"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#33D373" />
              <stop offset="1" stop-color="#24A797" />
            </linearGradient>
          </defs>

          <use xlinkHref={`${sprite}#nice`} />
        </svg>
      </li>
      <li className={styles.top__icon}>
        <svg
          fill="none"
          stroke="url(#paint0_linear_683_573)"
          width={14}
          height={14}
          viewBox="0 0 14 14"
        >
          <defs>
            <linearGradient
              id="paint0_linear_683_573"
              x1="7.00039"
              y1="1.40002"
              x2="7.00039"
              y2="12.6"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#D33333" />
              <stop offset="1" stop-color="#FF3A3A" />
            </linearGradient>
          </defs>

          <use xlinkHref={`${sprite}#close`} />
        </svg>
      </li>
    </ul>
  );
};

const ModalMain: React.FC = () => {
  const [like, setLike] = useState<string>("");
  return (
    <div className={styles.main}>
      <div className={styles.main__flex}>
        <div className={styles.main__left}>
          <span className={styles.main__info}>Исполнитель</span>
          <h2 className={styles.main__title}>Дмитрий Карогодский</h2>
        </div>
        <img src={avatar} alt="avatar" className={styles.main__avatar} />
      </div>
      <div className={styles.main__buttons}>
        <button className={styles.main__button}>Отзывы</button>
        <button
          className={styles.main__button + ` ${styles.main__button_more}`}
        >
          Еще задание
        </button>
      </div>
      <div className={styles.main__bottom}>
        <span className={styles.main__good}>Оцени коммуникацию</span>
        <div className={styles.main__rating}>
          <span onClick={() => setLike("like")} className={styles.main__like}>
            <svg
              width={20}
              height={20}
              viewBox="0 0 16 16"
              fill={
                like === "like"
                  ? "url(#paint0_linear_683_592)"
                  : "rgba(255, 255, 255, 0.2)"
              }
            >
              <defs>
                <linearGradient
                  id="paint0_linear_683_592"
                  x1="1.86265e-08"
                  y1="10.0333"
                  x2="20"
                  y2="10.0333"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#7037E5" />
                  <stop offset="1" stop-color="#9B58EE" />
                </linearGradient>
              </defs>

              <use xlinkHref={`${sprite}#like`} />
            </svg>
            {like === "like" ? "1" : null}
          </span>
          <span
            onClick={() => setLike("dislike")}
            className={styles.main__dislike}
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 16 16"
              fill={
                like === "dislike"
                  ? "url(#paint0_linear_683_592)"
                  : "rgba(255, 255, 255, 0.2)"
              }
            >
              <use xlinkHref={`${sprite}#dislike`} />
            </svg>
            {like === "dislike" ? "1" : null}
          </span>
        </div>
      </div>
    </div>
  );
};
