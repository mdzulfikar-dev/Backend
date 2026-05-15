import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hook/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();

  const { handleGetProductById } = useProduct();

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [selectedVariant, setSelectedVariant] =
    useState(null);

  // FETCH PRODUCT

  async function fetchProductDetails() {
    try {
      const data =
        await handleGetProductById(productId);

      setProduct(data);

      /* FIRST VARIANT */

      const firstVariant =
        data?.variants?.[0];

      setSelectedVariant(firstVariant);

      setSelectedImage(
        firstVariant?.images?.[0]?.url
      );

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  console.log(product);

  // LOADING STATE

  if (!product) {
    return (
      <div className="h-screen bg-gray-950 text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-5">

      {/* MAIN CONTAINER */}

      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT SIDE */}

        <div className="w-full lg:w-[30%]">

          {/* MAIN IMAGE */}

          <div className="w-full h-[500px] bg-gray-900 rounded-2xl overflow-hidden shadow-lg">

            <img
              className="w-full h-full object-cover"
              src={selectedImage}
              alt=""
            />

          </div>

          {/* IMAGE VARIANTS */}

          <div className="w-full mt-5 flex gap-3 overflow-x-auto p-2 bg-gray-900 rounded-xl">

            {selectedVariant?.images?.map(
              (img, idx) => (

                <div
                  key={idx}

                  onMouseEnter={() =>
                    setSelectedImage(img.url)
                  }

                  className={`w-24 h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer border-2 transition

                  ${
                    selectedImage === img.url
                      ? "border-yellow-400"
                      : "border-transparent"
                  }
                `}
                >

                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                </div>

              )
            )}

          </div>

        </div>

        {/* CENTER SECTION */}

        <div className="w-full lg:w-[45%] bg-gray-900 rounded-2xl p-6 shadow-lg">

          {/* PRODUCT TITLE */}

          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          {/* DIVIDER */}

          <div className="w-full h-[1px] bg-gray-700 mt-5"></div>

          {/* DEAL BUTTON */}

          <button className="text-sm bg-red-700 px-4 py-2 rounded-md mt-5 font-semibold">

            Great Summer Deal

          </button>

          {/* DESCRIPTION */}

          <p className="text-gray-300 text-lg leading-relaxed mt-6">

            {product.description}

          </p>

          {/* PRICE */}

          <div className="flex items-center gap-3 mt-8">

            <span className="text-yellow-400 text-2xl font-semibold">

              {product.price.currency}

            </span>

            <span className="text-5xl font-bold">

              {product.price.amount}

            </span>

          </div>

          {/* EXTRA DETAILS */}

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">

              <span className="text-gray-400">

                Seller:

              </span>

              <span className="font-semibold">

                {product.seller}

              </span>

            </div>

            <div className="flex items-center gap-3">

              <span className="text-gray-400">

                Product ID:

              </span>

              <span className="text-sm text-gray-300">

                {product._id}

              </span>

            </div>

          </div>

          {/* DIVIDER */}

          <div className="w-full h-[1px] bg-gray-700 mt-10"></div>

          {/* FEATURES */}

          <div className="mt-10">

            {/* ATTRIBUTE SECTION */}

            <div className="flex items-center justify-between mb-6">

              <div className="flex gap-3 flex-wrap">

                {selectedVariant &&

                  Object.entries(
                    selectedVariant.attributes
                  ).map(([key, value]) => (

                    <div
                      key={key}
                      className="
                      bg-gray-800
                      border
                      border-gray-700
                      px-4
                      py-2
                      rounded-xl
                      min-w-[100px]
                    "
                    >

                      <p className="text-xs text-gray-400">

                        {key}

                      </p>

                      <h2 className="text-lg font-bold text-yellow-400">

                        {value}

                      </h2>

                    </div>

                  ))}

              </div>

            </div>

            {/* VARIANT IMAGES */}

            <div className="flex gap-4 overflow-x-auto">

              {product?.variants?.map(
                (variant) => (

                  <div
                    key={variant._id}

                    onMouseEnter={() => {

                      setSelectedVariant(
                        variant
                      );

                      setSelectedImage(
                        variant.images?.[0]?.url
                      );

                    }}

                    className={`min-w-[120px]
                    h-[150px]
                    rounded-2xl
                    overflow-hidden
                    cursor-pointer
                    border-2
                    transition

                    ${
                      selectedVariant?._id ===
                      variant._id
                        ? "border-yellow-400"
                        : "border-transparent"
                    }
                  `}
                  >

                    <img
                      src={
                        variant.images?.[0]?.url
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="w-full lg:w-[25%] bg-gray-900 rounded-2xl p-5 shadow-lg flex flex-col gap-5 h-fit">

          {/* PRIME SECTION */}

          <div className="w-full bg-gray-800 rounded-xl p-4">

            <img
              className="w-[90px] h-[60px] object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Amazon_Prime_logo_%282022%29.svg/1280px-Amazon_Prime_logo_%282022%29.svg.png"
              alt=""
            />

            <h1 className="text-sm text-gray-300 mt-3 leading-relaxed">

              Enjoy{" "}

              <span className="font-semibold text-white">

                Unlimited FREE Same day/1-day delivery

              </span>

              , Prime offers everyday and more.

            </h1>

            <a
              href="#"
              className="text-blue-400 font-semibold text-sm mt-3 inline-block"
            >

              Join Prime &gt;&gt;

            </a>

          </div>

          {/* PRICE CARD */}

          <div className="w-full bg-gray-800 rounded-xl p-5 flex flex-col gap-4">

            <h1 className="text-3xl font-bold text-yellow-400">

              {product.price.currency}{" "}

              {product.price.amount}

            </h1>

            <p className="text-green-400 font-semibold">

              In Stock

            </p>

            <p className="text-gray-400 text-sm">

              FREE delivery available on eligible orders.

            </p>

            {/* BUTTONS */}

            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-2xl transition">

              Add to Cart

            </button>

            <button className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 rounded-2xl transition">

              Buy Now

            </button>

            {/* DELIVERY */}

            <div className="mt-3 text-sm text-gray-300 space-y-2">

              <p>
                🚚 Delivery within 2-3 business days
              </p>

              <p>
                🔒 Secure Transaction
              </p>

              <p>
                ↩ 7 Days Replacement
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;