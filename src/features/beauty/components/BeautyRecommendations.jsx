import BeautyProductCard from "./BeautyProductCard.jsx";

export default function BeautyRecommendations({ t, title, products, onProductClick }) {
  if (!products?.length) return null;
  return (
    <div className="bt-card glass">
      <p className="bt-section-label">{title}</p>
      <div className="bt-product-scroll">
        {products.map((p) => (
          <BeautyProductCard key={p.id} product={p} t={t} onClick={() => onProductClick(p)} compact />
        ))}
      </div>
    </div>
  );
}
