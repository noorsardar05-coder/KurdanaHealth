import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getAppEntryRoute } from "../../utils/storage";
import KHIntroShell from "./components/KHIntroShell.jsx";
import BrandMark from "./components/BrandMark.jsx";
import {
  CinematicScene,
  CinematicEyebrow,
  CinematicText,
  PulseLine,
} from "./components/CinematicText.jsx";
import "./onboarding.css";

const SLOGAN = "کوردانە بژی و کوردانە هێلس بەکاربهێنە";
const SCENE_MS = 2200;

function SceneSlogan() {
  return (
    <CinematicScene>
      <div className="kh-intro__content">
        <CinematicEyebrow>From Kurdistan to a healthier future</CinematicEyebrow>
        <CinematicText className="kh-cine-slogan" delay={0.2} glowPulse>
          <p dir="rtl" lang="ku">
            {SLOGAN}
          </p>
        </CinematicText>
      </div>
    </CinematicScene>
  );
}

function SceneBrand() {
  return (
    <CinematicScene>
      <div className="kh-intro__content">
        <BrandMark large />
        <CinematicText delay={0.25}>
          <h1 className="kh-cine-wordmark kh-cine-wordmark--tight">KurdanaHealth</h1>
        </CinematicText>
        <PulseLine delay={0.55} />
        <motion.p
          className="kh-cine-credit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Created by Noor Sardar
        </motion.p>
      </div>
    </CinematicScene>
  );
}

export default function OnboardingExperience() {
  const navigate = useNavigate();
  const [scene, setScene] = useState(1);
  const doneRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let t2;

    const t1 = setTimeout(() => {
      if (cancelled) return;
      setScene(2);

      t2 = setTimeout(() => {
        if (cancelled || doneRef.current) return;
        doneRef.current = true;
        // Language is chosen on the login Step 0 screen — do not auto-persist here.
        navigate(getAppEntryRoute(), { replace: true });
      }, SCENE_MS);
    }, SCENE_MS);

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate]);

  return (
    <KHIntroShell showOrbit={scene === 1}>
      <AnimatePresence mode="wait">
        {scene === 1 && <SceneBrand key="brand" />}
        {scene === 2 && <SceneSlogan key="slogan" />}
      </AnimatePresence>
    </KHIntroShell>
  );
}
