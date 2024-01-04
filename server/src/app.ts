import TelegramApi from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import mongoose, {Types, Model} from "mongoose";
import {Expenses} from "./models/expenses";

dotenv.config();
const BOT_TOKEN = process.env.TG_BOT_TOKEN || '';
const DB_URI = process.env.DB_URI || '';
const WEB_APP_URL = 'https://67c0-109-248-149-240.ngrok-free.app/';

const bot = new TelegramApi(BOT_TOKEN, {polling: true});



const start = async () => {
    try {
        // Connect to the MongoDB cluster
        await mongoose.connect(DB_URI);
    } catch (e) {
        console.log("could not connect", e);
    }


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (msg?.web_app_data?.data) {
            console.log(JSON.parse(msg.web_app_data.data));
        }

        if (text === '/start') {
            bot.sendMessage(chatId, 'Welcome to Cash Control Bot created by Cybercats inc.')
        }

        if (text === 'db') {
            const qwe = new Expenses({date: 'qwe'})

            qwe.save();
            qwe.da
        }

        if (text === 'qwe') {

            bot.sendMessage(chatId, 'Заполните форму:', {
                reply_markup: {
                    keyboard: [
                        [{text: 'fill', web_app: {url: WEB_APP_URL}}]
                    ]
                }
            });
        }
    });
}

start();



