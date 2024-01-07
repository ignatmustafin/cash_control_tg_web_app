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

const APP_DATA_TEMP: {userId: number; chatId: number}[] = []; // replace with redis

const start = async () => {

    await db.initialize();

    app.get('/api/categories', async (req, res) => {
        try {
            const categories = await db.getRepository(Category).find();
            res.json({data: categories})
        } catch (e: any) {
            res.status(400).json({error: e.message})
        }
    })

    app.post('/api/add-expenses', async (req, res) => {
        try {
            const {userId, date, categoryName, amount} = req.body;
            const chatId = APP_DATA_TEMP.find(item => item.userId === userId)?.chatId;

            if (!chatId) {
                throw new Error('Chat id not found')
            }

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

            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/m/Money_Save/Money_Save_007.webp', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'New record', web_app: {url: WEB_APP_URL}}]
                    ]
                }
            });
            res.send({success: true})
        } catch (e: any) {
            res.status(400).json({error: e.message})
        }
    })

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const userId = msg.from?.id ? msg.from.id : null;

        if (!userId) {
            throw new Error('no user id');
        }

        if (!APP_DATA_TEMP.find(item => item.userId === userId)) {
            APP_DATA_TEMP.push({userId, chatId})
        }

        if (msg?.web_app_data?.data) {
            console.log(JSON.parse(msg.web_app_data.data));
        }

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Welcome to Cash Control Bot created by Cybercats inc.')
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/s/slovopacana_stickers/slovopacana_stickers_001.webp?v=1704467703', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'New record', web_app: {url: WEB_APP_URL}}]
                    ]
                },
            });
        }

        if (text === '/newrecord') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/blinsp/blinsp_001.webp?v=1702508702', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'New record', web_app: {url: WEB_APP_URL}}]
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



