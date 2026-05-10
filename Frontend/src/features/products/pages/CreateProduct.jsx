
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

const CreateProduct = () => {
  const navigate = useNavigate();

  const { handleCreateProduct } = useProduct();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    amountCurrency: "INR",
    images: [],
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? Array.from(files) : value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!formData.title.trim()) {
      return alert("Product title is required");
    }

    if (!formData.description.trim()) {
      return alert("Description is required");
    }

    if (!formData.priceAmount) {
      return alert("Price is required");
    }

    if (formData.images.length === 0) {
      return alert("Please upload at least one image");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("amountCurrency", formData.amountCurrency);

      // APPEND MULTIPLE IMAGES
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      await handleCreateProduct(data);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4 py-4 overflow-hidden">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl min-h-screen bg-[#151821] rounded-2xl border border-gray-800 shadow-2xl flex overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 lg:w-[55%] relative">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
            alt="Fashion"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-10 text-white z-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              Create New Listing
            </h1>

            <p className="text-gray-300 text-sm lg:text-base max-w-md">
              Publish your product with a modern responsive dashboard UI.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-md">

            {/* HEADING */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white">
                New Listing
              </h2>

              <div className="w-16 h-1 bg-yellow-400 rounded-full mt-2"></div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* TITLE */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-yellow-400 uppercase mb-2">
                  Product Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Oversized Linen Shirt"
                  className="w-full bg-[#1c1f2b] border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-yellow-400 uppercase mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the product..."
                  className="w-full bg-[#1c1f2b] border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* PRICE + CURRENCY */}
              <div className="grid grid-cols-2 gap-4 ">

                {/* PRICE */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-yellow-400 uppercase mb-2">
                    Price
                  </label>

                  <input
                    name="priceAmount"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-[#1c1f2b] border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* CURRENCY */}
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-yellow-400 uppercase mb-2">
                    Currency
                  </label>

                  <select
                    name="amountCurrency"
                    value={formData.amountCurrency}
                    onChange={handleChange}
                    className="w-full bg-[#1c1f2b] border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block  text-xs font-semibold tracking-wider text-yellow-400 uppercase mb-2">
                  Images
                </label>

                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-[#1c1f2b] hover:border-yellow-400 transition ">

                  <div className="flex flex-col items-center justify-center text-center px-4 ">

                    <svg
                      className="w-10 h-10 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16V4m0 0l-4 4m4-4l4 4m5 8v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1"
                      />
                    </svg>

                    <p className="text-sm text-gray-300">
                      Drop images here or{" "}
                      <span className="text-yellow-400 font-semibold">
                        tap to upload
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      UP TO 10 IMAGES
                    </p>
                  </div>

                  <input
                    onChange={handleChange}
                    type="file"
                    name="images"
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                </label>

                {/* IMAGE PREVIEW */}
                <div className="flex flex-wrap gap-3 mt-4 bg-amber-300">

                  {formData.images.map((image, idx) => (
                    <div key={idx} className="relative">

                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                      />

                    </div>
                  ))}

                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition duration-300 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Listing"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
