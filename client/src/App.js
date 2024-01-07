import './App.css';
import {useEffect, useState} from "react";

const tg = window.Telegram.WebApp;
const initialFormData = {
    date: "",
    amount: "",
    categoryName: "",
};


function App() {


    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));


    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

        // Проверка на заполненность всех обязательных полей
        if (!formData.date || !formData.amount || !formData.categoryName) {
            alert("Please fill in all required fields.");
            return;
        }

        formData.userId = tg?.initDataUnsafe?.user.id;

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
        }).catch(e => tg.close())
    };


    useEffect(() => {
        fetch('https://cybercats.live/api/categories', {
            method: 'GET', headers: {
                "Content-Type": "application/json",
            }
        }).then(r => {
            r.json().then(res => {
                    setCategories(res.data.map(category => category.name))
                    setFormData((prevData) => ({
                        ...prevData,
                        categoryName: res.data[0].name,
                    }));
                }
            )
        }).catch(e => tg.close())
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
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleChange}
                        defaultChecked={categories[0]}
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
