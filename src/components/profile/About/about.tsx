import { Arrow } from "../../register/register";
import { FooterProfile } from "../profile";
import styles from "./about.module.scss";
import sprite from "../../../assets/images/svg/sprite.svg";
import smile1 from "../../../assets/images/profile/smile1.png";
import smile2 from "../../../assets/images/profile/smile2.png";
import smile3 from "../../../assets/images/profile/smile3.png";
import smile4 from "../../../assets/images/profile/smile4.png";

export const About: React.FC = () => {
  return (
    <div className={styles.about + " page"}>
      <div className={styles.about__wrapper + " wrapper"}>
        <Arrow link="/profile" />
        <h1 className={styles.about__title + " title"}>О сервисе</h1>
        <h2 className={styles.about__logo}>
          <svg width={171} height={45} viewBox="0 0 171 45">
            <use xlinkHref={`${sprite}#logo`} />
          </svg>
        </h2>
        <p className={styles.about__subtitle}>
          Игра на суммарное количество забитых голов ("тотал"). При попадании в
          "тотал" ставки рассчитываются с коэфф. 1.
        </p>
        <p className={styles.about__rule}>
          Для кубковых соревнований, состоящих из нескольких матчей,
          предлагается игра на проход в следующий раунд. Проход определяется по
          сумме всех состоявшихся матчей.
        </p>
        <Developers />
        <FooterProfile />
      </div>
    </div>
  );
};

const devs = [
  {
    name: "Пётр Иванов",
    work: "CEO Garant",
    smile: smile1,
    link: "https://www.instagram.com/",
  },
  {
    name: "Пётр Иванов",
    work: "COO Garant",
    smile: smile2,
    link: "https://www.instagram.com/",
  },
  {
    name: "Пётр Иванов",
    work: "Lead Designer",
    smile: smile3,
    link: "https://www.instagram.com/",
  },
  {
    name: "Я",
    work: "Super Front-End",
    smile: smile4,
    link: "https://www.instagram.com/",
  },
];

const Developers: React.FC = () => {
  return (
    <>
      <h4 className={styles.dev}>Разработчики</h4>
      <ul className={styles.dev__list}>
        {devs.map(({ name, work, smile, link }) => (
          <li key={smile} className={styles.dev__item}>
            <img src={smile} alt="smile" className={styles.dev__smile} />
            <div className={styles.dev__info}>
              <h5 className={styles.dev__name}>{name}</h5>
              <span className={styles.dev__work}>{work}</span>
            </div>
            <ul className={styles.dev__socials}>
              <li className={styles.dev__social}>
                <a href={link} target="_blank">
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="#ffffff"
                  >
                    <use xlinkHref={`${sprite}#telegram`} />
                  </svg>
                </a>
              </li>
              <li className={styles.dev__social}>
                <a href={link} target="_blank">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 25 26"
                    fill="#ffffff"
                  >
                    <use xlinkHref={`${sprite}#instagram`} />
                  </svg>
                </a>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
