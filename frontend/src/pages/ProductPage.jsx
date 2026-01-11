import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useDeleteProduct, useProduct } from '../hooks/UseProducts'
import LoadingSpinner from '../components/LoadingSpiner'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, isLoading, error } = useProduct(id)
  const deleteProduct = useDeleteProduct()

  const handleDelete = () => {
    if (window.confirm('Delete permanently?')) {
      deleteProduct.mutate(id, {
        onSuccess: () => navigate('/')
      })
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!product || error) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product Not Found</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = true // replace with auth logic later

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="btn btn-ghost btn-sm gap-1">
          <ArrowLeft className="size-4" />
          Back
        </Link>

        {isOwner && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${product.id}`}
              className="btn btn-ghost btn-sm gap-1"
            >
              <Pencil className="size-4" />
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm gap-1"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title text-2xl">{product.name}</h1>
          <p className="text-lg font-semibold">৳ {product.price}</p>
          <p className="opacity-80">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
