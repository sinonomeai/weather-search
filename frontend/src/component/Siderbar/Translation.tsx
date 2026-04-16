import { useTranslation } from "react-i18next";
export const Translation = () => {
    const { t, i18n } = useTranslation();
    const isChinese = i18n.language === "zh"
    const toggleLanguage = () => {
        const newLanguage = isChinese ? "en" : "zh"
        i18n.changeLanguage(newLanguage)
    }
    return (
        <div className='h-15 text-center pb-5'>
            <button className='lang-toggle ' onClick={toggleLanguage}>
                {t("translation")}
            </button>
        </div>
    )
}
