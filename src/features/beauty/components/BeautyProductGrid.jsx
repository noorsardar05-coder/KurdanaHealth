import BeautyProductCard from "./BeautyProductCard.jsx";

export default function BeautyProductGrid({
  products,
  t,
  onProductClick,
  favorites = [],
  onToggleFavorite,
  emptyMessage,
}) {
  if (!products.length) {
    return <p className="bt-empty">{emptyMessage}</p>;
  }
  return (
    <div className="bt-product-grid">
      {products.map((p) => (
        <BeautyProductCard
          key={p.id}
          product={p}
          t={t}
          onClick={() => onProductClick(p)}
          isFavorite={favorites.includes(p.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
