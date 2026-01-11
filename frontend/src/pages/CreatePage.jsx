import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateProducts } from '../hooks/UseProducts';
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SparkleIcon,
  TypeIcon,
} from 'lucide-react';

const CreatePage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createProduct, isLoading } = useCreateProducts();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image); // Important for file upload

    try {
      await createProduct(formData); // call mutation
      navigate('/'); // go back to homepage
    } catch (error) {
      console.error('Product creation failed:', error);
      alert('Failed to create product');
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            {/* Image Upload */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="grow"
                onChange={handleImageChange}
                required
              />
            </label>

            {/* Image Preview */}
            {preview && (
              <div className="rounded-box overflow-hidden border">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover"
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
  );
};

export default CreatePage;
