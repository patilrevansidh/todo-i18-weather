import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Hindi from "./lang/hindi.json";
import English from "./lang/en.json";

const langKey = {
  en: English,
  hn: Hindi,
};

export const Context = React.createContext();

let local = navigator.language;
local = ["en-GB", "en-US", "en"].includes(local) ? 'en' : local;
const getLanguageJSON = (selected) => {
  if (["en-GB", "en-US", "en"].includes(selected)) {
    return langKey.en;
  } else {
    return langKey.hn;
  }
};

let lang = getLanguageJSON(local);

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);

  const [messages, setMessages] = useState(lang);

  function selectLanguage(e) {
    const newLocale = e?.target?.value || e;
    setLocale(newLocale);
    const lang = getLanguageJSON(newLocale);
    if (newLocale === "en") {
      setMessages(lang);
    } else {
      if (newLocale === "hn") {
        setMessages(lang);
      } else {
        setMessages(lang);
      }
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
