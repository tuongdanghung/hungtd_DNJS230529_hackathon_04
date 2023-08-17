import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface DataItem {
    id: number;
    status: boolean;
    title: string;
}
function App() {
    const [data, setData] = useState<DataItem[]>([]);
    const [payload, setPayload] = useState({
        id: 0,
        title: "",
        status: false,
    });

    useEffect(() => {
        const localData = localStorage.getItem("test2");
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
        }
    }, []);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const maxId = Math.max(...data.map((item: any) => item.id));
        const newData = { ...payload, id: data.length === 0 ? 0 : maxId + 1 };
        setData([...data, newData]);
        localStorage.setItem("test2", JSON.stringify([...data, newData]));
        setPayload((prevPayload) => ({
            ...prevPayload,
            title: "",
        }));
    };
    const handleDelete = (id: number) => {
        const newData = data.filter((item: any) => item.id !== id);
        if (newData) {
            localStorage.setItem("test2", JSON.stringify(newData));
            setData(newData);
        }
    };

    const handleStatusClick = (clickedItem: any) => {
        const clickedIndex = data.findIndex((item) => item.id === clickedItem);

        if (clickedIndex !== -1) {
            const updatedStatus = [...data];
            updatedStatus[clickedIndex].status =
                !updatedStatus[clickedIndex].status;

            setData(updatedStatus);
            localStorage.setItem("test2", JSON.stringify(data));
        }
    };

    return (
        <div className="App">
            <div className="head">
                <h1>Todo list</h1>
                <p>Get thing done, one item at a time</p>
            </div>
            {/*  */}
            {data?.map((item: any, index: any) => {
                return (
                    <div className="item" key={item.id}>
                        <p
                            className={item.status === true ? "remove" : ""}
                            key={index}
                        >
                            {item.title}
                        </p>
                        <div className="right">
                            <input
                                type="checkbox"
                                value={item.status}
                                onChange={() => handleStatusClick(item.id)}
                            />
                            <button onClick={(e) => handleDelete(item.id)}>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    </div>
                );
            })}
            {/*  */}
            <div className="form">
                <h3>Add to the todo list</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={payload.title}
                        onChange={(e) =>
                            setPayload((prevPayload) => ({
                                ...prevPayload,
                                title: e.target.value,
                            }))
                        }
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default App;
