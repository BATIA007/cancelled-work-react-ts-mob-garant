import { Arrow } from "../../register/register";
import styles from "./create.module.scss";
import sprite from "../../../assets/images/svg/sprite.svg";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { CustomInput } from "../../finance/Deposit/deposit";
import { Button } from "../../profile/profile";
import Calendar from "./Calendar/calendar";
import { CSSTransition } from "react-transition-group";

export const DealsCreate: React.FC = () => {
  return (
    <div className={styles.create + " page"}>
      <div className={styles.create__wrapper + " wrapper"}>
        <Arrow link="/deals" />
        <FirstInputGroup />
        <SecondInputGroup />
        <ThirdInputGroup />
        <Button w={20} h={19} icon="plus" text="Создать сделку" />
      </div>
    </div>
  );
};

const FirstInputGroup: React.FC = () => {
  return (
    <>
      <CustomTextarea text="Введите название" max={50} height={39} />
      <span className={styles.create__label}>Исполнитель</span>
      <div className={styles.create__input_container}>
        <input
          placeholder="Введите номер, ID, email"
          type="text"
          className={styles.create__input}
        />
        <button className={styles.create__scan}>
          <svg fill="none" width={16} height={16} viewBox="0 0 16 16">
            <use xlinkHref={`${sprite}#scan`} />
          </svg>
        </button>
      </div>
      <span className={styles.create__label}>Опишите сделку</span>
      <div className={styles.create__container}>
        <CustomTextarea
          text="Опишите задание подробно, не упуская ни одного условия"
          max={300}
          dopClass={styles.create__area}
          height={85}
        />
        <span className={styles.create__limit}>Макс. 300 символов</span>
      </div>
      <CustomFileInput />
    </>
  );
};

interface TextareaProps {
  text: string;
  max: number;
  height: number;
  dopClass?: string;
}

export const CustomTextarea: React.FC<TextareaProps> = ({
  text,
  max,
  height,
  dopClass,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  function handleChange() {
    if (ref.current) {
      const el = ref.current;
      setTimeout(function () {
        el.style.cssText = `height:${height}px; padding:0`;
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 1);
    }
  }

  return (
    <textarea
      rows={1}
      maxLength={max}
      ref={ref}
      onChange={handleChange}
      placeholder={text}
      className={styles.create__title + ` ${dopClass}`}
    />
  );
};

const CustomFileInput: React.FC = () => {
  return (
    <>
      <input id="inputFile" type="file" className={styles.file__input} />
      <label htmlFor="inputFile" className={styles.file__label}>
        <svg
          className={styles.file__icon}
          width={20}
          height={21}
          viewBox="0 0 20 21"
        >
          <use xlinkHref={`${sprite}#upload`} />
        </svg>
        Прикрепить файлы<span className={styles.file__limit}>(до 50 мб.)</span>
      </label>
    </>
  );
};

const checkLabels = ["Исполнитель", "Я, заказчик", "50/50"];

const SecondInputGroup: React.FC = () => {
  const [check, setCheck] = useState<string>("Исполнитель");
  return (
    <>
      <CustomInput isDeals={true} />
      <span className={styles.radio__info}>Оплачивает комиссию</span>
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

interface CheckInputProps {
  isCheck: boolean;
  handleCheck: ChangeEventHandler;
  label: string;
}

export const CheckInput: React.FC<CheckInputProps> = ({
  isCheck,
  handleCheck,
  label,
}) => {
  return (
    <li className={styles.radio__link}>
      <input
        checked={isCheck}
        onChange={handleCheck}
        type="radio"
        name="who"
        id={label}
        className={styles.radio__input}
      />
      <label
        htmlFor={label}
        className={
          styles.radio__label + ` ${isCheck ? styles.radio__label_checked : ""}`
        }
      >
        <span className={styles.radio__circle}></span>
        {label}
      </label>
    </li>
  );
};

const tabs = ["1 час", "2 часа", "4 часа", "1 день", "7 дней"];

const ThirdInputGroup: React.FC = () => {
  const [isTab, setTab] = useState<string>("");
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <span className={styles.create__label}>Установите срок выполнения</span>
      <div className={styles.input__flex}>
        <CustomDate
          date={date}
          handleOpen={() => setOpen(true)}
          isOpen={isOpen}
          handleDate={(date) => setDate(date)}
          handleClose={() => setOpen(false)}
        />
        <CustomTime value={time} handleTime={(val: string) => setTime(val)} />
      </div>
      <ul className={styles.input__tabs}>
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setTab((prev) => (prev === tab ? "" : tab))}
            className={
              styles.input__tab +
              ` ${isTab === tab ? styles.input__tab_active : ""}`
            }
          >
            {tab}
          </li>
        ))}
      </ul>
    </>
  );
};

interface CustomDateProps {
  date: Date | null;
  handleOpen: MouseEventHandler;
  handleDate: MouseEventHandler;
  isOpen: boolean;
  handleClose: MouseEventHandler;
}

const CustomDate: React.FC<CustomDateProps> = ({
  date,
  handleOpen,
  handleDate,
  isOpen,
  handleClose,
}) => {
  function handleClick(event: any) {
    const el = event.target;
    if (el) {
      if (!el.closest(".calendar")) {
        handleClose(event);
      }
    }
  }
  return (
    <>
      <div onClick={handleOpen} className={styles.input__container}>
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          className={styles.input__icon}
        >
          <use xlinkHref={`${sprite}#date`} />
        </svg>
        <input
          readOnly
          placeholder={`${new Date().toLocaleDateString()}`}
          value={date !== null ? date.toLocaleDateString() : ""}
          type="text"
          className={styles.input__date}
        />
      </div>
      <CSSTransition
        classNames="opacity"
        in={isOpen}
        unmountOnExit
        timeout={300}
      >
        <Calendar
          selectDate={date}
          hadnleClick={handleClick}
          onChange={handleDate}
        />
      </CSSTransition>
    </>
  );
};

interface CustomTimeProps {
  value: string;
  handleTime: Function;
}

const CustomTime: React.FC<CustomTimeProps> = ({ handleTime, value }) => {
  const ref = useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  function handleChange() {
    if (ref.current) {
      let val = ref.current.value;
      if (/[^0-9:]/g.test(val)) return false;
      if (val.length === 2 && value.length < val.length) val += ":";

      handleTime(val);
    }
  }

  return (
    <>
      <div className={styles.input__container}>
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          className={styles.input__icon}
        >
          <use xlinkHref={`${sprite}#time_fill`} />
        </svg>
        <input
          maxLength={5}
          ref={ref}
          value={value}
          onChange={handleChange}
          onFocus={() =>
            lineRef.current?.classList.add(styles.input__line_active)
          }
          onBlur={() =>
            lineRef.current?.classList.remove(styles.input__line_active)
          }
          placeholder="21:00"
          type="text"
          inputMode="numeric"
          className={styles.input__date}
        />
        <span ref={lineRef} className={styles.input__line}></span>
      </div>
    </>
  );
};
