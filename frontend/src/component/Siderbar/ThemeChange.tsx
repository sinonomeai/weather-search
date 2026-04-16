import { useTranslation } from "react-i18next";
export const ThemeChange = () => {
    const { t } = useTranslation();
    return (
        <div className='h-15 text-center pt-5'>
            <h1>{t("themeChange")}</h1>
        </div>
    )
}
