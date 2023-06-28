import styles from "./deposit.module.scss";
import liqpay from "../../../assets/images/finance/liqpay.png";
import bitcoin from "../../../assets/images/finance/bitcoin.png";
import masterpass from "../../../assets/images/finance/masterpass.png";
import { useRef, useState } from "react";
import { Button } from "../../profile/profile";
import { act } from "react-dom/test-utils";

const payMethods = [
  { pay: "LiqPay", img: liqpay },
  { pay: "Bitcoin", img: bitcoin },
  { pay: "Masterpass", img: masterpass },
];

export const Deposit: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className={styles.deposit}>
      <div className={styles.deposit__wrapper + " wrapper"}>
        <ul className={styles.deposit__list}>
          {payMethods.map((data, index) => (
            <li
              key={data.pay}
              onClick={() => setActive(index)}
              className={
                styles.deposit__link +
                ` ${active === index ? styles.deposit__link_active : ""}`
              }
            >
              <img
                data-index={index}
                width={66}
                height={66}
                src={data.img}
                alt={data.pay}
                className={styles.deposit__image}
              />
              <span className={styles.deposit__text}>{data.pay}</span>
            </li>
          ))}
        </ul>
        <CustomInput />
        <Button
          w={17}
          h={18}
          icon="add"
          text="Пополнить"
          dopClass={styles.deposit__button}
        />
      </div>
    </div>
  );
};

const tabs = [100, 200, 500, 1000];

interface CustomInputProps {
  isWithdraw?: boolean;
  isDeals?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  isWithdraw,
  isDeals,
}) => {
  const [value, setValue] = useState<string | number>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  function handleChange() {
    if (inputRef.current) {
      setValue(inputRef.current.value.replace(/[^0-9,]/g, ""));
    }
  }

  return (
    <>
      <p className={styles.input__info}>
        Укажите сумму {isWithdraw ? "вывода" : isDeals ? "" : "пополнения"}
      </p>
      <div className={styles.input__container}>
        <input
          ref={inputRef}
          className={styles.input__edit}
          placeholder="000, 00"
          value={value}
          type="text"
          inputMode="numeric"
          onChange={handleChange}
          onFocus={() =>
            lineRef.current?.classList.add(styles.input__line_active)
          }
          onBlur={() =>
            lineRef.current?.classList.remove(styles.input__line_active)
          }
        />
        <span ref={lineRef} className={styles.input__line}></span>
        <CustomSelect />
      </div>
      <ul className={styles.input__tabs}>
        {isDeals
          ? null
          : tabs.map((data) => (
              <li
                key={data}
                onClick={() => setValue(data)}
                className={styles.input__tab}
              >
                {data}₴
              </li>
            ))}
      </ul>
    </>
  );
};

interface InputParams {
  isActive: boolean;
  index: number;
  wallet: string;
}

const wallet = [
  { icon: "₴", text: "Гривна" },
  { icon: "$", text: "Доллар" },
  { icon: "€", text: "Евро" },
];

const CustomSelect: React.FC = () => {
  const [select, setSelect] = useState<InputParams>({
    isActive: false,
    index: 0,
    wallet: "₴",
  });

  const [active, setActive] = useState({
    index: 0,
    wallet: "₴",
  });

  function handleAdd() {
    setActive({ index: select.index, wallet: select.wallet });
    setSelect((prev) => ({ ...prev, isActive: !prev.isActive }));
  }

  return (
    <ul className={styles.select__list}>
      <li
        onClick={() =>
          setSelect((prev) => ({ ...prev, isActive: !prev.isActive }))
        }
        className={styles.select__link + ` ${styles.select__link_active}`}
      >
        <span className={styles.select__wallet}>{active.wallet}</span>
      </li>
      <li
        className={
          styles.select__modal +
          ` ${select.isActive ? styles.select__modal_active : ""}`
        }
      >
        <ul className={styles.select__modal_list}>
          {wallet.map((data, index) => (
            <li
              key={data.text}
              className={
                styles.select__modal_link +
                ` ${
                  select.index === index ? styles.select__modal_link_active : ""
                }`
              }
              onClick={() =>
                setSelect((prev) => ({
                  ...prev,
                  index: index,
                  wallet: data.icon,
                }))
              }
            >
              <div className={styles.select__modal_circle}>
                <span className={styles.select__modal_wallet}>{data.icon}</span>
              </div>
              <span className={styles.select__modal_text}>{data.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.select__modal_buttons}>
          <div className={styles.select__modal_left}>
            <span
              onClick={() =>
                setSelect((prev) => ({
                  index: active.index,
                  wallet: active.wallet,
                  isActive: !prev.isActive,
                }))
              }
              className={styles.select__modal_close}
            >
              Отмена
            </span>
          </div>
          <button onClick={handleAdd} className={styles.select__modal_choose}>
            Выбрать
          </button>
        </div>
      </li>
    </ul>
  );
};
