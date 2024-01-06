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

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'amount') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: tg?.initData?.user?.id ?? '1500',
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на заполненность всех обязательных полей
        if (!formData.date || !formData.amount || !formData.category) {
            alert("Please fill in all required fields.");
            return;
        }

        // const userId = tg.initData.user.id;



        console.log(tg?.initData?.user?.id);


        formData.userId = tg?.initData?.user?.id;
        formData.category = 1;

        // Отправка данных, обработка формы и т.д.
        console.log("Form submitted:", formData);
        fetch('https://cybercats.live/api/add-expenses', {
            method: 'POST', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(r => {
            r.json().then(res => {
                    console.log(res)
                    tg.close()
                }
            )
        })
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
                        <option value="">Select Type</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </label>
                <br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
