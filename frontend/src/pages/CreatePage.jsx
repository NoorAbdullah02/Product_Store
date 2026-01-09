import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCreateProducts } from '../hooks/UseProducts'
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparkleIcon,
  TypeIcon,
} from 'lucide-react'

const CreatePage = () => {
  const navigate = useNavigate()
  const { mutateAsync: createProduct, isLoading } = useCreateProducts()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createProduct(formData)
      navigate('/')
    } catch (error) {
      console.error('Product creation failed:', error)
      alert('Failed to create product')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" />
        Back
      </Link>

      <div className="card bg-base-300 shadow-lg">
        <div className="card-body">
          <h1 className="card-title">
            <SparkleIcon className="size-5 text-primary" />
            New Product
          </h1>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            {/* Title */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Product Title"
                className="grow"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </label>

            {/* Image URL */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Image URL"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </label>

            {/* Image Preview */}
            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden border">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}

            {/* Description */}
            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  className="textarea textarea-ghost w-full"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
