import { motion } from "framer-motion";
import { RefreshCw, TrendingDown, TrendingUp, Moon } from "lucide-react";

const ACTIONS = [
  { key: "regenerate", icon: RefreshCw, labelKey: "regeneratePlan", mode: "normal" },
  { key: "easier", icon: TrendingDown, labelKey: "makeEasier", mode: "easier" },
  { key: "harder", icon: TrendingUp, labelKey: "makeHarder", mode: "harder" },
  { key: "tired", icon: Moon, labelKey: "feelTired", mode: "tired" },
];

export default function QuickActions({ t, onAction }) {
  return (
    <section className="ft-quick-actions" aria-label={t("quickActionsTitle")}>
      <h2 className="ft-section-label">{t("quickActionsTitle")}</h2>
      <div className="ft-quick-actions__grid">
        {ACTIONS.map(({ key, icon: Icon, labelKey, mode }, i) => (
          <motion.button
            key={key}
            type="button"
            className="ft-quick-action glass"
            onClick={() => onAction(mode)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(28,28,26,0.08)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="ft-quick-action__icon">
              <Icon size={20} strokeWidth={1.75} />
            </span>
            <span className="ft-quick-action__label">{t(labelKey)}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
