import './App.css';
import {useEffect, useState} from "react";

const tg = window.Telegram.WebApp;
const initialFormData = {
    date: "",
    amount: "",
    category: "",
};


function App() {


    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на заполненность всех обязательных полей
        if (!formData.date || !formData.amount || !formData.category) {
            alert("Please fill in all required fields.");
            return;
        }

        formData.userId = tg?.initDataUnsafe?.user?.id;
        formData.category = 1;

        fetch('https://cybercats.live/api/add-expenses', {
            method: 'POST', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(r => {
            r.json().then(res => {
                    tg.close()
                }
            )
        })
    };


    useEffect(() => {
        fetch('https://cybercats.live/api/categories', {
            method: 'GET', headers: {
                "Content-Type": "application/json",
            }
        }).then(r => {
            r.json().then(res => {
                    setCategories(res.data.map(category => category.name))
                }
            )
        })
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
                <br/>

                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>

                <label>
                    Category:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                </label>
                <br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
