import './App.css';
import {useEffect, useState} from "react";

const tg = window.Telegram.WebApp;
const initialFormData = {
    date: "",
    price: "",
    type: "",
};


function App() {

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на заполненность всех обязательных полей
        if (!formData.date || !formData.price || !formData.type) {
            alert("Please fill in all required fields.");
            return;
        }

        // Отправка данных, обработка формы и т.д.
        console.log("Form submitted:", formData);
        tg.sendData(JSON.stringify(formData));
    };

    useEffect(() => {
    }, [])

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Amount:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Category:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </label>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
