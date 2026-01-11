import React from 'react';
import { useProducts } from '../hooks/UseProducts';
import LoadingSpiner from '../components/LoadingSpiner';
import { PackageIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpiner />;

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page!</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-br from-base-300 via-base-200 to-base-100 rounded-box overflow-hidden p-10">
        <div className="hero-content flex-col lg:flex-row gap-10">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Share Your Products
            </h1>
            <p className="py-4 text-base-content/60">
              Upload, discover, and connect with creators
            </p>
            <Link to="/create" className="btn btn-primary gap-2">
              <Sparkles className="size-4" />
              Start Selling
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <img
              src="https://raw.githubusercontent.com/burakorkmez/productify/master/frontend/public/image.png"
              alt="Creator"
              className="relative h-64 lg:h-72 rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <PackageIcon className="size-5 text-primary" />
          All Products
        </h2>

        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/50" />
              <h3 className="card-title text-base-content/50">
                No Products Available
              </h3>
              <p className="text-base-content/40 text-sm">
                Be the first to share something
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
