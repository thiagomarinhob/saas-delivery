import { Button } from "@/components/ui/button";
import { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="relative flex items-center gap-2 bg-white">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <Button variant="ghost" size="sm" onClick={handleDecrease}>
          –
        </Button>
        <span className="mx-4 text-sm">{quantity}</span>
        <Button variant="ghost" size="sm" onClick={handleIncrease}>
          +
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
