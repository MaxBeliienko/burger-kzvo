import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  startWindowText,
  mainWindowText,
  paymentWindowText,
  paymentModalText,
  paymentResultText,
  productsText,
  shoppingCartText,
  ingredientsModalText,
} from "./localization";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "ukr",
    resources: {
      ukr: {
        translation: {
          description: {
            startWindow: startWindowText.ukr,
            mainWindow: mainWindowText.ukr,
            paymentWindow: paymentWindowText.ukr,
            paymentModal: paymentModalText.ukr,
            paymentResult: paymentResultText.ukr,
            products: productsText.ukr,
            shoppingCart: shoppingCartText.ukr,
            ingredientsModal: ingredientsModalText.ukr,
          },
        },
      },
    },
  });

export default i18n;
