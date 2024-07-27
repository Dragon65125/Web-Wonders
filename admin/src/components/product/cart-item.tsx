import { Minus, Plus, Trash2 } from "lucide-react";
import { IProduct } from "@/types";
import useCart from "../hooks/use-cart";
import IconButton from "./icon-button";
import { IMAGE_URL } from "@/api";

interface CartItemProps {
  data: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  let images = [];

  console.log('CartItem data:', data); // Log the entire data object

  try {
    images = JSON.parse(data.images);
    console.log('Parsed images:', images); // Log the parsed images array
  } catch (error) {
    console.error('Failed to parse images JSON:', data.images);
  }

  return (
    <li className="flex py-6 border-b">
      <div className="relative w-24 h-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        {images[0] ? (
          <img
            src={`${IMAGE_URL}/${images[0]}`}
            alt="product"
            className="object-cover object-center"
            onError={() => console.error('Failed to load image:', `${IMAGE_URL}/${images[0]}`)} // Log if the image fails to load
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-4 sm:ml-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold">{data.name}</p>
            <div className="mt-1 mb-2 text-sm">
              <div className="flex flex-row">
                <p className="text-gray-500">Price: </p>
                <p className="font-semibold">&nbsp;{data.price}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-gray-500">Stock:</p>
                <p className="font-semibold">&nbsp;{data.stock}</p>
              </div>
              <div className="flex flex-row">
                <p className="text-gray-500">Quantity:</p>
                <p className="font-semibold">&nbsp;{data.quantity}</p>
              </div>
            </div>
          </div>
          <div>
            {/* Action buttons -> Delete Decrease Add */}
            <div className="flex items-center gap-x-2">
              <IconButton
                onClick={() => cart.addItem(data)}
                icon={<Plus size={15} />}
                aria-label="Increase quantity"
              />
              <IconButton
                onClick={() => cart.decreaseItem(data.id)}
                icon={<Minus size={15} />}
                aria-label="Decrease quantity"
              />
              <IconButton
                onClick={() => cart.removeItem(data.id)}
                icon={<Trash2 size={15} />}
                aria-label="Decrease quantity"
              />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-x-2"></div>
          <div className="font-semibold">NRS {data.price}</div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
