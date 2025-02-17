"use client";

import useCart from "@/components/hooks/use-cart";
import CartItem from "@/components/product/cart-item";
import Summary from "@/components/product/summary";

const CheckOutPage = () => {
  const cart = useCart();

  return (
    <div className="">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="sm:col-span-7">
            {cart.items.length === 0 && (
              <p className="text-neutral-500">No items added to cart.</p>
            )}
            <ul>
              {cart.items.map((item, i) => (
                <CartItem key={i} data={item} />
              ))}
            </ul>
          </div>
          <Summary  />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
