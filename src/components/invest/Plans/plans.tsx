import styles from "./plans.module.scss";
import image from "../../../assets/images/invest/image.png";
import image1 from "../../../assets/images/invest/flyMoney.png";
import image2 from "../../../assets/images/invest/wallet.png";
import sprite from "../../../assets/images/svg/sprite.svg";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const items = [
  { image: image, start: 1, end: 300, price: "15$" },
  { image: image, start: 1, end: 120, price: "85$" },
  { image: image, start: 1, end: 850, price: "35$" },
];

export const Plans: React.FC = () => {
  return (
    <div className={styles.plans}>
      <div className={styles.plans__wrapper + " wrapper"}>
        <h2 className={styles.plans__title + " title"}>
          Инвестируйте
          <br /> в Garant
        </h2>
        <p className={styles.plans__subtitle}>
          Покупай юниты и начни инвестировать сейчас. Предполагаемый доход из 1
          юнита: 27₴ каждый месяц навсегда!
        </p>
      </div>
      <div>
        <ul className={styles.plans__list}>
          {items.map((data) => (
            <PlansItem key={data.end} data={data} />
          ))}
        </ul>
      </div>
      <div className={styles.plans__wrapper + " wrapper"}>
        <PlansExample />
      </div>
    </div>
  );
};

interface PlansItemProps {
  data: {
    image: string;
    start: number;
    end: number;
    price: string;
  };
}

const PlansItem: React.FC<PlansItemProps> = ({ data }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const el = document.querySelector("html");
    if (el) {
      isOpen ? (el.style.overflowY = "hidden") : (el.style.overflowY = "auto");
    }
  }, [isOpen]);

  return (
    <li className={styles.plans__item}>
      <span className={styles.plans__line}></span>
      <img src={data.image} alt="image" className={styles.plans__image} />
      <h4 className={styles.plans__number}>
        От {data.start} до {data.end} юнитов
      </h4>
      <div className={styles.plans__bottom}>
        <button onClick={() => setOpen(true)} className={styles.plans__button}>
          Купить
        </button>
        <span className={styles.plans__price}>{data.price}/юнит</span>
      </div>
      <CSSTransition
        in={isOpen}
        unmountOnExit
        classNames="fade-in"
        timeout={400}
      >
        <ModalBuy handleClose={() => setOpen(false)} data={data} />
      </CSSTransition>
    </li>
  );
};

const PlansExample: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const el = document.querySelector("html");
    if (el) {
      isOpen ? (el.style.overflowY = "hidden") : (el.style.overflowY = "auto");
    }
  }, [isOpen]);

  return (
    <>
      <div className={styles.example}>
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          className={styles.example__icon}
        >
          <use xlinkHref={`${sprite}#inform`} />
        </svg>
        <div className={styles.example__right}>
          <p className={styles.example__text}>
            1 юнит — это 100% комиссии от всех сделок в среднем на 1 клиента
            сервиса.
          </p>
          <button
            onClick={() => setOpen(true)}
            className={styles.example__button}
          >
            Подробнее как это работает
          </button>
        </div>
      </div>
      <CSSTransition
        in={isOpen}
        unmountOnExit
        classNames="fade-in"
        timeout={400}
      >
        <ModalExample handleClose={() => setOpen(false)} />
      </CSSTransition>
    </>
  );
};

interface ModalExampleProps {
  handleClose: MouseEventHandler;
}

const ModalExample: React.FC<ModalExampleProps> = ({ handleClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__wrapper}>
        <button onClick={handleClose} className={styles.modal__close}></button>
        <h2 className={styles.modal__title + " title"}>Пример:</h2>
        <p className={styles.modal__subtitle}>
          Вы владелец 100 клиентов. Они за 1 день сделали 25 сделок, от 100₴ до
          5000₴: средний чек: 800 грн
        </p>
        <div className={styles.modal__image_container}>
          <img src={image1} alt="flyMoney" className={styles.modal__image} />
        </div>
        <ModalList />
        <div className={styles.modal__bottom}>
          <div className={styles.modal__block}>
            <span className={styles.modal__icon}>
              <GradientMoney />
            </span>
            <div className={styles.modal__right}>
              <span className={styles.modal__solar}>Чистая прибыль:</span>
              <span className={styles.modal__solar_day}>160₴/день</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ModalBuyProps extends PlansItemProps {
  handleClose: MouseEventHandler;
}

const ModalBuy: React.FC<ModalBuyProps> = ({ handleClose, data }) => {
  const [next, setNext] = useState<boolean>(false);

  return (
    <>
      {next ? (
        <ModalEnd handleClose={handleClose} />
      ) : (
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <button
              onClick={handleClose}
              className={styles.modal__close}
            ></button>
            <h2 className={styles.modal__title + " title"}>Покупка</h2>
            <div className={styles.buy__image_container}>
              <img
                src={data.image}
                alt="buy-item"
                className={styles.buy__image}
              />
            </div>
            <p className={styles.buy__numbers}>
              От {data.start} до {data.end} юнитов
            </p>
            <ModalList dopClass={styles.buy__borders} />
            <ModalBuyBottom data={data} />
            <button
              onClick={() => setNext(true)}
              className={styles.buy__button + " button"}
            >
              Далее
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ModalBuyBottom: React.FC<PlansItemProps> = ({ data }) => {
  const [value, setValue] = useState<number>(data.start);
  const inpRef = useRef<HTMLInputElement>(null);

  function handleChangeInput() {
    if (inpRef.current) {
      const val = inpRef.current.value;
      if (val === "") {
        setValue(0);
      }

      if (Number(val) > data.end) {
        setValue(data.end);
        return false;
      }

      if (/[0-9]/g.test(val)) {
        setValue(Number(val));
      }
    }
  }

  function handleBlur() {
    if (inpRef.current) {
      const val = Number(inpRef.current.value);
      if (val === 0) {
        setValue(1);
      }
    }
  }
  return (
    <div className={styles.buy__bottom}>
      <input
        ref={inpRef}
        onChange={handleChangeInput}
        type="text"
        inputMode="numeric"
        className={styles.buy__value}
        value={value}
        onBlur={handleBlur}
      />
      <div className={styles.buy__range}>
        <span className={styles.buy__start}>{data.start}</span>
        <CustomRange
          value={value}
          start={data.start}
          end={data.end}
          handleChange={(num: number) => {
            setValue(num);
          }}
        />
        <span className={styles.buy__end}>{data.end}</span>
      </div>
    </div>
  );
};

interface CustomRangeProps {
  value: number;
  start: number;
  end: number;
  handleChange: any;
  isOtkat?: boolean;
}

export const CustomRange: React.FC<CustomRangeProps> = ({
  value,
  start,
  end,
  handleChange,
  isOtkat,
}) => {
  return (
    <Slider
      style={{
        height: 29,
        padding: "13px 0",
      }}
      defaultValue={start}
      value={value}
      min={start}
      max={end}
      onChange={handleChange}
      handleStyle={{
        width: 29,
        height: 29,
        marginTop: -13,
        background: "linear-gradient(90deg, #7037E5 0%, #9B58EE 100%)",
        border: `2px solid ${isOtkat ? "#07010E" : "#F6F6F7"}`,
      }}
      railStyle={{
        background: "#B081EB",
      }}
      trackStyle={{
        background: "#B081EB",
      }}
    />
  );
};

interface ModalEndProps {
  handleClose: MouseEventHandler;
}

const ModalEnd: React.FC<ModalEndProps> = ({ handleClose }) => {
  return (
    <div className={styles.modal + ` ${styles.end}`}>
      <div className={styles.modal__wrapper + ` ${styles.end__wrapper}`}>
        <div className={styles.end__container}>
          <button
            onClick={handleClose}
            className={styles.modal__close}
          ></button>
          <h2 className={styles.modal__title + " title"}>Договор</h2>
          <p className={styles.end__text}>
            Государства, заключающие настоящий Договор, ниже именуемые
            «Участниками Договора», Учитывая опустошительные последствия,
            которые имела бы для всего человечества ядерная война, и вытекающую
            из этого необходимость приложить все усилия для предотвращения
            опасности возникновения такой войны и принять меры для обеспечения
            безопасности народов, Считая, что распространение ядерного оружия
            серьезно увеличило бы опасность ядерной войны, В соответствии с
            резолюциями Генеральной Ассамблеи Организации Объединенных Наций,
            призывающими к заключению соглашения о предотвращении более широкого
            распространения ядерного оружия, Обязуясь сотрудничать в целях
            содействия применению гарантий Международного агентства по атомной
            энергии в отношении мирной ядерной деятельности, Выражая свою
            поддержку усилиям по исследованию, усовершенствованию и другим
            усилиям, направленным на содействие применению в рамках системы
            гарантий Международного агентства по атомной энергии принципа
            эффективных гарантий в отношении движения исходных и специальных
            расщепляющихся материалов посредством использования приборов и
            других технических способов в определенных ключевых местах,
            Подтверждая тот принцип, что блага мирного применения ядерной
            технологии, включая любые технологические побочные продукты, которые
            могут быть получены государствами, обладающими ядерным оружием, от
            развития ядерных взрывных устройств, должны быть доступны для мирных
            целей всем государствам-участникам Договора, как обладающим, так и
            не обладающим ядерным оружием, Будучи убежденными, что в
            осуществление этого принципа все Участники настоящего Договора имеют
            право участвовать в возможно самом полном обмене научной информацией
            для дальнейшего развития применения атомной энергии в мирных целях и
            вносить в это развитие свой вклад по отдельности или в
            сотрудничестве с другими государствами, Заявляя о своем намерении по
            возможности скорее достигнуть прекращения гонки ядерных вооружений и
            принять эффективные меры в направлении ядерного разоружения,
            Настоятельно призывая к сотрудничеству.
          </p>
          <input
            id="inputCheck"
            type="checkbox"
            className={styles.end__check_inp}
          />
          <label htmlFor="inputCheck" className={styles.end__check}>
            <span className={styles.end__check_icon}></span>
            <span className={styles.end__check_text}>Принимаю условия</span>
          </label>
        </div>
        <div className={styles.end__bottom}>
          <div className={styles.end__grid}>
            <button className={styles.buy__button + " button"}>
              С личного счета
            </button>
            <button className={styles.buy__button + " button"}>LiqPay</button>
          </div>
          <button className={styles.end__apple}>
            <img
              src={image2}
              alt="wallet"
              className={styles.end__apple_image}
            />
            <span className={styles.end__apple_text}>Оплатить с Apple Pay</span>
          </button>
          <p className={styles.end__info}>
            <span className={styles.end__info_icon}>!</span>
            Копия договора будет отправлена вам на email.
          </p>
        </div>
      </div>
    </div>
  );
};

interface ModalList {
  dopClass?: string;
}

const ModalList: React.FC<ModalList> = ({ dopClass }) => {
  return (
    <ul className={styles.modal__list + ` ${dopClass}`}>
      <li className={styles.modal__link}>
        <span className={styles.modal__info}>Итого оборот:</span>
        <span className={styles.modal__value}>8000₴</span>
      </li>
      <li className={styles.modal__link}>
        <span className={styles.modal__info}>Комиссия:</span>
        <span className={styles.modal__value}>3%</span>
      </li>
      <li className={styles.modal__link}>
        <span className={styles.modal__info}>Доход:</span>
        <span className={styles.modal__value}>240₴</span>
      </li>
      <li className={styles.modal__link}>
        <span className={styles.modal__info}>Себестоимость сделок:</span>
        <span className={styles.modal__value}>80₴ (1%)</span>
      </li>
    </ul>
  );
};

const GradientMoney: React.FC = () => {
  return (
    <svg
      width="24"
      height="18"
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.6 8.99995C9.6 7.67447 10.6745 6.59995 12 6.59995C13.3255 6.59995 14.4 7.67447 14.4 8.99995C14.4 10.3254 13.3255 11.4 12 11.4C10.6745 11.4 9.6 10.3254 9.6 8.99995Z"
        fill="url(#paint0_linear_512_350)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2.59995C0 1.27447 1.07452 0.199951 2.4 0.199951H21.6C22.9255 0.199951 24 1.27447 24 2.59995V15.4C24 16.7254 22.9255 17.8 21.6 17.8H2.4C1.07452 17.8 0 16.7254 0 15.4V2.59995ZM6.4 3.39995H3.2V6.59995H4.8V4.99995H6.4V3.39995ZM19.2 4.99995H17.6V3.39995H20.8V6.59995H19.2V4.99995ZM12 4.99995C9.79086 4.99995 8 6.79081 8 8.99995C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 8.99995C16 6.79081 14.2091 4.99995 12 4.99995ZM17.6 13V14.6H20.8V11.4H19.2V13H17.6ZM3.2 11.4H4.8V13H6.4V14.6H3.2V11.4Z"
        fill="url(#paint1_linear_512_350)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_512_350"
          x1="2.23517e-08"
          y1="8.99995"
          x2="24"
          y2="8.99995"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7037E5" />
          <stop offset="1" stopColor="#9B58EE" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_512_350"
          x1="2.23517e-08"
          y1="8.99995"
          x2="24"
          y2="8.99995"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7037E5" />
          <stop offset="1" stopColor="#9B58EE" />
        </linearGradient>
      </defs>
    </svg>
  );
};
