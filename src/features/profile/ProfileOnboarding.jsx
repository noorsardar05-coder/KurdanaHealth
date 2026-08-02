import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Venus,
  Mars,
  CircleDot,
  Activity,
  Heart,
  Dumbbell,
  Apple,
  Brain,
  Scale,
  Sparkles,
  Languages,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { setUser } from "../../utils/storage";
import ProfileShell from "./components/ProfileShell.jsx";
import ProfileIllustration from "./components/ProfileIllustration.jsx";
import {
  PROFILE_I18N,
  PROFILE_STEPS,
  ACTIVITY_OPTIONS,
  GOAL_OPTIONS,
  MICRO_KEYS,
} from "./i18n/profileStrings.js";
import "./profile.css";

const EASE = [0.22, 1, 0.36, 1];

const stepMotion = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.35, ease: EASE } },
};

const GENDER_OPTIONS = [
  { id: "female", labelKey: "female", Icon: Venus },
  { id: "male", labelKey: "male", Icon: Mars },
  { id: "unspecified", labelKey: "preferNot", Icon: CircleDot },
];

const GOAL_ICONS = {
  wellness: Heart,
  fitness: Dumbbell,
  nutrition: Apple,
  mental: Brain,
  weight: Scale,
  skin: Sparkles,
};

function ChoiceButton({ selected, onClick, Icon, title, desc, radio = true }) {
  return (
    <motion.button
      type="button"
      className={`kh-profile__choice ${selected ? "selected" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
    >
      <span className="kh-profile__choice-icon">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <span className="kh-profile__choice-text">
        <span className="kh-profile__choice-title">{title}</span>
        {desc && <span className="kh-profile__choice-desc">{desc}</span>}
      </span>
      {radio && <span className="kh-profile__choice-radio" aria-hidden="true" />}
    </motion.button>
  );
}

function SliderField({ label, value, min, max, step, unit, onChange }) {
  return (
    <div className="kh-profile__slider-wrap">
      <div className="kh-profile__slider-label">
        <span>{label}</span>
        <span className="kh-profile__slider-val">
          {value}
          <span className="text-sm font-normal text-[#6b6560] ms-1">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        className="kh-profile__slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function LanguageOption({ primary, secondary, selected, onClick, featured, dir, langAttr }) {
  return (
    <motion.button
      type="button"
      className={`kh-profile__lang-option ${featured ? "kh-profile__lang-option--featured" : ""} ${selected ? "selected" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      aria-pressed={selected}
    >
      <span className="kh-profile__lang-option-text" dir={dir} lang={langAttr}>
        <span className="kh-profile__lang-option-primary">{primary}</span>
        {secondary && (
          <span className="kh-profile__lang-option-secondary">{secondary}</span>
        )}
      </span>
      <span className="kh-profile__choice-radio" aria-hidden="true" />
    </motion.button>
  );
}

export default function ProfileOnboarding() {
  const navigate = useNavigate();
  const { language: ctxLang, setLanguage: setCtxLang } = useLanguage();
  const lang = ctxLang === "ku" ? "ku" : "en";

  // Always show language Step 0 when starting onboarding (this route has no user yet).
  // Logged-in returning users change language in Settings instead.
  const [phase, setPhase] = useState("language");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(62);
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");

  const tr = useCallback(
    (key) => PROFILE_I18N[lang]?.[key] ?? PROFILE_I18N.en[key] ?? key,
    [lang]
  );

  const isLanguagePhase = phase === "language";
  const micro = tr(MICRO_KEYS[step % MICRO_KEYS.length]);
  const progress = ((step + 1) / PROFILE_STEPS) * 100;
  const isLast = step === PROFILE_STEPS - 1;

  const canContinue = useMemo(() => {
    if (isLanguagePhase) return false;
    switch (step) {
      case 0:
        return name.trim().length >= 2;
      case 1:
        return Boolean(gender);
      case 2:
        return age >= 13 && age <= 100;
      case 3:
        return height >= 120 && weight >= 30;
      case 4:
        return Boolean(activity);
      case 5:
        return Boolean(goal);
      default:
        return false;
    }
  }, [isLanguagePhase, step, name, gender, age, height, weight, activity, goal]);

  const selectLanguage = useCallback(
    (next) => {
      const chosen = next === "ku" ? "ku" : "en";
      setCtxLang(chosen);
      setPhase("profile");
      setStep(0);
    },
    [setCtxLang]
  );

  const advance = useCallback(() => {
    if (!canContinue) return;
    if (isLast) {
      const profile = {
        name: name.trim(),
        gender,
        language: lang,
        age,
        height,
        weight,
        activity,
        goal,
      };
      setCtxLang(lang);
      setUser(profile);
      navigate("/dashboard", { replace: true });
      return;
    }
    setStep((s) => s + 1);
  }, [canContinue, isLast, name, gender, lang, age, height, weight, activity, goal, setCtxLang, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canContinue) advance();
  };

  return (
    <main
      className={`kh-profile ${lang === "ku" && !isLanguagePhase ? "lang-ku" : ""}`}
      dir={lang === "ku" && !isLanguagePhase ? "rtl" : "ltr"}
      lang={lang === "ku" && !isLanguagePhase ? "ku" : "en"}
    >
      <ProfileShell />

      <div className="kh-profile__inner">
        {!isLanguagePhase && (
          <div className="kh-profile__progress">
            <p className="kh-profile__step-label">
              {tr("stepOf")} {step + 1} {tr("of")} {PROFILE_STEPS}
            </p>
            <div className="kh-profile__progress-track">
              <motion.div
                className="kh-profile__progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </div>
          </div>
        )}

        <header className="kh-profile__header">
          {isLanguagePhase ? (
            <>
              <p className="kh-profile__lang-eyebrow">
                <Languages size={14} strokeWidth={1.75} />
                KurdanaHealth
              </p>
              <h1 className="kh-profile__title">{PROFILE_I18N.en.chooseLanguage}</h1>
              <p className="kh-profile__subtitle kh-profile__subtitle--ku" dir="rtl" lang="ku">
                {PROFILE_I18N.en.chooseLanguageKu}
              </p>
            </>
          ) : (
            <>
              <h1 className="kh-profile__title">{tr("welcomeTitle")}</h1>
              <p className="kh-profile__subtitle">{tr("welcomeSub")}</p>
            </>
          )}
        </header>

        {!isLanguagePhase && (
          <div className="kh-profile__illus">
            <ProfileIllustration />
          </div>
        )}

        <div className="kh-profile__card">
          <AnimatePresence mode="wait">
            {isLanguagePhase ? (
              <motion.div key="language" {...stepMotion}>
                <div className="kh-profile__lang-options">
                  <LanguageOption
                    featured
                    primary={PROFILE_I18N.en.langKurdishPrimary}
                    secondary={`— ${PROFILE_I18N.en.langKurdishSecondary}`}
                    selected={false}
                    onClick={() => selectLanguage("ku")}
                    dir="rtl"
                    langAttr="ku"
                  />
                  <LanguageOption
                    primary={PROFILE_I18N.en.langEnglish}
                    selected={false}
                    onClick={() => selectLanguage("en")}
                    dir="ltr"
                    langAttr="en"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key={step} {...stepMotion}>
                {step === 0 && (
                  <>
                    <h2 className="kh-profile__question">{tr("qName")}</h2>
                    <p className="kh-profile__hint">{tr("qNameHint")}</p>
                    <input
                      type="text"
                      className="kh-profile__input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={tr("namePlaceholder")}
                      autoFocus
                      autoComplete="name"
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 className="kh-profile__question">{tr("qGender")}</h2>
                    <div className="kh-profile__choices">
                      {GENDER_OPTIONS.map(({ id, labelKey, Icon }) => (
                        <ChoiceButton
                          key={id}
                          selected={gender === id}
                          onClick={() => setGender(id)}
                          Icon={Icon}
                          title={tr(labelKey)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="kh-profile__question">{tr("qAge")}</h2>
                    <SliderField
                      label={tr("qAge")}
                      value={age}
                      min={13}
                      max={90}
                      step={1}
                      unit={tr("years")}
                      onChange={setAge}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="kh-profile__question">{tr("qBody")}</h2>
                    <p className="kh-profile__hint">{tr("qBodyHint")}</p>
                    <SliderField
                      label={tr("height")}
                      value={height}
                      min={140}
                      max={210}
                      step={1}
                      unit={tr("cm")}
                      onChange={setHeight}
                    />
                    <SliderField
                      label={tr("weight")}
                      value={weight}
                      min={40}
                      max={150}
                      step={1}
                      unit={tr("kg")}
                      onChange={setWeight}
                    />
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="kh-profile__question">{tr("qActivity")}</h2>
                    <div className="kh-profile__choices">
                      {ACTIVITY_OPTIONS.map(({ id, titleKey, descKey }) => (
                        <ChoiceButton
                          key={id}
                          selected={activity === id}
                          onClick={() => setActivity(id)}
                          Icon={Activity}
                          title={tr(titleKey)}
                          desc={tr(descKey)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    <h2 className="kh-profile__question">{tr("qGoals")}</h2>
                    <div className="kh-profile__choices">
                      {GOAL_OPTIONS.map(({ id, key }) => (
                        <ChoiceButton
                          key={id}
                          selected={goal === id}
                          onClick={() => setGoal(id)}
                          Icon={GOAL_ICONS[id] || Heart}
                          title={tr(key)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!isLanguagePhase && (
            <>
              <p className="kh-profile__micro">{micro}</p>

              <div className="kh-profile__privacy">
                <Lock size={14} strokeWidth={1.5} />
                <span>{tr("privacy")}</span>
              </div>
            </>
          )}
        </div>

        {!isLanguagePhase && (
          <div className="kh-profile__actions">
            <motion.button
              type="button"
              className="kh-profile__continue"
              disabled={!canContinue}
              onClick={advance}
              whileHover={canContinue ? { scale: 1.01 } : {}}
              whileTap={canContinue ? { scale: 0.985 } : {}}
            >
              {isLast ? tr("finish") : tr("continue")}
              <motion.span
                animate={canContinue ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ArrowRight size={18} strokeWidth={2} className="rtl:rotate-180" />
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>
    </main>
  );
}
