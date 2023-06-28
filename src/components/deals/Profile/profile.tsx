import { Arrow } from "../../register/register";
import styles from "./profile.module.scss";
import avatar from "../../../assets/images/deals/avatar2.png";
import sprite from "../../../assets/images/svg/sprite.svg";
import { useRef } from "react";

export const DealsProfile: React.FC = () => {
  return (
    <div className={styles.profile + " page"}>
      <div className={styles.profile__wrapper + " wrapper"}>
        <Arrow link="/deals" />
        <ProfileTop />
      </div>
    </div>
  );
};

const ProfileTop: React.FC = () => {
  return (
    <>
      <div className={styles.profile__avatar}>
        <img src={avatar} alt="avatar" className={styles.profile__image} />
      </div>
      <h1 className={styles.profile__title}>Дмитрий Карогодский</h1>
      <StatsList />
      <Reviews />
    </>
  );
};

const StatsList: React.FC = () => {
  return (
    <ul className={styles.profile__stats}>
      <li className={styles.profile__item}>
        <span className={styles.profile__info}>Рейтинг (124)</span>
        <span className={styles.profile__value}>
          <svg
            className={styles.profile__icon}
            fill="url(#paint0_linear_627_1403)"
            width={17}
            height={16}
            viewBox="0 0 17 16"
          >
            <defs>
              <linearGradient
                id="paint0_linear_627_1403"
                x1="0.5"
                y1="7.66807"
                x2="16.5"
                y2="7.66807"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7037E5" />
                <stop offset="1" stopColor="#9B58EE" />
              </linearGradient>
            </defs>
            <use xlinkHref={`${sprite}#star`} />
          </svg>
          5.0
        </span>
      </li>
      <li className={styles.profile__item}>
        <span className={styles.profile__info}>Сделки</span>
        <span className={styles.profile__value}>
          <svg
            className={styles.profile__icon}
            fill="url(#paint0_linear_627_1403)"
            width={17}
            height={16}
            viewBox="0 0 17 16"
          >
            <use xlinkHref={`${sprite}#mail`} />
          </svg>
          246
        </span>
      </li>
      <li className={styles.profile__item}>
        <span className={styles.profile__info}>Коммункация</span>
        <div className={styles.profile__likes}>
          <span className={styles.profile__value}>
            <svg
              className={styles.profile__icon}
              fill="url(#paint0_linear_627_1403)"
              width={17}
              height={16}
              viewBox="0 0 17 16"
            >
              <use xlinkHref={`${sprite}#like`} />
            </svg>
            22
          </span>
          <span className={styles.profile__value}>
            <svg
              className={styles.profile__icon}
              fill="url(#paint0_linear_627_1403)"
              width={17}
              height={16}
              viewBox="0 0 17 16"
            >
              <use xlinkHref={`${sprite}#dislike`} />
            </svg>
            1
          </span>
        </div>
      </li>
    </ul>
  );
};

const reviews = [
  {
    title: "Создать дизайн landing page",
    money: "10, 000₴",
    time: "3ч 40м",
    date: "14/01/2022",
    text: "Было все збс. Отлично справился с задачей. Так же выполнил раньше срока. Лайк.",
    rating: 3.6,
    isLike: true,
  },
  {
    title: "Создать прототип сайта",
    money: "5000₴",
    time: "1 д",
    date: "14/01/2022",
    text: "Было все збс. Ушел пить чай. Так и не вернулся...",
    rating: 1.2,
    isLike: false,
  },
  {
    title: "Создать бриф",
    money: "1000₴",
    time: "3ч 40м",
    date: "14/01/2022",
    text: "Было все збс. Отлично справился с задачей. Так же выполнил раньше срока. Лайк.",
    rating: 4.5,
    isLike: true,
  },
];

const Reviews: React.FC = () => {
  return (
    <section className={styles.reviews}>
      <p className={styles.reviews__title}>
        Отзывы <span className={styles.reviews__circle}>25</span>
      </p>
      <div className={styles.reviews__list}>
        {reviews.map((review) => (
          <article key={review.rating} className={styles.reviews__item}>
            <h4 className={styles.reviews__task}>{review.title}</h4>
            <div className={styles.reviews__informs}>
              <span className={styles.reviews__order_info}>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <use xlinkHref={`${sprite}#time`} />
                </svg>
                {review.time}
              </span>
              <span className={styles.reviews__order_info}>
                <svg
                  fill="none"
                  stroke="white"
                  width={14}
                  height={10}
                  viewBox="0 0 14 10"
                >
                  <use xlinkHref={`${sprite}#money`} />
                </svg>
                {review.money}
              </span>
            </div>
            <Rating
              rating={review.rating}
              date={review.date}
              isLike={review.isLike}
            />
            <p className={styles.reviews__text}>{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

interface RatingProps {
  rating: number;
  date: string;
  isLike: boolean;
}

const Rating: React.FC<RatingProps> = ({ rating, date, isLike }) => {
  const ref = useRef<HTMLDivElement>(null);

  if (ref.current) {
    ref.current.style.width = `${rating / 0.05}%`;
  }

  return (
    <div className={styles.rating__flex}>
      <div className={styles.rating__good}>
        <div className={styles.stars}>
          <div className={styles.stars__body}>
            <div ref={ref} className={styles.stars__active} />
            <ul className={styles.stars__list}>
              <li className={styles.stars__star}></li>
              <li className={styles.stars__star}></li>
              <li className={styles.stars__star}></li>
              <li className={styles.stars__star}></li>
              <li className={styles.stars__star}></li>
            </ul>
          </div>
        </div>
        <span className={styles.rating__date}>{date}</span>
      </div>
      <div className={styles.rating__nice}>
        <svg
          fill={isLike ? "url(#paint0_linear_627_1403)" : "#7D7A83"}
          width={16}
          height={16}
          viewBox="0 0 16 16"
        >
          <use xlinkHref={`${sprite}#like`} />
        </svg>
        <svg
          fill={isLike ? "#7D7A83" : "url(#paint0_linear_627_1403)"}
          width={16}
          height={16}
          viewBox="0 0 16 16"
        >
          <use xlinkHref={`${sprite}#dislike`} />
        </svg>
      </div>
    </div>
  );
};
