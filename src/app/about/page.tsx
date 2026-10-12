import { useTranslations } from "next-intl"

export default function About() {
  const t = useTranslations('HomePage')
  return (
    <>
      <body>
        <h1>{t('title')}</h1>
        <p>{t('text')}</p>
      </body>
    </>
  )
}
