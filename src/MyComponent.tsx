import { useTranslation } from "react-i18next";

const translateDate = (date: Date) => new Intl.DateTimeFormat(
  navigator.language
).format(date);

const translateCurrency = (amount: number) => new Intl.NumberFormat(
  navigator.language, 
  { style: 'currency', currency: 'CLP' }
).format(amount);



const MyComponent = () => {
  const { t } = useTranslation();
  const date = new Date();
  return (
    <>
      <h1>{t("WELLCOME_USER")}</h1>
      <span>{t("TODAY")} : {translateDate(date)}</span>
      <br/>
      <span>{t("DOLLAR_PRICE")} : {translateCurrency(850)}</span>
    </>
  )
}

export default MyComponent