import React, { useEffect, useState } from "react";
interface Product {
    id: number;
    name: string;
    img: string;
    price: number;
    quantity: number;
}
interface ChillProps {
    cart: Product[];
    isCheck: any;
    updatedCartData: any;
}
const Cart: React.FC<ChillProps> = (props) => {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        setData(props.cart);
    }, [props.cart]);
    const totalPrice = data.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );
    const handleIncrease = (id: number) => {
        const item = data.find((item) => item.id === id);
        if (item) {
            item.quantity = item.quantity + 1;
            setData([...data]);
        }
    };
    const handleDecrease = (id: number) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                } else {
                    return null; // Return null to indicate removal
                }
            }
            return item;
        });

        const newData = updatedData.filter(
            (item) => item !== null
        ) as Product[];

        setData(newData);
        props.updatedCartData(newData);
    };

    const handleIsCheck = () => {
        props.isCheck(true);
    };
    console.log(props.cart);
    return (
        <div className="cart">
            <div>
                {data.map((item: any, index: number) => (
                    <div className="item-cart" key={index}>
                        <img src={item.img} alt="" />
                        <p>{item.name}</p>
                        <p>{item.price}$</p>
                        <div className="quantity">
                            <button onClick={() => handleDecrease(item.id)}>
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleIncrease(item.id)}>
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="checkout">
                <p>Total: ${totalPrice}</p>
                <button onClick={() => handleIsCheck()}>Close</button>
            </div>
        </div>
    );
};

export default Cart;
