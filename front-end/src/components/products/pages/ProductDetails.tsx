import { useEffect, useState } from "react";
import { TypeSelectedProduct, TypeSimilarProduct } from "../types";
import { toast } from "sonner";
import { ProductGrid } from "./parts/ProductGrid";

const selectedProduct: TypeSelectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket perfect for any occasion",
  brand: "Fashion Brand",
  material: "100% Cotton",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Red", "White"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1"
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2"
    },
    // {
    //   url: "https://picsum.photos/500/500?random=3",
    //   altText: "Stylish Jacket 3"
    // }
  ]
}

const similarProduct: TypeSimilarProduct[] = [
  {
    _id: "1",
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=3" }]
  },
  {
    _id: "2",
    name: "Product 2",
    price: 200,
    images: [{ url: "https://picsum.photos/500/500?random=4" }]
  }, {
    _id: "3",
    name: "Product 3",
    price: 300,
    images: [{ url: "https://picsum.photos/500/500?random=5" }]
  }, {
    _id: "4",
    name: "Product 4",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=6" }]
  }
];

export const ProductDetails = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantityChange = (action: string) => {
    if (action == "increase") {
      setSelectedQuantity(selectedQuantity + 1);
    } else if (action == "decrease") {
      if (selectedQuantity > 1) {
        setSelectedQuantity(selectedQuantity - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a color and size before adding to cart.", { duration: 1000, style: { background: "red", color: "#fff" } });
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart successfully.", { duration: 1000, style: { background: "green", color: "#fff" } });
      setIsButtonDisabled(false);
      setSelectedSize(null);
      setSelectedColor(null);
    }, 1000);
  };

  useEffect(() => {
    if (selectedProduct.images.length > 0) {
      setSelectedImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  return (
    <div className='tw:p-6'>
      <div className="tw:max-w-6xl tw:mx-auto tw:p-8 tw:rounded-lg">
        <div className="tw:flex tw:flex-col tw:md:flex-row">
          {/* Left Thumbnail */}
          <div className="tw:hidden tw:md:flex tw:flex-col tw:space-y-4 tw:mr-6">
            {
              selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  onClick={() => setSelectedImage(image.url)}
                  className={`tw:w-20 tw:h-20 tw:object-cover tw:rounded-lg tw:cursor-pointer tw:border ${selectedImage == image.url ? "tw:border-black" : "tw:border-gray-200"}`}
                />
              ))
            }
          </div>

          {/* Main Image */}
          <div className="tw:md:w-1/2">
            <div className="tw:mb-4">
              <img
                src={selectedImage}
                alt="Main Product"
                className="tw:w-full tw:h-auto tw:object-cover tw:rounded-lg"
              />
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className="tw:md:hidden tw:flex tw:overscroll-x-scroll tw:space-x-4 tw:mb-4">
            {
              selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  onClick={() => setSelectedImage(image.url)}
                  className={`tw:w-20 tw:h-20 tw:object-cover tw:rounded-lg tw:cursor-pointer tw:border ${selectedImage == image.url ? "tw:border-black" : "tw:border-gray-200"}`}
                />
              ))
            }
          </div>

          {/* Right Content */}
          <div className="tw:md:w-1/2 tw:md:ml-10">
            <h1 className="tw:text-2xl tw:md:text-3xl tw:font-semibold tw:mb-2">{selectedProduct.name}</h1>
            <p className="tw:text-lg tw:text-gray-600 tw:mb-1 tw:line-through">{selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}</p>
            <p className="tw:text-xl tw:text-gray-500 tw:mb-2">{selectedProduct.price}</p>
            <p className="tw:text-gray-600 tw:mb-4">{selectedProduct.description}</p>

            <div className="tw:mb-4">
              <p className="tw:text-gray-700">Color:</p>
              <div className="tw:mt-2 tw:flex tw:gap-2">
                {
                  selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`tw:w-8 tw:h-8 tw:rounded-full tw:border tw:cursor-pointer ${selectedColor == color ? "tw:border-black tw:border-4" : "tw:border-gray-300"}`}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)"
                      }}
                    >
                    </button>
                  ))
                }
              </div>
            </div>

            <div className="tw:mb-4">
              <p className="tw:text-gray-700">Size:</p>
              <div className="tw:mt-2 tw:flex tw:gap-2">
                {
                  selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`tw:px-4 tw:py-2 tw:rounded tw:border tw:cursor-pointer ${selectedSize == size ? "tw:bg-black tw:text-white" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))
                }
              </div>
            </div>

            <div className="tw:mb-6">
              <p className="tw:text-gray-700">Quantity:</p>
              <div className="tw:mt-2 tw:flex tw:items-center tw:space-x-4">
                <button
                  className="tw:px-2 tw:py-1 tw:rounded tw:bg-gray-200 tw:text-lg tw:cursor-pointer"
                  onClick={() => handleQuantityChange("decrease")}
                >
                  -
                </button>
                <span className="tw:text-lg">{selectedQuantity}</span>
                <button
                  className="tw:px-2 tw:py-1 tw:rounded tw:bg-gray-200 tw:text-lg tw:cursor-pointer"
                  onClick={() => handleQuantityChange("increase")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              disabled={isButtonDisabled}
              onClick={() => handleAddToCart()}
              className={`tw:w-full tw:py-2 tw:px-6 tw:mb-4 tw:rounded tw:bg-black tw:text-white tw:cursor-pointer tw:uppercase ${isButtonDisabled ? "tw:opacity-50 tw:cursor-not-allowed" : ""}`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            <div className="tw:mt-10 tw:text-gray-700">
              <h3 className="tw:text-xl tw:font-bold tw:mb-4">Characteristics:</h3>
              <table className="tw:w-full tw:text-left tw:text-sm tw:text-gray-600">
                <tbody>
                  <tr>
                    <td className="tw:py-1">Brand:</td>
                    <td className="tw:py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="tw:py-1">Material:</td>
                    <td className="tw:py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="tw:mt-20">
          <h2 className="tw:text-2xl tw:text-center tw:font-medium tw:mb-4">You May Also Like</h2>
          <ProductGrid products={similarProduct} />
        </div>
      </div>
    </div>
  );
};
