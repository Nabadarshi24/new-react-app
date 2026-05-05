import {
  ComponentType,
  useEffect,
  useState
} from "react";
import {
  TypeFilterOption,
  TypeProduct
} from "../types";
import { toast } from "sonner";
import { ProductGrid } from "./parts/ProductGrid";
import {
  getProductDetails,
  getProductSizeOptions,
  getSimilarProducts
} from "../api";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAccountStore } from "../../stores/GlobalStore";
import {
  showErrorMessage,
  showSuccessMessage,
  setLocalStorage
} from "../../helper/Helper";
import { addToCart } from "../../cart/api";
import { TypeCartCreatePayload } from "../../cart/types";

const ProductDetails = () => {

  const [productDetails, setProductDetails] = useState<TypeProduct>();
  const [similarProducts, setSimilarProducts] = useState<TypeProduct[]>([]);
  const [sizeOptions, setSizeOptions] = useState<TypeFilterOption[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedUser");

  const setLoading = useAccountStore(store => store.setIsLoading);

  const handleQuantityChange = (action: string) => {
    if (action == "increase") {
      setSelectedQuantity(selectedQuantity + 1);
    } else if (action == "decrease") {
      if (selectedQuantity > 1) {
        setSelectedQuantity(selectedQuantity - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setIsButtonDisabled(true);
      if (!selectedColor || !selectedSize) {
        showErrorMessage("Please select a color and size before adding to cart.");
        setIsButtonDisabled(false);
        return;
      }

      if (!loggedInUser) {
        
        navigate("/login", { state: { from: location.pathname } });
        return;
      }

      const payload: TypeCartCreatePayload = {
        productId: params.id,
        color: selectedColor,
        size: selectedSize,
        quantity: selectedQuantity,
        userId: "69f6e486d4bfdab0ac981138",
      }

      const response = await addToCart(payload);
      // debugger

      if (response.success) {
        setIsButtonDisabled(false);
        setSelectedSize(null);
        setSelectedColor(null);

        // localStorage.setItem("cartId", response.data.id);
        setLocalStorage("cartId", response.data.id);
        setLocalStorage("cartItemsCount", response.data.itemsCount.toString());
        showSuccessMessage(response.successMessage);
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.log({ error });
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
      setIsButtonDisabled(false);
    }
  };

  const loadSizeOptions = async () => {
    try {
      const response = await getProductSizeOptions();

      if (response.data && response.success) {
        setSizeOptions(response.data);
      } else {
        throw new Error("Failed to fetch size options");
      }
    } catch (error) {
      console.error("Error in loadSizeOptions:", error);
    }
  };

  const loadProductDetails = async () => {
    try {
      // Your async logic here
      setLoading(true);
      const response = await getProductDetails(params.id as string);
      console.log(response);

      if (response.data && response.success) {
        setProductDetails(response.data);
        setSelectedColor(response.data.defaultVariant.colorAspectId);
      } else {
        throw new Error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error in onMount:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSimilarProducts = async () => {
    try {
      // Your async logic here
      const response = await getSimilarProducts(params.id as string);
      console.log(response);

      if (response.data && response.success) {
        setSimilarProducts(response.data);
      } else {
        throw new Error("Failed to fetch similar products");
      }
    } catch (error) {
      console.error("Error in loadSimilarProducts:", error);
    }
  };

  useEffect(() => {
    if (productDetails?.images.length > 0) {
      setSelectedImage(productDetails.images[0].url);
    }
  }, [productDetails]);

  const onMount = async () => {
    await loadSizeOptions();
    await loadProductDetails();
    await loadSimilarProducts();
  };

  useEffect(() => {
    onMount();
  }, [params.id]);

  return (<>
    {
      productDetails &&
      <div className='tw:p-6'>
        <div className="tw:max-w-6xl tw:mx-auto tw:p-8 tw:rounded-lg">
          <div className="tw:flex tw:flex-col tw:md:flex-row">

            {/* Left Thumbnail */}
            <div className="tw:hidden tw:md:flex tw:flex-col tw:space-y-4 tw:mr-6">
              {
                productDetails.images.map((image) => {
                  return <img
                    key={image._id}
                    src={image.url}
                    alt={image.altText}
                    onClick={() => setSelectedImage(image.url)}
                    className={`tw:w-20 tw:h-20 tw:object-cover tw:rounded-lg tw:cursor-pointer tw:border ${selectedImage == image.url ? "tw:border-black" : "tw:border-gray-200"}`}
                  />
                })
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
                productDetails.images.map((image) => (
                  <img
                    key={image._id}
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
              <h1 className="tw:text-2xl tw:md:text-3xl tw:font-semibold tw:mb-2">{productDetails.productName}</h1>
              <p className="tw:text-lg tw:text-gray-600 tw:mb-1 tw:line-through">{productDetails.defaultVariant.price}</p>
              <p className="tw:text-xl tw:text-gray-500 tw:mb-2">{productDetails.defaultVariant.discountPrice}</p>
              <p className="tw:text-gray-600 tw:mb-4">{productDetails.description}</p>

              <div className="tw:mb-4">
                <p className="tw:text-gray-700">Color:</p>
                <div className="tw:mt-2 tw:flex tw:gap-2">
                  {
                    productDetails.productVariants.map((variant) => (
                      <button
                        key={variant.id}
                        className={`tw:w-8 tw:h-8 tw:rounded-full tw:border tw:cursor-pointer ${selectedColor == variant.colorAspectId ? "tw:border-black tw:border-4" : "tw:border-gray-300"}`}
                        onClick={() => {
                          setSelectedColor(variant?.colorAspectId);
                          setSelectedSize("");
                        }}
                        style={{
                          backgroundColor: variant?.colorAspect.value,
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
                    sizeOptions.map((size) => (
                      <button
                        key={size.id}
                        disabled={productDetails.productVariants.every((variant) => variant.colorAspectId !== selectedColor || variant.sizeAspect.id !== size.id)}
                        className={`tw:px-4 tw:py-2 tw:rounded tw:border tw:cursor-pointer 
                        ${selectedSize == size.value ? "tw:bg-black tw:text-white" : ""}
                        ${productDetails.productVariants.every((variant) => variant.colorAspectId !== selectedColor || variant.sizeAspect.id !== size.id) ? "tw:opacity-30" : ""}`
                        }
                        onClick={() => setSelectedSize(size.value)}
                      >
                        {size.label}
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
                      <td className="tw:py-1">{productDetails.brand}</td>
                    </tr>
                    <tr>
                      <td className="tw:py-1">Material:</td>
                      <td className="tw:py-1">{productDetails.materialAspect?.label}</td>
                    </tr>
                    <tr>
                      <td className="tw:py-1">Sku:</td>
                      <td className="tw:py-1">{productDetails.productVariants?.filter((variant) => variant.colorAspectId === selectedColor).map((variant) => variant.sku).join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="tw:mt-20">
            <h2 className="tw:text-2xl tw:text-center tw:font-medium tw:mb-4">You May Also Like</h2>
            <ProductGrid products={similarProducts} />
          </div>
        </div>
      </div>
    }
  </>);
};

export default ProductDetails as ComponentType;
