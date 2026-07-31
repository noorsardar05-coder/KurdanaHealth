import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function AssistantPrompt({ title, description, disclaimer, cta }) {
  return (
    <motion.div
      className="kh-assistant"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="kh-assistant__icon" aria-hidden="true">
        <MessageCircle size={20} strokeWidth={1.75} />
      </div>
      <div className="kh-assistant__body">
        <h2 className="kh-assistant__title">{title}</h2>
        <p className="kh-assistant__desc">{description}</p>
        <p className="kh-assistant__disclaimer">{disclaimer}</p>
        <Link to="/category/antibiotics-flu#symptom" className="kh-assistant__cta">
          {cta}
          <ArrowRight size={15} strokeWidth={2} className="rtl:rotate-180" />
        </Link>
      </div>
    </motion.div>
  );
}
