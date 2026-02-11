import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    welcome: "Welcome to AuraLink",
                    description: "One-Touch Epilepsy Safety",
                    emergencyNumber: "911",
                    callAction: "Call 911",
                    smsAction: "SMS Family"
                }
            },
            fr: {
                translation: {
                    welcome: "Bienvenue sur AuraLink",
                    description: "Sécurité Épilepsie en un clic",
                    emergencyNumber: "190",
                    callAction: "Appeler 190",
                    smsAction: "SMS Famille"
                }
            },
            ar: {
                translation: {
                    welcome: "مرحبًا بكم في AuraLink",
                    description: "سلامة الصرع بلمسة واحدة",
                    emergencyNumber: "190",
                    callAction: "اتصل بـ 190",
                    smsAction: "رسالة للعائلة"
                }
            }
        },
        detection: {
            // Custom detection logic can go here if needed, but browser detection is usually best.
            // For 'TN' specific, we'd rely on 'fr-TN' or 'ar-TN' from the browser.
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage', 'cookie']
        }
    });

export default i18n;
