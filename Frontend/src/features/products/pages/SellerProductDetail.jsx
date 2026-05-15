
////////////////////import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  Plus,
  Trash2,
  UploadCloud,
  Package2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useProduct } from "../hook/useProduct";


/*
=========================================================
SELLER PRODUCT VARIANT PAGE
=========================================================

ROUTE:
 /seller/variant/:productId

=========================================================
*/

const SellerProductDetail = () => {

  const navigate = useNavigate();

  const { productId } = useParams();

  const {
    handleGetProductById,
    handleCreateVariant,
  } = useProduct();

  /*
  =========================================================
  PRODUCT
  =========================================================
  */

  const [product, setProduct] = useState(null);

  /*
  =========================================================
  ATTRIBUTES
  =========================================================
  */

  const [attributes, setAttributes] = useState([
    {
      id: Date.now(),
      name: "",
      values: [""],
    },
  ]);

  

  /*
  =========================================================
  GENERATED VARIANTS
  =========================================================
  */

  const [variants, setVariants] = useState([]);
  

  /*
  =========================================================
  FETCH PRODUCT
  =========================================================
  */

  async function fetchProductDetails() {

    try {

      const data =
        await handleGetProductById(
          productId
        );
       
      setProduct(data);
      

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    fetchProductDetails();

  }, [productId]);

  /*
  =========================================================
  ADD ATTRIBUTE
  =========================================================
  */

  const addAttribute = () => {

    setAttributes((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        values: [""],
      },
    ]);

  };

  

  /*
  =========================================================
  DELETE ATTRIBUTE
  =========================================================
  */

  const deleteAttribute = (id) => {

    setAttributes((prev) =>
      prev.filter(
        (attr) => attr.id !== id
      )
    );

  };

  /*
  =========================================================
  UPDATE ATTRIBUTE NAME
  =========================================================
  */

  const updateAttributeName = (
    id,
    value
  ) => {

    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              name: value,
            }
          : attr
      )
    );

  };

  /*
  =========================================================
  ADD VALUE
  =========================================================
  */

  const addValue = (id) => {

    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              values: [
                ...attr.values,
                "",
              ],
            }
          : attr
      )
    );

  };

  /*
  =========================================================
  UPDATE VALUE
  =========================================================
  */

  const updateValue = (
    id,
    valueIndex,
    value
  ) => {

    setAttributes((prev) =>
      prev.map((attr) => {

        if (attr.id === id) {

          const updatedValues = [
            ...attr.values,
          ];

          updatedValues[valueIndex] =
            value;

          return {
            ...attr,
            values: updatedValues,
          };

        }

        return attr;

      })
    );

  };

  /*
  =========================================================
  GENERATE VARIANTS
  =========================================================
  */

  const generateVariants = () => {
    console.log("created variants")

    const cleanedAttributes =
      attributes.map((attr) => ({
        ...attr,
        values: attr.values.filter(
          (value) =>
            value.trim() !== ""
        ),
      }));

    /*
    =====================================================
    CARTESIAN PRODUCT
    =====================================================
    */

    const combinations =
      cleanedAttributes.reduce(
        (acc, current) => {

          const result = [];

          acc.forEach((a) => {

            current.values.forEach(
              (value) => {

                result.push([
                  ...a,
                  {
                    attribute:
                      current.name,
                    value,
                  },
                ]);

              }
            );

          });

          return result;

        },
        [[]]
      );

    /*
    =====================================================
    FINAL VARIANTS
    =====================================================
    */

    const generatedVariants =
      combinations.map(
        (combo, index) => {

          const combinationText =
            combo
              .map(
                (item) =>
                  item.value
              )
              .join(" / ");

          return {

            id: index + 1,

            attributes: combo,

            combination:
              combinationText,

            sku:
              combinationText
                .replace(/\s/g, "")
                .replace(/\//g, "-")
                .toUpperCase(),

            price:
              product?.price
                ?.amount || 0,

            stock: 10,

            images: [],
          };

        }
      );

    setVariants(generatedVariants);

  };

  /*
  =========================================================
  UPDATE VARIANT
  =========================================================
  */

  const updateVariant = (
    id,
    field,
    value
  ) => {

    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              [field]: value,
            }
          : variant
      )
    );

  };

  /*
  =========================================================
  HANDLE IMAGE
  =========================================================
  */

  const handleVariantImage = (
    id,
    files
  ) => {

    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              images: [
                ...files,
              ],
            }
          : variant
      )
    );

  };

  /*
  =========================================================
  DELETE VARIANT
  =========================================================
  */

  const deleteVariant = (id) => {

    setVariants((prev) =>
      prev.filter(
        (variant) =>
          variant.id !== id
      )
    );

  };

  /*
  =========================================================
  SAVE VARIANTS
  =========================================================
  */

  const saveVariants = async () => {

    try {

      for (const variant of variants) {

        const formData =
          new FormData();

        /*
        PRICE
        */

        formData.append(
          "priceAmount",
          JSON.stringify({amount:variant.price})
        );


//         formData.append(
//   "price",
//   JSON.stringify({
//     amount: variant.price
//   })
// );

        /*
        STOCK
        */

        formData.append(
          "stock",
          variant.stock
        );

        /*
        ATTRIBUTES
        */

        const attributesObject = {};

        variant.attributes.forEach(
          (attr) => {

            attributesObject[
              attr.attribute
            ] = attr.value;

          }
        );

        formData.append(
          "attributes",
          JSON.stringify(
            attributesObject
          )
        );

        /*
        IMAGES
        */

        variant.images.forEach(
          (image) => {

            formData.append(
              "images",
              image
            );

          }
        );

        /*
        API CALL
        */
       
        await handleCreateVariant(
          productId,
          formData
        );
        
        

      }

      alert(
        "Variants Created Successfully"
      );

    } catch (error) {

      console.log(error);

    }

  };

  /*
  =========================================================
  LOADING
  =========================================================
  */

  if (!product) {

    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center"
        >

          <ArrowLeft size={20} />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Product Variants
          </h1>

          <p className="text-gray-500 mt-1">
            Dynamic Variant Generator
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* PRODUCT CARD */}
      {/* ================================================= */}

      <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">

        <div className="flex flex-col lg:flex-row gap-6">

          {/* IMAGE */}

          <img
            src={
              product?.images?.[0]
                ?.url
            }
            alt=""
            className="w-52 h-52 rounded-3xl object-cover"
          />

          {/* DETAILS */}

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <Package2
                className="text-violet-600"
              />

              <h2 className="text-3xl font-bold text-gray-800">
                {product?.title}
              </h2>

            </div>

            <p className="text-gray-500 mt-4 max-w-3xl">
              {
                product?.description
              }
            </p>

            <h3 className="text-4xl font-bold text-violet-600 mt-6">
              ₹
              {
                product?.price
                  ?.amount
              }
            </h3>

            <div className="flex flex-wrap gap-3 mt-6">

              <div className="px-4 py-2 rounded-2xl bg-gray-100 text-sm">
                Category:{" "}
                {
                  product?.category
                }
              </div>

              <div className="px-4 py-2 rounded-2xl bg-gray-100 text-sm">
                Product ID:{" "}
                {product?._id}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN GRID */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================================================= */}
        {/* ATTRIBUTES */}
        {/* ================================================= */}

        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Variant Attributes
            </h2>

            <button
              onClick={
                addAttribute
              }
              className="bg-violet-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >

              <Plus size={18} />

              Add Attribute

            </button>

          </div>

          {/* ATTRIBUTE LIST */}

          <div className="space-y-6">

            {attributes.map(
              (attr) => (

                <div
                  key={attr.id}
                  className="border border-gray-200 rounded-3xl p-5"
                >

                  {/* ATTRIBUTE NAME */}

                  <div className="flex gap-3 mb-4">

                    <input
                      type="text"
                      value={
                        attr.name
                      }
                      onChange={(
                        e
                      ) =>
                        updateAttributeName(
                          attr.id,
                          e.target
                            .value
                        )
                      }
                      placeholder="Attribute Name (Color, Size, RAM)"
                      className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none"
                    />

                    <button
                      onClick={() =>
                        deleteAttribute(
                          attr.id
                        )
                      }
                      className="w-12 h-12 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center"
                    >

                      <Trash2
                        size={
                          18
                        }
                      />

                    </button>

                  </div>

                  {/* VALUES */}

                  <div className="space-y-3">

                    {attr.values.map(
                      (
                        value,
                        index
                      ) => (

                        <input
                          key={
                            index
                          }
                          type="text"
                          value={
                            value
                          }
                          onChange={(
                            e
                          ) =>
                            updateValue(
                              attr.id,
                              index,
                              e
                                .target
                                .value
                            )
                          }
                          placeholder="Enter Value"
                          className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
                        />

                      )
                    )}

                  </div>

                  {/* ADD VALUE */}

                  <button
                    onClick={() =>
                      addValue(
                        attr.id
                      )
                    }
                    className="mt-4 text-violet-600 font-medium"
                  >
                    + Add Value
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* GENERATOR */}
        {/* ================================================= */}

        <div className="bg-white rounded-3xl p-6 shadow-sm h-fit sticky top-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Generate Variants
          </h2>

          <p className="text-gray-500 mt-3 leading-relaxed">
            Automatically create all possible
            combinations based on attributes.
          </p>

          <button
            onClick={
              generateVariants
            }
            className="w-full mt-6 bg-violet-600 text-white py-4 rounded-2xl font-medium"
          >
            Generate Variants
          </button>

          <div className="mt-6 bg-violet-50 border border-violet-100 rounded-2xl p-4 text-sm text-violet-700">

            Examples:
            <br />
            Mobile → Color + Storage + RAM
            <br />
            Shoes → Size + Color
            <br />
            Earbuds → Color + ANC

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* GENERATED VARIANTS */}
      {/* ================================================= */}

      {variants.length > 0 && (

        <div className="bg-white rounded-3xl p-6 shadow-sm mt-8 overflow-x-auto">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Generated Variants
              </h2>

              <p className="text-gray-500 mt-1">
                Manage stock, price and images
              </p>

            </div>

            <button
              onClick={
                saveVariants
              }
              className="bg-violet-600 text-white px-6 py-3 rounded-2xl"
            >
              Save Variants
            </button>

          </div>

          {/* TABLE */}

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="border-b border-gray-200 text-left">

                <th className="pb-4">
                  Variant
                </th>

                <th className="pb-4">
                  SKU
                </th>

                <th className="pb-4">
                  Price
                </th>

                <th className="pb-4">
                  Stock
                </th>

                <th className="pb-4">
                  Images
                </th>

                <th className="pb-4">
                  Delete
                </th>

              </tr>

            </thead>

            <tbody>

              {variants.map(
                (variant) => (

                  <tr
                    key={
                      variant.id
                    }
                    className="border-b border-gray-100"
                  >

                    {/* VARIANT */}

                    <td className="py-5 font-medium">
                      {
                        variant.combination
                      }
                    </td>

                    {/* SKU */}

                    <td className="py-5">

                      <input
                        type="text"
                        value={
                          variant.sku
                        }
                        onChange={(
                          e
                        ) =>
                          updateVariant(
                            variant.id,
                            "sku",
                            e
                              .target
                              .value
                          )
                        }
                        className="border border-gray-300 rounded-xl px-3 py-2 outline-none"
                      />

                    </td>

                    {/* PRICE */}

                    <td className="py-5">

                      <input
                        type="number"
                        value={
                          variant.price
                        }
                        onChange={(
                          e
                        ) =>
                          updateVariant(
                            variant.id,
                            "price",
                            e
                              .target
                              .value
                          )
                        }
                        className="border border-gray-300 rounded-xl px-3 py-2 outline-none"
                      />

                    </td>

                    {/* STOCK */}

                    <td className="py-5">

                      <input
                        type="number"
                        value={
                          variant.stock
                        }
                        onChange={(
                          e
                        ) =>
                          updateVariant(
                            variant.id,
                            "stock",
                            e
                              .target
                              .value
                          )
                        }
                        className="border border-gray-300 rounded-xl px-3 py-2 outline-none"
                      />

                    </td>

                    {/* IMAGE */}

                    <td className="py-5">

                      <label className="w-14 h-14 rounded-2xl border border-dashed flex items-center justify-center cursor-pointer">

                        <UploadCloud
                          size={
                            20
                          }
                        />

                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={(
                            e
                          ) =>
                            handleVariantImage(
                              variant.id,
                              Array.from(
                                e
                                  .target
                                  .files
                              )
                            )
                          }
                        />

                      </label>

                    </td>

                    {/* DELETE */}

                    <td className="py-5">

                      <button
                        onClick={() =>
                          deleteVariant(
                            variant.id
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center"
                      >

                        <Trash2
                          size={
                            18
                          }
                        />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );

};

export default SellerProductDetail;