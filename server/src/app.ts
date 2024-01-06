import * as dotenv from 'dotenv';
dotenv.config();

import TelegramApi from 'node-telegram-bot-api';
import {Category} from "./database/entities/categories";
import db from './database'
import {Expenses} from "./database/entities/expenses";
import express from "express"
import cors from 'cors'

const BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const WEB_APP_URL = process.env.WEB_APP_URL || '';

console.log(WEB_APP_URL, 'WEB APP URL HEREHERE')

const bot = new TelegramApi(BOT_TOKEN, {polling: true});

const app = express()


app.use(express.json())
app.use(cors());

const start = async () => {

    await db.initialize();

    app.get('/api/categories', async (req, res) => {
        const categories = await db.getRepository(Category).find();
        res.json({data: categories})
    })

    app.post('/api/add-expenses', async (req, res) => {
        const {userId, date, categoryName, amount} = req.body;

        const category = await db.getRepository(Category).findOne({where: {name: categoryName}});
        if (!category) {
            throw new Error('category not exist')
        }

        const expenses = new Expenses();
        expenses.userId = userId;
        expenses.date = date;
        expenses.category = category;
        expenses.amount = amount;

        await db.getRepository(Expenses).save(expenses);

        res.send({success: true})
    })

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const userId = msg.from?.id ? msg.from.id : null;

        if (!userId) {
            throw new Error('no user id');
        }

        if (msg?.web_app_data?.data) {
            console.log(JSON.parse(msg.web_app_data.data));
        }

        if (text === '/start') {
            bot.sendMessage(chatId, 'Welcome to Cash Control Bot created by Cybercats inc.')
        }

        if (text === 'db') {
            try {
                console.log(msg)

            } catch (e) {
                console.error(e);
            }

        }

        if (text === 'qwe') {

            bot.sendMessage(chatId, 'Заполните форму:', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'fill', web_app: {url: WEB_APP_URL}}]
                    ]
                }
            });
        }
    });

    app.listen(3200, () => {
        console.log('Express server listening on Port 3200')
    })
}


start();



