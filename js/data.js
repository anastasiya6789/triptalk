/* =========================================================
   Учебный контент. Чтобы добавить слово/фразу — просто допиши
   строку в нужный массив. Формат:
   words:   [английский, русский, пример (необязательно)]
   phrases: [английский, русский]
   dialog:  [кто говорит, английский, русский]
   Варианты через " / " считаются одинаково правильными.
   ========================================================= */

const UNITS = [
  {
    id: 'basics', icon: '👋', color: '#58cc02', title: 'Основы и вежливость',
    desc: 'Поздороваться, попросить, поблагодарить и переспросить',
    words: [
      ['hello', 'здравствуйте / привет', 'Hello! How are you?'],
      ['goodbye', 'до свидания', 'Goodbye, see you tomorrow!'],
      ['please', 'пожалуйста (просьба)', 'Water, please.'],
      ['thank you', 'спасибо', 'Thank you for your help!'],
      ["you're welcome", 'пожалуйста (в ответ на спасибо)', "— Thanks! — You're welcome."],
      ['sorry', 'простите (извинение)', "Sorry, I'm late."],
      ['excuse me', 'извините (обратиться к кому-то)', 'Excuse me, where is the exit?'],
      ['yes', 'да'],
      ['no', 'нет'],
      ['where', 'где / куда', 'Where is the hotel?'],
      ['when', 'когда', 'When does it open?'],
      ['how much', 'сколько (стоит)', 'How much is it?'],
      ['today', 'сегодня'],
      ['tomorrow', 'завтра'],
      ['toilet / restroom', 'туалет', 'Where is the restroom?'],
      ['water', 'вода', 'A bottle of water, please.'],
    ],
    phrases: [
      ['Nice to meet you.', 'Приятно познакомиться.'],
      ['My name is Anna.', 'Меня зовут Анна.'],
      ["I'm from Russia.", 'Я из России.'],
      ["I don't understand.", 'Я не понимаю.'],
      ['Could you say that again, please?', 'Не могли бы вы повторить, пожалуйста?'],
      ['Could you speak more slowly, please?', 'Говорите, пожалуйста, помедленнее.'],
      ['Do you speak Russian?', 'Вы говорите по-русски?'],
      ['Where is the toilet?', 'Где туалет?'],
      ['Thank you very much!', 'Большое спасибо!'],
    ],
    dialog: [
      ['A', 'Hi! Nice to meet you.', 'Привет! Приятно познакомиться.'],
      ['B', 'Nice to meet you too. Where are you from?', 'Мне тоже. Откуда вы?'],
      ['A', "I'm from Russia. And you?", 'Я из России. А вы?'],
      ['B', "I'm from Canada. Is this your first time here?", 'Я из Канады. Вы здесь впервые?'],
      ['A', 'Sorry, could you speak more slowly, please?', 'Извините, можно помедленнее?'],
      ['B', 'Of course! Is this your first time here?', 'Конечно! Вы здесь впервые?'],
      ['A', 'Yes, it is. Thank you!', 'Да. Спасибо!'],
    ],
  },
  {
    id: 'airport', icon: '✈️', color: '#1cb0f6', title: 'Аэропорт',
    desc: 'Регистрация, досмотр, посадка и паспортный контроль',
    words: [
      ['airport', 'аэропорт'],
      ['flight', 'рейс / полёт', 'My flight is at 6 pm.'],
      ['passport', 'паспорт', 'Can I see your passport, please?'],
      ['ticket', 'билет'],
      ['boarding pass', 'посадочный талон', 'Here is my boarding pass.'],
      ['gate', 'выход на посадку', 'Our flight leaves from gate 12.'],
      ['luggage / baggage', 'багаж', 'My luggage is too heavy.'],
      ['suitcase', 'чемодан'],
      ['carry-on', 'ручная кладь', 'Is this bag OK as carry-on?'],
      ['check-in', 'регистрация на рейс', 'Where is the check-in desk?'],
      ['departure', 'вылет / отправление'],
      ['arrival', 'прилёт / прибытие'],
      ['delay', 'задержка', 'There is a two-hour delay.'],
      ['window seat', 'место у окна'],
      ['aisle seat', 'место у прохода'],
      ['customs', 'таможня'],
      ['baggage claim', 'выдача багажа', 'Where is the baggage claim?'],
      ['connecting flight', 'стыковочный рейс'],
    ],
    phrases: [
      ['Where is the check-in desk?', 'Где стойка регистрации?'],
      ["I'd like a window seat, please.", 'Я бы хотел(а) место у окна, пожалуйста.'],
      ['How many bags can I take?', 'Сколько сумок я могу взять?'],
      ['Is the flight delayed?', 'Рейс задерживается?'],
      ['Which gate is it?', 'Какой выход на посадку?'],
      ["I'm here on vacation.", 'Я здесь в отпуске.'],
      ["I'm staying for two weeks.", 'Я пробуду здесь две недели.'],
      ['I have nothing to declare.', 'Мне нечего декларировать.'],
      ['My luggage is lost.', 'Мой багаж потерялся.'],
      ['Where is the baggage claim?', 'Где выдача багажа?'],
    ],
    dialog: [
      ['A', 'Good morning! Can I see your passport, please?', 'Доброе утро! Можно ваш паспорт?'],
      ['B', 'Sure, here you are.', 'Конечно, вот, пожалуйста.'],
      ['A', 'Are you checking any bags?', 'Будете сдавать багаж?'],
      ['B', 'Yes, one suitcase. And this is my carry-on.', 'Да, один чемодан. А это ручная кладь.'],
      ['A', 'Would you like a window seat or an aisle seat?', 'Вам место у окна или у прохода?'],
      ['B', "I'd like a window seat, please.", 'У окна, пожалуйста.'],
      ['A', 'Here is your boarding pass. Your gate is 24.', 'Вот ваш посадочный талон. Выход 24.'],
      ['B', 'Thank you! What time is boarding?', 'Спасибо! Во сколько посадка?'],
      ['A', 'At 10:15. Have a nice flight!', 'В 10:15. Приятного полёта!'],
    ],
  },
  {
    id: 'hotel', icon: '🏨', color: '#ce82ff', title: 'Отель',
    desc: 'Заселение, просьбы на ресепшене и проблемы в номере',
    words: [
      ['hotel', 'отель / гостиница'],
      ['reservation / booking', 'бронь / бронирование', 'I have a reservation.'],
      ['room', 'номер / комната'],
      ['single room', 'одноместный номер'],
      ['double room', 'двухместный номер'],
      ['key', 'ключ', 'I lost my room key.'],
      ['reception', 'ресепшен / стойка администратора'],
      ['breakfast', 'завтрак', 'Is breakfast included?'],
      ['floor', 'этаж', 'Your room is on the third floor.'],
      ['elevator / lift', 'лифт'],
      ['towel', 'полотенце', 'Could I have an extra towel?'],
      ['check-out', 'выезд из отеля', 'Check-out is at noon.'],
      ['air conditioning', 'кондиционер'],
      ['bed', 'кровать'],
      ['night', 'ночь', 'A room for two nights, please.'],
      ['included', 'включено', 'Is Wi-Fi included?'],
    ],
    phrases: [
      ['I have a reservation.', 'У меня есть бронь.'],
      ['I booked a room for three nights.', 'Я забронировал(а) номер на три ночи.'],
      ['Is breakfast included?', 'Завтрак включён?'],
      ['What time is breakfast?', 'Во сколько завтрак?'],
      ['What is the Wi-Fi password?', 'Какой пароль от Wi-Fi?'],
      ['Could I have an extra towel?', 'Можно мне ещё одно полотенце?'],
      ["The air conditioning doesn't work.", 'Кондиционер не работает.'],
      ['What time is check-out?', 'Во сколько выезд?'],
      ['Can I leave my luggage here?', 'Могу я оставить здесь багаж?'],
      ['Could you call a taxi for me?', 'Не могли бы вы вызвать мне такси?'],
    ],
    dialog: [
      ['A', 'Hello! How can I help you?', 'Здравствуйте! Чем могу помочь?'],
      ['B', 'Hi! I have a reservation. My name is Anna Ivanova.', 'Здравствуйте! У меня бронь на имя Анна Иванова.'],
      ['A', 'Yes, a double room for three nights. Can I see your passport?', 'Да, двухместный номер на три ночи. Можно ваш паспорт?'],
      ['B', 'Here you are. Is breakfast included?', 'Вот. Завтрак включён?'],
      ['A', "Yes, it's from 7 to 10 on the first floor.", 'Да, с 7 до 10 на первом этаже.'],
      ['B', 'Great. And what is the Wi-Fi password?', 'Отлично. А какой пароль от Wi-Fi?'],
      ['A', "It's on your key card. Your room is 305.", 'Он на вашей карте-ключе. Ваш номер 305.'],
      ['B', 'Thank you very much!', 'Большое спасибо!'],
    ],
  },
  {
    id: 'directions', icon: '🗺️', color: '#ff9600', title: 'На улице: как пройти',
    desc: 'Спросить дорогу и понять ответ',
    words: [
      ['street', 'улица'],
      ['corner', 'угол', "It's on the corner."],
      ['left', 'налево / левый', 'Turn left.'],
      ['right', 'направо / правый', 'Turn right at the bank.'],
      ['straight ahead', 'прямо', 'Go straight ahead.'],
      ['crossroads / intersection', 'перекрёсток'],
      ['traffic lights', 'светофор', 'Turn left at the traffic lights.'],
      ['block', 'квартал', "It's two blocks from here."],
      ['map', 'карта'],
      ['near', 'близко / рядом', 'Is it near here?'],
      ['far', 'далеко', 'Is it far?'],
      ['next to', 'рядом с', "It's next to the bank."],
      ['opposite', 'напротив', "It's opposite the park."],
      ['bridge', 'мост'],
      ['square', 'площадь'],
      ['entrance', 'вход'],
      ['exit', 'выход'],
    ],
    phrases: [
      ['Excuse me, how do I get to the museum?', 'Извините, как пройти к музею?'],
      ['Is it far from here?', 'Это далеко отсюда?'],
      ['Can I walk there?', 'Туда можно дойти пешком?'],
      ['Go straight ahead and turn left.', 'Идите прямо и поверните налево.'],
      ["It's on the corner.", 'Это на углу.'],
      ["It's next to the bank.", 'Это рядом с банком.'],
      ['Could you show me on the map?', 'Можете показать на карте?'],
      ["I'm lost.", 'Я заблудился(-ась).'],
      ['Where is the nearest ATM?', 'Где ближайший банкомат?'],
    ],
    dialog: [
      ['A', 'Excuse me, how do I get to the museum?', 'Извините, как пройти к музею?'],
      ['B', 'Go straight ahead and turn left at the traffic lights.', 'Идите прямо и на светофоре поверните налево.'],
      ['A', 'Is it far from here?', 'Это далеко отсюда?'],
      ['B', 'No, about ten minutes on foot.', 'Нет, около десяти минут пешком.'],
      ['A', 'Could you show me on the map?', 'Можете показать на карте?'],
      ['B', "Sure. We are here. The museum is opposite the park.", 'Конечно. Мы здесь. Музей напротив парка.'],
      ['A', 'Thank you so much!', 'Огромное спасибо!'],
    ],
  },
  {
    id: 'transport', icon: '🚕', color: '#ff4b4b', title: 'Транспорт',
    desc: 'Метро, автобус, поезд и такси',
    words: [
      ['bus', 'автобус'],
      ['train', 'поезд'],
      ['subway / metro', 'метро'],
      ['taxi', 'такси'],
      ['station', 'станция / вокзал'],
      ['bus stop', 'автобусная остановка', 'Where is the bus stop?'],
      ['platform', 'платформа', 'The train leaves from platform 3.'],
      ['one-way ticket', 'билет в одну сторону'],
      ['return ticket / round-trip ticket', 'билет туда и обратно'],
      ['timetable / schedule', 'расписание'],
      ['driver', 'водитель'],
      ['fare', 'стоимость проезда', 'What is the fare to the airport?'],
      ['transfer', 'пересадка'],
      ['next', 'следующий', 'When is the next train?'],
      ['get off', 'выходить (из транспорта)', 'I want to get off here.'],
      ['rent a car', 'арендовать машину'],
    ],
    phrases: [
      ['How much is a ticket to the city center?', 'Сколько стоит билет до центра города?'],
      ['A one-way ticket, please.', 'Билет в одну сторону, пожалуйста.'],
      ['Does this bus go to the airport?', 'Этот автобус идёт в аэропорт?'],
      ['When is the next train?', 'Когда следующий поезд?'],
      ['Where do I change trains?', 'Где мне сделать пересадку?'],
      ['Please take me to this address.', 'Отвезите меня, пожалуйста, по этому адресу.'],
      ['Can you tell me when to get off?', 'Скажите, пожалуйста, когда мне выходить?'],
      ['How long does it take?', 'Сколько времени это займёт?'],
      ['Keep the change.', 'Сдачи не надо.'],
    ],
    dialog: [
      ['A', 'Hi! Please take me to this address.', 'Здравствуйте! Отвезите меня по этому адресу.'],
      ['B', 'Sure. Is this your first time in the city?', 'Конечно. Вы впервые в городе?'],
      ['A', 'Yes. How long does it take?', 'Да. Сколько ехать?'],
      ['B', 'About twenty minutes if there is no traffic.', 'Около двадцати минут, если нет пробок.'],
      ['A', 'Can I pay by card?', 'Можно оплатить картой?'],
      ['B', 'Yes, of course.', 'Да, конечно.'],
      ['A', 'Here you go. Keep the change!', 'Вот, держите. Сдачи не надо!'],
    ],
  },
  {
    id: 'shopping', icon: '🛍️', color: '#ffc800', title: 'Магазин и покупки',
    desc: 'Цены, размеры, оплата и чек',
    words: [
      ['shop / store', 'магазин'],
      ['price', 'цена'],
      ['cash', 'наличные', 'Can I pay in cash?'],
      ['card', 'карта (банковская)'],
      ['receipt', 'чек', 'Could I have a receipt?'],
      ['size', 'размер', 'Do you have a bigger size?'],
      ['discount', 'скидка'],
      ['sale', 'распродажа'],
      ['cheap', 'дешёвый'],
      ['expensive', 'дорогой', "It's too expensive."],
      ['bag', 'пакет / сумка'],
      ['fitting room', 'примерочная', 'Where is the fitting room?'],
      ['change', 'сдача'],
      ['souvenir', 'сувенир'],
      ['open', 'открыто'],
      ['closed', 'закрыто'],
    ],
    phrases: [
      ['How much is this?', 'Сколько это стоит?'],
      ["I'm just looking, thanks.", 'Я просто смотрю, спасибо.'],
      ['Can I try it on?', 'Можно примерить?'],
      ['Do you have this in a smaller size?', 'У вас есть это размером поменьше?'],
      ['Can I pay by card?', 'Можно оплатить картой?'],
      ["I'll take it.", 'Я возьму это.'],
      ["It's too expensive.", 'Это слишком дорого.'],
      ['Could I have a receipt, please?', 'Можно чек, пожалуйста?'],
      ['What time do you close?', 'Во сколько вы закрываетесь?'],
    ],
    dialog: [
      ['A', 'Hello! Can I help you?', 'Здравствуйте! Вам помочь?'],
      ['B', "I'm just looking, thanks. Actually, how much is this jacket?", 'Я просто смотрю. Хотя... сколько стоит эта куртка?'],
      ['A', "It's 60 dollars, but today there is a 20% discount.", '60 долларов, но сегодня скидка 20%.'],
      ['B', 'Can I try it on?', 'Можно примерить?'],
      ['A', 'Sure, the fitting room is over there.', 'Конечно, примерочная вон там.'],
      ['B', "It's a bit big. Do you have this in a smaller size?", 'Великовата. Есть размер поменьше?'],
      ['A', 'Yes, here you are.', 'Да, вот, пожалуйста.'],
      ['B', "Perfect, I'll take it. Can I pay by card?", 'Отлично, беру. Можно картой?'],
    ],
  },
  {
    id: 'restaurant', icon: '🍽️', color: '#2b70c9', title: 'Кафе и ресторан',
    desc: 'Заказать еду, сказать про аллергию, попросить счёт',
    words: [
      ['menu', 'меню'],
      ['table', 'столик', 'A table for two, please.'],
      ['waiter', 'официант'],
      ['bill / check', 'счёт', 'Could I have the bill, please?'],
      ['tip', 'чаевые', 'Is the tip included?'],
      ['order', 'заказ / заказывать', "I'd like to order."],
      ['starter', 'закуска'],
      ['main course', 'основное блюдо'],
      ['dessert', 'десерт'],
      ['drink', 'напиток'],
      ['vegetarian', 'вегетарианский'],
      ['spicy', 'острый', 'Is it spicy?'],
      ['chicken', 'курица'],
      ['fish', 'рыба'],
      ['coffee', 'кофе'],
      ['allergy', 'аллергия', 'I have a nut allergy.'],
    ],
    phrases: [
      ['A table for two, please.', 'Столик на двоих, пожалуйста.'],
      ['Can I see the menu, please?', 'Можно меню, пожалуйста?'],
      ["I'd like to order.", 'Я бы хотел(а) сделать заказ.'],
      ['What do you recommend?', 'Что вы посоветуете?'],
      ["I'm allergic to nuts.", 'У меня аллергия на орехи.'],
      ['Is it spicy?', 'Это острое?'],
      ['Can I have it to go?', 'Можно с собой?'],
      ['Could I have the bill, please?', 'Можно счёт, пожалуйста?'],
      ['It was delicious!', 'Было очень вкусно!'],
    ],
    dialog: [
      ['A', 'Good evening! A table for two?', 'Добрый вечер! Столик на двоих?'],
      ['B', 'Yes, please. Can we see the menu?', 'Да, пожалуйста. Можно меню?'],
      ['A', 'Here you are. Are you ready to order?', 'Пожалуйста. Готовы сделать заказ?'],
      ['B', 'What do you recommend?', 'Что вы посоветуете?'],
      ['A', 'The grilled fish is very good today.', 'Рыба на гриле сегодня очень хороша.'],
      ['B', "OK, I'll have the fish. I'm allergic to nuts.", 'Хорошо, я возьму рыбу. У меня аллергия на орехи.'],
      ['A', "No problem, there are no nuts in it.", 'Не проблема, в ней нет орехов.'],
      ['B', 'Great. Could I have the bill later, please?', 'Отлично. И потом счёт, пожалуйста.'],
    ],
  },
  {
    id: 'emergency', icon: '🚑', color: '#ea2b2b', title: 'Здоровье и экстренные случаи',
    desc: 'Аптека, врач, полиция и потерянные вещи',
    words: [
      ['help', 'помощь', 'I need help!'],
      ['police', 'полиция'],
      ['ambulance', 'скорая помощь'],
      ['hospital', 'больница'],
      ['doctor', 'врач'],
      ['pharmacy', 'аптека', 'Where is the nearest pharmacy?'],
      ['medicine', 'лекарство'],
      ['pain', 'боль', 'I have a pain in my back.'],
      ['headache', 'головная боль'],
      ['fever', 'температура / жар', 'I have a fever.'],
      ['sick', 'больной / плохо себя чувствую', 'I feel sick.'],
      ['insurance', 'страховка', 'I have travel insurance.'],
      ['embassy', 'посольство'],
      ['wallet', 'кошелёк'],
      ['stolen', 'украденный', 'My phone was stolen.'],
      ['emergency', 'экстренный случай'],
    ],
    phrases: [
      ['Help!', 'Помогите!'],
      ['Call an ambulance!', 'Вызовите скорую!'],
      ['I need a doctor.', 'Мне нужен врач.'],
      ['I have a headache.', 'У меня болит голова.'],
      ['Do you have something for a cold?', 'У вас есть что-нибудь от простуды?'],
      ['My wallet was stolen.', 'У меня украли кошелёк.'],
      ['Where is the police station?', 'Где полицейский участок?'],
      ['I have travel insurance.', 'У меня есть туристическая страховка.'],
      ['Can I use your phone?', 'Можно воспользоваться вашим телефоном?'],
    ],
    dialog: [
      ['A', 'Hello, can I help you?', 'Здравствуйте, чем могу помочь?'],
      ['B', "Hi. I don't feel well. I have a headache and a fever.", 'Здравствуйте. Мне плохо. Болит голова и температура.'],
      ['A', 'How long have you had it?', 'Как давно это у вас?'],
      ['B', 'Since yesterday.', 'Со вчерашнего дня.'],
      ['A', 'Take this medicine twice a day. If it gets worse, see a doctor.', 'Принимайте это лекарство два раза в день. Если станет хуже — к врачу.'],
      ['B', 'Thank you. Do I need a prescription?', 'Спасибо. Нужен рецепт?'],
      ['A', "No, you don't. Get well soon!", 'Нет, не нужен. Выздоравливайте!'],
    ],
  },
];

/* ================= ГРАММАТИКА ================= */
const GRAMMAR = [
  {
    id: 'word-order', icon: '🧱', title: 'Порядок слов',
    sub: 'Главное правило английского предложения',
    body: `
<p>В русском можно сказать «Я люблю кофе», «Кофе я люблю», «Люблю я кофе» — смысл тот же. <b>В английском порядок слов строгий</b>, и именно он показывает, кто что делает.</p>
<div class="formula"><span>Кто</span> + <span>действие</span> + <span>что / кого</span> + <span>где</span> + <span>когда</span></div>
<table class="gtable">
<tr><th>Кто</th><th>Действие</th><th>Что</th><th>Где</th><th>Когда</th></tr>
<tr><td>I</td><td>need</td><td>a taxi</td><td>—</td><td>now</td></tr>
<tr><td>We</td><td>have</td><td>a reservation</td><td>at this hotel</td><td>tonight</td></tr>
<tr><td>She</td><td>bought</td><td>souvenirs</td><td>in the shop</td><td>yesterday</td></tr>
</table>
<div class="tip">💡 В английском предложении <b>всегда есть подлежащее</b>. «Холодно» — <b>It</b> is cold. «Идёт дождь» — <b>It</b> is raining.</div>`,
    examples: [
      ['I need a taxi now.', 'Мне нужно такси сейчас.'],
      ['We have a reservation at this hotel.', 'У нас бронь в этом отеле.'],
      ["It's cold today.", 'Сегодня холодно.'],
    ],
    quiz: [
      { q: 'Выбери правильный порядок слов:', o: ['I need a doctor.', 'Need I a doctor.', 'A doctor I need.'], a: 0, e: 'Кто (I) + действие (need) + что (a doctor).' },
      { q: '«Сегодня жарко» по-английски:', o: ['Is hot today.', "It's hot today.", 'Today hot.'], a: 1, e: 'Подлежащее обязательно — используем «it».' },
      { q: 'Где обычно стоит «где» и «когда»?', o: ['В начале, перед подлежащим', 'В конце: сначала место, потом время', 'Между подлежащим и глаголом'], a: 1, e: 'Сначала место, потом время: at the hotel tonight.' },
      { q: 'Выбери правильный вариант:', o: ['We bought souvenirs in the shop yesterday.', 'We bought yesterday in the shop souvenirs.', 'Souvenirs we bought yesterday shop.'], a: 0, e: 'Кто + действие + что + где + когда.' },
      { q: '«Идёт дождь»:', o: ['Is raining.', 'Raining.', "It's raining."], a: 2, e: 'Безличные предложения начинаются с «it».' },
    ],
  },
  {
    id: 'to-be', icon: '🟰', title: 'Глагол to be: am / is / are',
    sub: '«Быть», «являться», «находиться»',
    body: `
<p>В русском мы говорим «Я турист», «Где выход?» — без глагола. В английском на месте пропущенного «есть / находится» стоит <b>to be</b>.</p>
<table class="gtable">
<tr><th>Лицо</th><th>Форма</th><th>Сокращение</th></tr>
<tr><td>I</td><td>am</td><td>I'm</td></tr>
<tr><td>he / she / it</td><td>is</td><td>he's, she's, it's</td></tr>
<tr><td>we / you / they</td><td>are</td><td>we're, you're, they're</td></tr>
</table>
<p><b>Вопрос</b> — ставим am/is/are в начало: <i>Is this the gate?</i><br><b>Отрицание</b> — добавляем not: <i>I'm not ready. It isn't far.</i></p>
<div class="tip">💡 Прошедшее время: <b>was</b> (I, he, she, it) и <b>were</b> (we, you, they). <i>The flight was late.</i></div>`,
    examples: [
      ["I'm a tourist.", 'Я турист.'],
      ['Is this the right gate?', 'Это правильный выход?'],
      ["The museum isn't far.", 'Музей недалеко.'],
      ['We are from Russia.', 'Мы из России.'],
    ],
    quiz: [
      { q: 'I ___ from Russia.', o: ['is', 'am', 'are'], a: 1, e: 'С «I» всегда am.' },
      { q: 'Where ___ the toilets?', o: ['is', 'am', 'are'], a: 2, e: 'Toilets — множественное число, значит are.' },
      { q: '___ this seat free?', o: ['Is', 'Are', 'Am'], a: 0, e: 'This seat — «оно», вопрос начинается с Is.' },
      { q: 'Выбери отрицание: «Отель недалеко»', o: ["The hotel isn't far.", "The hotel don't far.", 'The hotel not far.'], a: 0, e: 'Отрицание с to be: is + not = isn\'t.' },
      { q: 'The flight ___ late yesterday.', o: ['is', 'were', 'was'], a: 2, e: 'Прошедшее время, единственное число — was.' },
    ],
  },
  {
    id: 'articles', icon: '🅰️', title: 'Артикли a / an / the',
    sub: 'Маленькие слова, которые нужны почти всегда',
    body: `
<p><b>A / an</b> — «какой-то, один из многих». Используем, когда говорим о предмете впервые, и только с исчисляемыми в единственном числе.</p>
<ul><li><b>a</b> — перед согласным звуком: <i>a taxi, a ticket, a hotel</i></li>
<li><b>an</b> — перед гласным звуком: <i>an apple, an hour, an umbrella</i></li></ul>
<p><b>The</b> — «тот самый, конкретный», когда понятно, о чём речь: <i>the airport</i> (в этом городе), <i>the bill</i> (наш счёт).</p>
<div class="tip">💡 Важен <b>звук</b>, а не буква: <i>an hour</i> (h не читается), но <i>a university</i> (звучит «ю»).</div>
<p>Без артикля: имена, большинство стран и городов (<i>Russia, London</i>), а также множественное число в общем смысле.</p>`,
    examples: [
      ['I need a taxi.', 'Мне нужно (какое-нибудь) такси.'],
      ['The taxi is here.', 'Такси (которое мы ждали) приехало.'],
      ['Is there an ATM near here?', 'Здесь рядом есть банкомат?'],
      ['Could I have the bill, please?', 'Можно (наш) счёт?'],
    ],
    quiz: [
      { q: 'I want to buy ___ umbrella.', o: ['a', 'an', 'the'], a: 1, e: 'Umbrella начинается с гласного звука — an.' },
      { q: 'Where is ___ nearest pharmacy?', o: ['a', 'an', 'the'], a: 2, e: 'Nearest — самая ближайшая, конкретная — the.' },
      { q: 'We waited for ___ hour.', o: ['a', 'an', '—'], a: 1, e: 'В hour буква h не читается, первый звук гласный — an.' },
      { q: 'Can I have ___ glass of water?', o: ['a', 'an', 'the'], a: 0, e: 'Один, какой-нибудь стакан, согласный звук — a.' },
      { q: 'I live in ___ Russia.', o: ['a', 'the', '— (без артикля)'], a: 2, e: 'С большинством стран артикль не нужен.' },
    ],
  },
  {
    id: 'polite', icon: '🙏', title: 'Вежливые просьбы',
    sub: 'Can I…? Could you…? I’d like…',
    body: `
<p>В английском просьба без вежливой обёртки звучит грубо. «Give me water» — почти приказ. Используй эти конструкции:</p>
<table class="gtable">
<tr><th>Конструкция</th><th>Когда</th><th>Пример</th></tr>
<tr><td><b>Can I have…?</b></td><td>попросить что-то себе</td><td>Can I have a coffee?</td></tr>
<tr><td><b>Could I…?</b></td><td>то же, но вежливее</td><td>Could I pay by card?</td></tr>
<tr><td><b>Could you…?</b></td><td>попросить человека что-то сделать</td><td>Could you help me?</td></tr>
<tr><td><b>I'd like…</b></td><td>«я бы хотел(а)» — заказ</td><td>I'd like a window seat.</td></tr>
<tr><td><b>Would you like…?</b></td><td>предложение (вам говорят)</td><td>Would you like some tea?</td></tr>
</table>
<div class="tip">💡 После can/could/would глагол идёт <b>без to</b>: Could you <b>help</b> me? (не «to help»). А после I'd like — <b>с to</b>, если дальше действие: I'd like <b>to order</b>.</div>`,
    examples: [
      ['Could you help me, please?', 'Не могли бы вы мне помочь?'],
      ["I'd like to order.", 'Я бы хотел(а) сделать заказ.'],
      ['Can I have the menu, please?', 'Можно меню, пожалуйста?'],
      ['Would you like a bag?', 'Вам нужен пакет?'],
    ],
    quiz: [
      { q: 'Самая вежливая просьба к официанту:', o: ['Give me the bill.', 'Could I have the bill, please?', 'I want bill.'], a: 1, e: 'Could I have…, please? — вежливо и естественно.' },
      { q: 'Could you ___ me?', o: ['to help', 'helping', 'help'], a: 2, e: 'После could глагол без to.' },
      { q: "I'd like ___ a table for tonight.", o: ['book', 'to book', 'booking'], a: 1, e: "После I'd like действие идёт с to." },
      { q: '«Would you like some coffee?» — это…', o: ['просьба', 'предложение', 'приказ'], a: 1, e: 'Would you like…? — вам что-то предлагают.' },
      { q: 'Как вежливо ответить «Да, пожалуйста»?', o: ['Yes, please.', 'Yes, you are welcome.', 'Yes, sorry.'], a: 0, e: "Yes, please — на предложение. You're welcome — ответ на спасибо." },
    ],
  },
  {
    id: 'questions', icon: '❓', title: 'Как задавать вопросы',
    sub: 'Do / does и вопросительные слова',
    body: `
<p>Если в предложении нет am/is/are или can, для вопроса нужен <b>помощник do / does</b>. Он встаёт в начало, а основной глагол остаётся в простой форме.</p>
<div class="formula"><span>(Вопр. слово)</span> + <span>do / does</span> + <span>кто</span> + <span>глагол</span> + …?</div>
<ul><li><i>You speak English.</i> → <b>Do</b> you speak English?</li>
<li><i>The bus goes to the airport.</i> → <b>Does</b> the bus <b>go</b> to the airport?</li></ul>
<p><b>Does</b> — для he / she / it (в т. ч. «автобус», «магазин»), <b>do</b> — для остальных.</p>
<table class="gtable">
<tr><td><b>Where</b> — где, куда</td><td><b>What</b> — что, какой</td></tr>
<tr><td><b>When / What time</b> — когда, во сколько</td><td><b>How much</b> — сколько стоит</td></tr>
<tr><td><b>How</b> — как</td><td><b>How long</b> — как долго</td></tr>
<tr><td><b>Which</b> — какой (из)</td><td><b>Why</b> — почему</td></tr>
</table>
<div class="tip">💡 С to be и can помощник не нужен: <i>Where <b>is</b> the hotel? <b>Can</b> I pay by card?</i></div>`,
    examples: [
      ['Do you speak English?', 'Вы говорите по-английски?'],
      ['Does this bus go to the center?', 'Этот автобус идёт в центр?'],
      ['What time does the shop open?', 'Во сколько открывается магазин?'],
      ['How much does it cost?', 'Сколько это стоит?'],
    ],
    quiz: [
      { q: '___ you have a map?', o: ['Does', 'Do', 'Are'], a: 1, e: 'You → do.' },
      { q: '___ this train stop in Oxford?', o: ['Do', 'Is', 'Does'], a: 2, e: 'This train — «он», значит does.' },
      { q: 'What time ___ the museum close?', o: ['does', 'do', 'is'], a: 0, e: 'The museum — «он», does + close.' },
      { q: 'Выбери правильный вопрос:', o: ['Where the station is?', 'Where is the station?', 'Where does the station?'], a: 1, e: 'С to be: вопросительное слово + is + подлежащее.' },
      { q: 'Как спросить цену?', o: ['How many is it?', 'How much is it?', 'What much is it?'], a: 1, e: 'Про цену — how much.' },
    ],
  },
  {
    id: 'there-is', icon: '📍', title: 'There is / There are',
    sub: '«Здесь есть…», «Тут находится…»',
    body: `
<p>Когда хотим сказать, что что-то <b>где-то есть / существует</b>, используем there is (одно) и there are (много).</p>
<ul><li><b>There is</b> a pharmacy on the corner. — На углу есть аптека.</li>
<li><b>There are</b> two restaurants in the hotel. — В отеле два ресторана.</li></ul>
<p><b>Вопрос:</b> <i>Is there</i> a bank near here? / <i>Are there</i> any free seats?<br>
<b>Отрицание:</b> <i>There isn't</i> any hot water. / <i>There aren't</i> any towels.</p>
<div class="tip">💡 Русское «Здесь есть Wi-Fi?» — это <b>Is there Wi-Fi here?</b>, а не «Here is Wi-Fi?».</div>`,
    examples: [
      ['Is there an ATM near here?', 'Здесь рядом есть банкомат?'],
      ['There is a problem with my room.', 'С моим номером проблема.'],
      ["There aren't any towels.", 'Здесь нет полотенец.'],
    ],
    quiz: [
      { q: '___ a supermarket near the hotel?', o: ['Is there', 'There is', 'Are there'], a: 0, e: 'Вопрос про один предмет — Is there.' },
      { q: 'There ___ three bags.', o: ['is', 'are', 'be'], a: 1, e: 'Много сумок — are.' },
      { q: '«В номере нет мыла»:', o: ["There isn't any soap in the room.", "Isn't soap in room.", 'Soap no in the room.'], a: 0, e: "There isn't any… — «здесь нет»." },
      { q: '___ any free tables?', o: ['Is there', 'Are there', 'There are'], a: 1, e: 'Tables — множественное число, вопрос — Are there.' },
      { q: '«Здесь есть Wi-Fi?»', o: ['Here is Wi-Fi?', 'Is there Wi-Fi here?', 'Have Wi-Fi here?'], a: 1, e: 'Is there … here?' },
    ],
  },
  {
    id: 'present', icon: '⏱️', title: 'Настоящее время',
    sub: 'Present Simple и «прямо сейчас»',
    body: `
<p><b>Present Simple</b> — факты, привычки, расписание. Для he / she / it добавляем <b>-s</b>.</p>
<ul><li>I <b>work</b> in Moscow. — Я работаю в Москве.</li>
<li>The shop <b>opens</b> at 9. — Магазин открывается в 9.</li></ul>
<p>Отрицание: <i>I <b>don't</b> eat meat. It <b>doesn't</b> work.</i></p>
<p><b>Present Continuous</b> — то, что происходит <b>прямо сейчас</b>: am / is / are + глагол с <b>-ing</b>.</p>
<ul><li>I<b>'m looking</b> for the station. — Я ищу вокзал.</li>
<li>We<b>'re waiting</b> for a taxi. — Мы ждём такси.</li></ul>
<div class="tip">💡 «Я просто смотрю» в магазине — <b>I'm just looking</b>, потому что это происходит сейчас.</div>`,
    examples: [
      ["I'm looking for the train station.", 'Я ищу железнодорожный вокзал.'],
      ['The bus leaves at 8 am.', 'Автобус отправляется в 8 утра.'],
      ["The shower doesn't work.", 'Душ не работает.'],
      ["I don't eat meat.", 'Я не ем мясо.'],
    ],
    quiz: [
      { q: 'The museum ___ at 10 am.', o: ['open', 'opens', 'is open at'], a: 1, e: 'Расписание, it → opens.' },
      { q: 'Sorry, I ___ for the exit.', o: ['look', "'m looking", 'looks'], a: 1, e: 'Прямо сейчас — Present Continuous.' },
      { q: 'The TV ___ work.', o: ["don't", "isn't", "doesn't"], a: 2, e: 'It → doesn\'t + глагол.' },
      { q: 'I ___ meat, I\'m vegetarian.', o: ["don't eat", "doesn't eat", 'not eat'], a: 0, e: "I → don't." },
      { q: 'We ___ for our friends.', o: ['are waiting', 'is waiting', 'waits'], a: 0, e: 'We are + -ing.' },
    ],
  },
  {
    id: 'past', icon: '⏪', title: 'Прошедшее время',
    sub: 'Past Simple: что случилось',
    body: `
<p>Чтобы рассказать, что произошло (потерял(а), забронировал(а), приехал(а)), используем <b>Past Simple</b>. Правильные глаголы получают окончание <b>-ed</b>:</p>
<ul><li>book → <b>booked</b>, arrive → <b>arrived</b>, call → <b>called</b></li></ul>
<p>Неправильные глаголы нужно запомнить. Самые нужные в поездке:</p>
<table class="gtable">
<tr><td>lose → <b>lost</b> (потерять)</td><td>leave → <b>left</b> (оставить, уехать)</td></tr>
<tr><td>buy → <b>bought</b> (купить)</td><td>forget → <b>forgot</b> (забыть)</td></tr>
<tr><td>pay → <b>paid</b> (заплатить)</td><td>have → <b>had</b> (иметь)</td></tr>
<tr><td>go → <b>went</b> (пойти, поехать)</td><td>take → <b>took</b> (взять)</td></tr>
</table>
<p>Вопрос и отрицание — с помощником <b>did</b>, а глагол возвращается в начальную форму: <i><b>Did</b> you <b>book</b>? I <b>didn't pay</b>.</i></p>
<div class="tip">💡 «Меня обокрали» — <b>My wallet was stolen</b> (дословно «мой кошелёк был украден»).</div>`,
    examples: [
      ['I lost my passport.', 'Я потерял(а) паспорт.'],
      ['I booked a room online.', 'Я забронировал(а) номер онлайн.'],
      ['I left my bag in the taxi.', 'Я оставил(а) сумку в такси.'],
      ["I didn't order this.", 'Я это не заказывал(а).'],
    ],
    quiz: [
      { q: 'I ___ my phone yesterday.', o: ['lose', 'lost', 'losed'], a: 1, e: 'Lose — неправильный глагол: lost.' },
      { q: 'We ___ a room for two nights.', o: ['booked', 'book', 'bookt'], a: 0, e: 'Правильный глагол + ed.' },
      { q: '___ you pay for the tickets?', o: ['Do', 'Did', 'Was'], a: 1, e: 'Вопрос в прошедшем — did.' },
      { q: 'I didn\'t ___ this dish.', o: ['ordered', 'order', 'orders'], a: 1, e: 'После didn\'t — начальная форма.' },
      { q: 'I ___ my bag in the taxi.', o: ['leaved', 'left', 'leave'], a: 1, e: 'Leave → left.' },
    ],
  },
  {
    id: 'future', icon: '🔮', title: 'Будущее время',
    sub: 'Will и going to',
    body: `
<p><b>Going to</b> — планы, которые уже решены: <i>We're <b>going to</b> visit the museum tomorrow.</i></p>
<p><b>Will</b> — решение в момент разговора, обещание, предположение. Очень частое в кафе и магазине:</p>
<ul><li>I<b>'ll take</b> it. — Я возьму это (решил(а) прямо сейчас).</li>
<li>I<b>'ll have</b> the soup. — Мне суп.</li>
<li>It <b>will</b> be cold tomorrow. — Завтра будет холодно.</li></ul>
<p>Отрицание: <i>won't</i> (= will not). Вопрос: <i>Will it rain?</i></p>
<div class="tip">💡 После will глагол без to: I'll <b>call</b> you (не «I'll to call»).</div>`,
    examples: [
      ["I'll take it.", 'Я возьму это.'],
      ["I'll have a coffee, please.", 'Мне кофе, пожалуйста.'],
      ["We're going to stay for a week.", 'Мы собираемся остаться на неделю.'],
      ['Will it be ready tomorrow?', 'Это будет готово завтра?'],
    ],
    quiz: [
      { q: 'Официант: What would you like? Ты: «I ___ the pasta.»', o: ["'ll have", 'am going to have', 'have'], a: 0, e: 'Решение прямо сейчас — will.' },
      { q: 'We ___ visit London next month. (давно запланировали)', o: ['will to', 'are going to', 'going to'], a: 1, e: 'План — be going to.' },
      { q: 'I\'ll ___ you later.', o: ['to call', 'call', 'calling'], a: 1, e: 'После will — глагол без to.' },
      { q: 'Отрицание от will:', o: ["willn't", "won't", "don't will"], a: 1, e: 'Will not = won\'t.' },
      { q: '«Это дорого, но я его возьму»: It\'s expensive, but I ___ it.', o: ["'ll take", 'take', 'took'], a: 0, e: 'Решение в момент речи — will.' },
    ],
  },
  {
    id: 'prepositions', icon: '🧭', title: 'Предлоги места и времени',
    sub: 'in / on / at и как объяснить, где что',
    body: `
<table class="gtable">
<tr><th></th><th>Место</th><th>Время</th></tr>
<tr><td><b>in</b></td><td>внутри, в городе/стране: in the room, in Paris</td><td>месяцы, годы, части дня: in May, in the morning</td></tr>
<tr><td><b>on</b></td><td>на поверхности, на улице, этаже: on the table, on Main Street, on the 3rd floor</td><td>дни, даты: on Monday, on 5 June</td></tr>
<tr><td><b>at</b></td><td>в точке: at the airport, at the gate, at the corner</td><td>точное время: at 7 pm, at night</td></tr>
</table>
<p>Полезные предлоги места:</p>
<ul><li><b>next to</b> — рядом с; <b>opposite</b> — напротив; <b>between</b> — между</li>
<li><b>behind</b> — за, позади; <b>in front of</b> — перед; <b>near</b> — недалеко от</li></ul>
<div class="tip">💡 «На углу» — <b>on</b> the corner (улицы) или <b>at</b> the corner (в точке). Оба варианта встречаются.</div>`,
    examples: [
      ["I'll meet you at the gate.", 'Встретимся у выхода на посадку.'],
      ['The pharmacy is next to the bank.', 'Аптека рядом с банком.'],
      ['Breakfast is at 8 am.', 'Завтрак в 8 утра.'],
      ['Our room is on the fifth floor.', 'Наш номер на пятом этаже.'],
    ],
    quiz: [
      { q: 'My flight is ___ 6 pm.', o: ['in', 'on', 'at'], a: 2, e: 'Точное время — at.' },
      { q: 'We arrive ___ Monday.', o: ['on', 'in', 'at'], a: 0, e: 'Дни недели — on.' },
      { q: 'The café is ___ the hotel and the bank.', o: ['next', 'between', 'opposite to'], a: 1, e: 'Между двумя объектами — between.' },
      { q: 'Our room is ___ the second floor.', o: ['in', 'at', 'on'], a: 2, e: 'Этаж — on.' },
      { q: 'I\'m ___ the airport now.', o: ['at', 'on', 'to'], a: 0, e: 'Нахождение в точке — at.' },
    ],
  },
  {
    id: 'much-many', icon: '🔢', title: 'Much, many, some, any',
    sub: 'Количество и «немного»',
    body: `
<p><b>Many</b> — с тем, что можно посчитать (bags, tickets). <b>Much</b> — с тем, что не считается (water, money, time).</p>
<ul><li>How <b>many</b> bags do you have? — Сколько у вас сумок?</li>
<li>How <b>much</b> money do I need? — Сколько денег мне нужно?</li>
<li>How <b>much</b> is it? — Сколько стоит? (про цену — всегда much)</li></ul>
<p><b>Some</b> — «немного, несколько» в утверждениях и просьбах. <b>Any</b> — в вопросах и отрицаниях.</p>
<ul><li>I'd like <b>some</b> water. / Could I have <b>some</b> bread?</li>
<li>Do you have <b>any</b> free rooms? / We don't have <b>any</b> cash.</li></ul>`,
    examples: [
      ['How many nights?', 'Сколько ночей?'],
      ['How much is the ticket?', 'Сколько стоит билет?'],
      ['Do you have any rooms for tonight?', 'У вас есть номера на сегодня?'],
      ["I'd like some tea, please.", 'Я бы хотел(а) чаю, пожалуйста.'],
    ],
    quiz: [
      { q: 'How ___ suitcases do you have?', o: ['much', 'many', 'any'], a: 1, e: 'Чемоданы можно посчитать — many.' },
      { q: 'How ___ is a ticket to Rome?', o: ['many', 'much', 'some'], a: 1, e: 'Про цену — how much.' },
      { q: 'Do you have ___ vegetarian dishes?', o: ['some', 'any', 'much'], a: 1, e: 'В вопросе — any.' },
      { q: "I'd like ___ water, please.", o: ['any', 'many', 'some'], a: 2, e: 'В просьбе — some.' },
      { q: "We don't have ___ time.", o: ['many', 'much', 'some'], a: 1, e: 'Time неисчисляемое + отрицание — much.' },
    ],
  },
];

/* Преобразуем компактные массивы в объекты */
UNITS.forEach(u => {
  u.words = u.words.map(([en, ru, ex]) => ({ en, ru, ex, unit: u.id }));
  u.phrases = u.phrases.map(([en, ru]) => ({ en, ru, unit: u.id }));
  u.dialog = u.dialog.map(([who, en, ru]) => ({ who, en, ru }));
});
const ALL_WORDS = UNITS.flatMap(u => u.words);
const ALL_PHRASES = UNITS.flatMap(u => u.phrases);
