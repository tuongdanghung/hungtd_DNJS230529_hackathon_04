import React, { useState } from "react";
import Cart from "./Cart";
import { BsFillCartFill } from "react-icons/bs";
const initialData = [
    {
        id: 0,
        name: "Product ",
        img: "https://plus.unsplash.com/premium_photo-1681333063674-8d1fa674b896?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        price: 1200,
    },
    {
        id: 1,
        name: "Product 1",
        img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        price: 1300,
    },
    {
        id: 2,
        name: "Product 2",
        img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        price: 1400,
    },
    {
        id: 3,
        name: "Product 3",
        img: "https://plus.unsplash.com/premium_photo-1681336999500-e4f96fe367f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        price: 1500,
    },
    {
        id: 4,
        name: "Product 4",
        img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price: 1600,
    },
    {
        id: 5,
        name: "Product 5",
        img: "https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price: 1700,
    },
    {
        id: 6,
        name: "Product 6",
        img: "https://images.unsplash.com/photo-1615494488092-b13b68fe0eb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price: 1800,
    },
    {
        id: 7,
        name: "Product 7",
        img: "https://images.unsplash.com/photo-1592179900431-1e021ea53b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price: 1900,
    },
];
interface DataItem {
    id: number;
    name: string;
    img: string;
    price: number;
    quantity: number;
}

function App() {
    const [data, setData] = useState(initialData);
    const [cartData, setCartData] = useState<DataItem[]>([]); // Change here
    const [checkShow, setCheckShow] = useState(true);
    const handleClick = (id: number) => {
        const itemData = data.find((item) => item.id === id);
        if (itemData) {
            const existingCartItem = cartData.find((item) => item.id === id);
            if (existingCartItem) {
                const updatedCartData = cartData.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setCartData(updatedCartData);
            } else {
                const newCartItem = { ...itemData, quantity: 1 };
                setCartData([...cartData, newCartItem]);
            }
        }
    };
    const isCheck = (data: boolean) => {
        setCheckShow(data);
    };
    const updatedCartData = (data: any) => {
        setCartData(data);
    };
    return (
        <div className="App">
            <div className="head">
                <h1>Product</h1>
                <button onClick={() => setCheckShow(!checkShow)}>
                    <BsFillCartFill />
                    <span>{cartData.length}</span>
                </button>
            </div>
            <div className="container">
                <div
                    style={{
                        width: checkShow === true ? "100%" : " 73%",
                    }}
                    className="left-row"
                >
                    {data.map((item, index) => (
                        <div className="col" key={item.id}>
                            <img src={item.img} alt="" />
                            <p>{item.name}</p>
                            <p>Price: {item.price}$</p>
                            <button onClick={() => handleClick(item.id)}>
                                add to cart
                            </button>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        display: checkShow === true ? "none" : "block",
                        width: checkShow === true ? "0" : "25%",
                    }}
                    className={"right-row"}
                >
                    <Cart
                        cart={cartData}
                        isCheck={isCheck}
                        updatedCartData={updatedCartData}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
