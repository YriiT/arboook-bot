// Подключаем библиотеку для работы с Telegram API в переменную
const TelegramBot = require("node-telegram-bot-api");

const DB = require("./db");

require("dotenv").config();

const _visitors = process.env.DB_COLLECTION_VISITORS;
const _messages = process.env.DB_COLLECTION_MESSAGES;
function start() {
  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

  bot.setMyCommands([
    { command: "start", description: "Запустить бот" },
    { command: "help", description: "Помощь" },
  ]);

  bot.onText(/start/, (msg) => {
    const DbService = new DB();

    bot.sendMessage(
      msg.chat.id,
      `Привет ${msg.from.first_name}!\n\rДобро пожаловать в чат, в котором вы сможете оценить качество вашего цифрового контента.\n\rПросто загрузите скриншот вашей страницы You Tube и получите результат!`
    );
    DbService.insertOne({ collection: _visitors, data: msg });
  });

  bot.onText(/help/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `Загрузите скриншот вашей страницы на You Tube и получите результат!`
    );
  });

  bot.on("message", async function (msg) {
    let photo;

    if (msg.photo && msg.photo.length > 0) {
      photo = msg.photo.at(-1).file_id;
      const DbService = new DB();

      await DbService.insertOne({ collection: _messages, data: msg });
    }

    if (msg.text && msg.text !== "/start" && msg.text !== "/help") {
      bot.sendMessage(msg.chat.id, "Извините, но я не знаю этой команды");
    }

    if (photo && msg && !msg?.reply_to_message?.photo) {
      await bot.sendPhoto("-776565219", photo);
    }

    if (photo) {
      if (msg?.reply_to_message?.photo) {
        console.log({ msg });
        const file_unique_id =
          msg?.reply_to_message.photo?.at(0)?.file_unique_id;
        const DbService = new DB();
        const query = {
          photo: {
            $elemMatch: {
              file_unique_id,
            },
          },
        };

        const message = await DbService.getOne({
          collection: _messages,
          query,
        });

        console.log({ message });
        if (message) {
          const {
            from: { id },
          } = message;

          await bot.sendPhoto(id, msg?.photo.at(-1).file_id);
        }
      }
    }
  });
}
start();
