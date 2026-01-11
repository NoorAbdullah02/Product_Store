import { Link } from "react-router";
import { MessageCircleIcon, Heart, Star, TrendingUp } from "lucide-react";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group h-full"
    >
      <div className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-base-200/50 hover:border-primary/50 overflow-hidden hover:-translate-y-1">

        <figure className="px-0 pt-0 relative overflow-hidden bg-base-200 h-48 w-full">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* NEW Badge */}
          {isNew && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-primary to-secondary text-primary-content px-3 py-1.5 rounded-full font-bold text-xs shadow-lg animate-pulse">
              <Star className="size-3 fill-current" />
              NEW
            </div>
          )}


          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2.5 bg-base-100/95 hover:bg-base-100 rounded-full shadow-lg hover:scale-125 active:scale-95"
          >
            <Heart className="size-5 text-error stroke-2" />
          </button>
        </figure>


        <div className="card-body p-4 flex flex-col justify-between flex-1 gap-3">

          <div>
            <h2 className="card-title text-base font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
              {product.title}
            </h2>

            <p className="text-xs text-base-content/60 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>


          <div className="divider my-1"></div>


          <div className="flex items-center justify-between gap-2">

            {product.user && (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="avatar">
                  <div className="w-7 h-7 rounded-full ring-2 ring-primary/40 hover:ring-primary transition-all">
                    <img
                      src={product.user.imageUrl}
                      alt={product.user.name}
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-base-content/60 truncate hover:text-base-content transition-colors">
                  {product.user.name}
                </span>
              </div>
            )}


            {product.comments && (
              <div className="flex items-center gap-1 text-base-content/60 bg-base-200/60 hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-full transition-all duration-300">
                <MessageCircleIcon className="size-3.5" />
                <span className="text-xs font-bold">{product.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;