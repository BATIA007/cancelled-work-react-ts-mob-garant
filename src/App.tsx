import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Messanger } from "./components/deals/Active/active";
import { Arbitration } from "./components/deals/Arbitration/arbitration";
import { DealsCreate } from "./components/deals/Create/create";
import { Deals } from "./components/deals/deals";
import { Otkat } from "./components/deals/Otkat/otkat";
import { DealsProfile } from "./components/deals/Profile/profile";
import { Deposit } from "./components/finance/Deposit/deposit";
import { Finance } from "./components/finance/finance";
import { FinanceHistory } from "./components/finance/History/history";
import { FinanceStats } from "./components/finance/Stats/stats";
import { Withdraw } from "./components/finance/Withdraw/withdraw";
import { InvestHistory } from "./components/invest/History/history";
import { Invest } from "./components/invest/invest";
import { Plans } from "./components/invest/Plans/plans";
import { InvestStats } from "./components/invest/Stats/stats";
import { InvestWithdraw } from "./components/invest/Withdraw/withdraw";
import { FooterNav } from "./components/NavBar";
import { About } from "./components/profile/About/about";
import { Profile } from "./components/profile/profile";
import {
  Register1,
  Register2,
  Register3,
} from "./components/register/register";

interface AppStateParams {
  location: number;
  mode: string;
  path: string;
  time: number;
}

function App() {
  const location = useLocation();

  const [left, setLeft] = useState<AppStateParams>({
    location: getPathDepth(location),
    mode: "left",
    path: location.pathname,
    time: 400,
  });
  const [isAnim, setAnim] = useState<boolean>(false);

  useEffect(() => {
    const num = getPathDepth(location);
    setLeft((prev) => getModeSlide(prev, num, location));
  }, [location]);

  const isFooter =
    !location.pathname.includes("/deals/messanger") &&
    (location.pathname.includes("/profile") ||
      location.pathname.includes("/finance") ||
      location.pathname.includes("/invest") ||
      location.pathname.includes("/deals"));

  const isFinance = location.pathname.includes("/finance");
  const isInvest = location.pathname.includes("/invest");

  return (
    <>
      {isFinance ? <Finance /> : null}
      {isInvest ? <Invest /> : null}
      <TransitionGroup
        component={"div"}
        className={left.mode + ` ${isAnim ? "anim" : ""}`}
      >
        <CSSTransition
          key={location.key}
          timeout={left.time}
          classNames={"slide"}
          unmountOnExit
          onExit={() => setAnim(true)}
          onExited={() => setAnim(false)}
        >
          <Routes location={location}>
            <Route path="/" element={<Register1 />} />
            <Route path="/register" element={<Register1 />} />
            <Route path="/register/phone" element={<Register2 />} />
            <Route path="/register/phone/code" element={<Register3 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/about" element={<About />} />
            <Route path="/finance/deposit" element={<Deposit />} />
            <Route path="/finance/withdraw" element={<Withdraw />} />
            <Route path="/finance/history" element={<FinanceHistory />} />
            <Route path="/finance/stats" element={<FinanceStats />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deals/create" element={<DealsCreate />} />
            <Route path="/deals/semen" element={<DealsProfile />} />
            <Route path="/deals/otkat" element={<Otkat />} />
            <Route path="/deals/arbitration" element={<Arbitration />} />
            <Route path="/deals/messanger" element={<Messanger />} />
            <Route path="/invest/plans" element={<Plans />} />
            <Route path="/invest/withdraw" element={<InvestWithdraw />} />
            <Route path="/invest/history" element={<InvestHistory />} />
            <Route path="/invest/stats" element={<InvestStats />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      {isFooter ? <FooterNav /> : null}
    </>
  );
}

function getModeSlide(prev: any, num: number, location: any) {
  let mode: string = "left";
  if (
    location.pathname.includes("/finance") ||
    location.pathname.includes("/invest")
  ) {
    return {
      location: num,
      mode: "fade",
      path: location.pathname,
      time: 0,
    };
  }

  if (num === 1) {
    mode = "back";
  }

  if (prev.location > num && prev.path.includes(location.pathname)) {
    mode = "right";
  }

  return { location: num, mode: mode, path: location.pathname, time: 300 };
}

function getPathDepth(location: any) {
  let pathArr = location.pathname.split("/");
  pathArr = pathArr.filter((n: any) => n !== "");
  return pathArr.length;
}

export default App;
