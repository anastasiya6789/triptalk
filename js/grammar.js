/* =========================================================
   ГРАММАТИКА
   Каждая тема: body (HTML-объяснение), examples, quiz.
   Вопросы теста бывают двух видов:
   • выбор:  { q: 'вопрос', o: ['вариант', ...], a: индекс, e: 'пояснение' }
   • сборка: { b: 'русское предложение', a: 'English answer' | [варианты], x: ['лишние', 'слова'], e: 'пояснение' }
   ========================================================= */

const GRAMMAR_GROUPS = [
  { id: 'base', title: 'Фундамент', sub: 'Без этого не построить ни одного предложения' },
  { id: 'ask', title: 'Вопросы и просьбы', sub: 'Самое нужное в поездке' },
  { id: 'tenses', title: 'Времена', sub: 'Разбираемся спокойно и по порядку' },
  { id: 'extra', title: 'Полезные детали', sub: 'Предлоги, количество, «могу/должен»' },
];

const GRAMMAR = [
  /* ---------------- ФУНДАМЕНТ ---------------- */
  {
    id: 'pronouns', group: 'base', icon: '🙋', title: 'Местоимения: I, you, he, she, it',
    sub: 'Кто делает действие — и почему это так важно',
    body: `
<p>Любое английское предложение начинается с того, <b>кто</b> действует. Поэтому сначала выучим «кто» — местоимения.</p>
<table class="gtable">
<tr><th>Русский</th><th>English</th><th>Когда</th></tr>
<tr><td>я</td><td><b>I</b></td><td>всегда с большой буквы</td></tr>
<tr><td>ты / вы</td><td><b>you</b></td><td>одно слово и для «ты», и для «вы», и для «вы все»</td></tr>
<tr><td>он</td><td><b>he</b></td><td>только о человеке-мужчине</td></tr>
<tr><td>она</td><td><b>she</b></td><td>только о человеке-женщине</td></tr>
<tr><td>оно / это</td><td><b>it</b></td><td>все <b>предметы, места, животные</b>, погода, время</td></tr>
<tr><td>мы</td><td><b>we</b></td><td></td></tr>
<tr><td>они</td><td><b>they</b></td><td>и люди, и предметы во множественном числе</td></tr>
</table>
<div class="tip">💡 Главное отличие от русского: в русском «автобус — <b>он</b>», «гостиница — <b>она</b>». В английском у предметов нет рода — это всегда <b>it</b>.<br><i>The bus is late. <b>It</b> is always late.</i> — Автобус опаздывает. Он всегда опаздывает.</div>

<h4>Почему he / she / it — особая группа</h4>
<p>Запомни эту тройку: <b>he, she, it</b> — это «третье лицо, одна штука». С ними глаголы меняются:</p>
<ul>
<li>to be: I <b>am</b>, you <b>are</b>, но he / she / it <b>is</b></li>
<li>обычные глаголы получают <b>-s</b>: I work → she work<b>s</b>, I go → it go<b>es</b></li>
<li>в вопросах и отрицаниях: <b>does / doesn't</b> вместо do / don't</li>
</ul>
<p>Всё, что можно заменить на he / she / it (the hotel, my friend, the train, Anna), работает так же: <i>The train <b>leaves</b> at 5. Anna <b>is</b> from Moscow.</i></p>

<h4>«Меня», «его», «мой», «его»…</h4>
<table class="gtable">
<tr><th>Кто</th><th>Кого / кому</th><th>Чей</th></tr>
<tr><td>I</td><td>me</td><td>my</td></tr>
<tr><td>you</td><td>you</td><td>your</td></tr>
<tr><td>he</td><td>him</td><td>his</td></tr>
<tr><td>she</td><td>her</td><td>her</td></tr>
<tr><td>it</td><td>it</td><td>its</td></tr>
<tr><td>we</td><td>us</td><td>our</td></tr>
<tr><td>they</td><td>them</td><td>their</td></tr>
</table>
<p><i>Help <b>me</b>!</i> — Помогите мне! &nbsp;·&nbsp; <i>Call <b>him</b>.</i> — Позвоните ему. &nbsp;·&nbsp; <i>This is <b>my</b> passport.</i> — Это мой паспорт.</p>
<div class="tip">💡 В английском «чей» почти всегда говорят: <i>I lost <b>my</b> phone</i> («я потерял <b>свой</b> телефон»), хотя по-русски «свой» часто опускаем.</div>`,
    mistakes: [
      ['Is very good.', 'It is very good.', 'Подлежащее обязательно.'],
      ['The bus, he is late.', 'The bus is late.', 'Не повторяем подлежащее, и автобус — it, не he.'],
      ['Help I!', 'Help me!', '«Помогите мне» — форма me.'],
      ['I lost phone.', 'I lost my phone.', 'Нужно «чей»: my.'],
    ],
    examples: [
      ['The hotel is nice. It is near the beach.', 'Отель хороший. Он рядом с пляжем.'],
      ['She is my friend. Her name is Kate.', 'Она моя подруга. Её зовут Кейт.'],
      ['Can you help us?', 'Вы можете нам помочь?'],
      ['They are from Spain.', 'Они из Испании.'],
    ],
    quiz: [
      { q: 'Поезд опаздывает. ___ is late.', o: ['He', 'It', 'She'], a: 1, e: 'Поезд — предмет, значит it.' },
      { q: 'Позвоните ей: Call ___, please.', o: ['she', 'her', 'hers'], a: 1, e: 'Кому? → her.' },
      { q: 'Это мой паспорт: This is ___ passport.', o: ['me', 'I', 'my'], a: 2, e: 'Чей? → my.' },
      { q: 'Какие местоимения «особые» (с ними is и -s у глаголов)?', o: ['I, you, we', 'he, she, it', 'we, they'], a: 1, e: 'He / she / it — третье лицо, одна штука.' },
      { b: 'Помогите нам, пожалуйста!', a: 'Help us, please!', x: ['we', 'our'], e: 'Кому помочь? → us.' },
      { b: 'Это мой чемодан.', a: ['This is my suitcase.', 'It is my suitcase.'], x: ['me', 'I'], e: 'Чей чемодан → my.' },
      { q: '___ are from Russia. (Мы)', o: ['Us', 'We', 'Our'], a: 1, e: 'Кто? → we.' },
    ],
  },
  {
    id: 'to-be', group: 'base', icon: '🟰', title: 'Глагол to be: am / is / are',
    sub: 'Невидимое русское «есть», которое в английском обязательно',
    body: `
<p>По-русски мы говорим «Я турист», «Отель далеко», «Мне холодно» — <b>без глагола</b>. В английском так нельзя: в каждом предложении должен быть глагол. Если другого глагола нет — ставим <b>to be</b> («быть, являться, находиться»).</p>
<div class="formula"><span>Кто</span> + <span>am / is / are</span> + <span>кто / какой / где</span></div>
<table class="gtable">
<tr><th>Кто</th><th>Форма</th><th>Коротко</th><th>Пример</th></tr>
<tr><td>I</td><td>am</td><td>I'm</td><td>I'm a tourist.</td></tr>
<tr><td>he / she / it</td><td>is</td><td>he's, she's, it's</td><td>It's expensive.</td></tr>
<tr><td>you / we / they</td><td>are</td><td>you're, we're, they're</td><td>We're hungry.</td></tr>
</table>

<h4>Когда нужен to be</h4>
<ul>
<li><b>Кто / что это:</b> <i>I am a student. This is my wife.</i></li>
<li><b>Какой:</b> <i>The room is small. I am tired.</i></li>
<li><b>Где:</b> <i>The toilet is on the left. We are at the airport.</i></li>
<li><b>Состояния, которые по-русски звучат «мне…»:</b> <i>I am cold</i> — мне холодно, <i>I am hungry</i> — я голоден, <i>I am late</i> — я опаздываю, <i>I am lost</i> — я заблудился.</li>
</ul>

<h4>Вопрос и отрицание</h4>
<p><b>Вопрос:</b> переставляем am / is / are <b>в начало</b>: <i>You are ready. → <b>Are</b> you ready?</i><br>
<b>Отрицание:</b> добавляем <b>not</b>: <i>I'm <b>not</b> sure. It <b>isn't</b> far. They <b>aren't</b> here.</i></p>

<h4>Прошедшее время</h4>
<p><b>was</b> — для I, he, she, it; &nbsp;<b>were</b> — для you, we, they.<br><i>The flight <b>was</b> late. We <b>were</b> tired.</i></p>
<div class="tip">⚠️ Самая частая ошибка русскоговорящих — ставить am/is/are вместе с обычным глаголом: ❌ <i>I am agree</i>, ❌ <i>She is work</i>. Если глагол уже есть (agree, work, like, want) — to be не нужен: ✅ <i>I agree. She works.</i></div>`,
    mistakes: [
      ['I hungry.', 'I am hungry.', 'Нет другого глагола → нужен am.'],
      ['Where the station?', 'Where is the station?', '«Где находится» → is.'],
      ['I am agree.', 'I agree.', 'agree — уже глагол, am не нужен.'],
      ['He are from Italy.', 'He is from Italy.', 'He → is.'],
    ],
    examples: [
      ["I'm a tourist.", 'Я турист.'],
      ['Is this the right gate?', 'Это правильный выход?'],
      ["The museum isn't far.", 'Музей недалеко.'],
      ["I'm cold.", 'Мне холодно.'],
      ['We were at the hotel.', 'Мы были в отеле.'],
    ],
    quiz: [
      { q: 'I ___ from Russia.', o: ['is', 'am', 'are'], a: 1, e: 'I → am.' },
      { q: 'Where ___ the toilets?', o: ['is', 'am', 'are'], a: 2, e: 'Toilets — много, значит are.' },
      { q: 'Какое предложение правильное?', o: ['I am agree with you.', 'I agree with you.', 'I is agree.'], a: 1, e: 'Agree — это уже глагол.' },
      { b: 'Мне холодно.', a: ["I am cold.", "I'm cold."], x: ['me', 'is'], e: 'По-английски «я холодный» — I am cold.' },
      { b: 'Отель недалеко.', a: ["The hotel is not far.", "The hotel isn't far."], x: ['are', 'no'], e: 'The hotel = it → is + not.' },
      { q: '___ this seat free?', o: ['Is', 'Are', 'Do'], a: 0, e: 'Вопрос с to be: Is в начале.' },
      { q: 'The flight ___ late yesterday.', o: ['is', 'were', 'was'], a: 2, e: 'Прошлое + it → was.' },
      { b: 'Вы готовы?', a: 'Are you ready?', x: ['is', 'do'], e: 'Are переезжает в начало.' },
    ],
  },
  {
    id: 'articles', group: 'base', icon: '🅰️', title: 'Артикли a / an / the',
    sub: 'Когда «a», когда «the», а когда ничего',
    body: `
<p>В русском артиклей нет, поэтому они кажутся лишними. Но для англичанина они как окончания для нас: без них речь звучит «сломанно». Есть всего три варианта — разберём, как выбрать.</p>

<h4>1. A / an — «один, какой-то»</h4>
<p>Ставим перед <b>одним</b> предметом, который можно посчитать, когда он <b>не конкретный</b> или упоминается впервые.</p>
<ul>
<li><i>I need <b>a</b> taxi.</i> — Мне нужно такси (любое).</li>
<li><i>Is there <b>an</b> ATM here?</i> — Здесь есть банкомат (какой-нибудь)?</li>
</ul>
<p><b>a</b> — перед согласным <b>звуком</b>: a ticket, a hotel, a university («ю»).<br>
<b>an</b> — перед гласным <b>звуком</b>: an apple, an hour (h не читается), an umbrella.</p>

<h4>2. The — «тот самый»</h4>
<p>Когда обоим понятно, <b>о каком именно</b> предмете речь:</p>
<ul>
<li>уже упоминали: <i>I booked a room. <b>The</b> room is nice.</i></li>
<li>он один такой в этой ситуации: <i><b>the</b> airport, <b>the</b> station, <b>the</b> bill</i> (наш счёт), <i><b>the</b> sea</i></li>
<li>с превосходной степенью и порядковыми: <i><b>the</b> nearest pharmacy, <b>the</b> first floor, <b>the</b> next train</i></li>
</ul>

<h4>3. Без артикля</h4>
<ul>
<li>имена, города, большинство стран: <i>Anna, London, Russia</i></li>
<li>множественное число «в общем»: <i>I like museums.</i></li>
<li>неисчисляемое «в общем»: <i>water, money, coffee</i> — <i>I need water.</i></li>
<li>если уже есть my / your / this: <i><b>my</b> bag</i> (не «the my bag»)</li>
<li>устойчивые выражения: <i>by bus, by taxi, at home, go home</i></li>
</ul>
<table class="gtable">
<tr><th>Вопрос себе</th><th>Ответ</th></tr>
<tr><td>Понятно, какой именно?</td><td>Да → <b>the</b></td></tr>
<tr><td>Один из многих, считается?</td><td>Да → <b>a / an</b></td></tr>
<tr><td>Имя, много, «вообще», есть my/this?</td><td>→ <b>ничего</b></td></tr>
</table>`,
    mistakes: [
      ['I need taxi.', 'I need a taxi.', 'Одно такси, любое → a.'],
      ['Where is nearest bank?', 'Where is the nearest bank?', 'Самый ближайший — конкретный → the.'],
      ['I want a water.', 'I want water. / I want a bottle of water.', 'Воду не считают → без a.'],
      ['an hotel', 'a hotel', 'В hotel звук «х» согласный.'],
    ],
    examples: [
      ['I need a taxi.', 'Мне нужно такси.'],
      ['The taxi is here.', 'Такси (которое мы ждали) приехало.'],
      ['Is there an ATM near here?', 'Здесь рядом есть банкомат?'],
      ['We go to the beach by bus.', 'Мы ездим на пляж на автобусе.'],
    ],
    quiz: [
      { q: 'I want to buy ___ umbrella.', o: ['a', 'an', 'the'], a: 1, e: 'Гласный звук u → an.' },
      { q: 'Where is ___ nearest pharmacy?', o: ['a', 'an', 'the'], a: 2, e: 'Nearest — конкретная → the.' },
      { q: 'We waited for ___ hour.', o: ['a', 'an', '—'], a: 1, e: 'H не читается → an.' },
      { q: 'I live in ___ Moscow.', o: ['a', 'the', '— (ничего)'], a: 2, e: 'С городами артикль не нужен.' },
      { b: 'Мне нужен врач.', a: 'I need a doctor.', x: ['the', 'an'], e: 'Любой врач → a.' },
      { b: 'Где автобусная остановка?', a: 'Where is the bus stop?', x: ['a', 'are'], e: 'Конкретная, ближайшая → the.' },
      { q: 'Can I have ___ bill, please?', o: ['a', 'the', '—'], a: 1, e: 'Наш счёт, понятно какой → the.' },
    ],
  },
  {
    id: 'word-order', group: 'base', icon: '🧱', title: 'Порядок слов',
    sub: 'Как правильно ставить слова в предложении',
    body: `
<p>В русском можно сказать «Я люблю кофе», «Кофе я люблю», «Люблю я кофе». В английском <b>порядок слов строгий</b>, и именно он показывает, кто что делает. Хорошая новость: схема почти всегда одна.</p>
<div class="formula"><span>Кто</span> + <span>действие</span> + <span>что / кого</span> + <span>где</span> + <span>когда</span></div>
<table class="gtable">
<tr><th>Кто</th><th>Действие</th><th>Что</th><th>Где</th><th>Когда</th></tr>
<tr><td>I</td><td>need</td><td>a taxi</td><td>—</td><td>now</td></tr>
<tr><td>We</td><td>have</td><td>a reservation</td><td>at this hotel</td><td>tonight</td></tr>
<tr><td>She</td><td>bought</td><td>souvenirs</td><td>in the shop</td><td>yesterday</td></tr>
</table>

<h4>Правило 1. Подлежащее есть всегда</h4>
<p>«Холодно» → <i><b>It</b> is cold.</i> «Идёт дождь» → <i><b>It</b> is raining.</i> «Далеко» → <i><b>It</b> is far.</i></p>

<h4>Правило 2. Описание — перед словом</h4>
<p>Прилагательное стоит <b>до</b> существительного: <i>a <b>big</b> room, a <b>cheap</b> hotel</i>. И существительное может описывать другое: <i><b>bus</b> stop</i> (автобусная остановка), <i><b>window</b> seat</i> (место у окна), <i><b>check-in</b> desk</i> (стойка регистрации). Главное слово — <b>последнее</b>.</p>

<h4>Правило 3. Отрицание — перед глаголом</h4>
<ul>
<li>с to be: <i>I am <b>not</b> ready.</i></li>
<li>с обычными глаголами: <i>I <b>don't</b> eat meat. It <b>doesn't</b> work.</i></li>
<li>с can: <i>I <b>can't</b> find my bag.</i></li>
</ul>

<h4>Правило 4. «Часто / всегда» — перед глаголом</h4>
<p><i>I <b>usually</b> drink tea. We <b>always</b> take a taxi.</i> Но после to be: <i>The bus is <b>always</b> late.</i></p>`,
    mistakes: [
      ['Coffee I like.', 'I like coffee.', 'Кто → действие → что.'],
      ['Is cold today.', "It's cold today.", 'Нужно подлежащее it.'],
      ['A room big.', 'A big room.', 'Прилагательное перед словом.'],
      ['I yesterday bought souvenirs.', 'I bought souvenirs yesterday.', 'Время — в конце.'],
    ],
    examples: [
      ['I need a taxi now.', 'Мне нужно такси сейчас.'],
      ['We have a reservation at this hotel.', 'У нас бронь в этом отеле.'],
      ["It's cold today.", 'Сегодня холодно.'],
      ["I don't eat meat.", 'Я не ем мясо.'],
    ],
    quiz: [
      { b: 'Мне нужен врач.', a: 'I need a doctor.', x: ['me', 'is'], e: 'Кто (I) + действие (need) + что (a doctor).' },
      { b: 'Сегодня жарко.', a: ["It is hot today.", "It's hot today."], x: ['today is', 'are'], e: 'Подлежащее обязательно — it.' },
      { q: '«Дешёвый отель»:', o: ['a hotel cheap', 'a cheap hotel', 'cheap a hotel'], a: 1, e: 'Описание стоит перед словом.' },
      { b: 'Мы купили сувениры вчера.', a: 'We bought souvenirs yesterday.', x: ['buy', 'at'], e: 'Кто + действие + что + когда.' },
      { q: '«Автобусная остановка»:', o: ['stop bus', 'bus stop', 'stop of bus'], a: 1, e: 'Главное слово — последнее: stop.' },
      { b: 'Я не ем мясо.', a: ["I don't eat meat.", 'I do not eat meat.'], x: ['no', 'am'], e: "Отрицание: don't перед глаголом." },
    ],
  },

  /* ---------------- ВОПРОСЫ И ПРОСЬБЫ ---------------- */
  {
    id: 'questions', group: 'ask', icon: '❓', title: 'Как задавать вопросы',
    sub: 'Две схемы, которые покрывают почти все вопросы',
    body: `
<p>В русском вопрос отличается только интонацией: «Вы говорите по-английски?». В английском <b>меняется порядок слов</b>. Есть две схемы.</p>

<h4>Схема 1. Есть am / is / are или can → переставляем вперёд</h4>
<p><i>You <b>are</b> ready. → <b>Are</b> you ready?</i><br>
<i>I <b>can</b> pay by card. → <b>Can</b> I pay by card?</i></p>

<h4>Схема 2. Обычный глагол → нужен помощник do / does / did</h4>
<p>Помощник ставим в начало, а сам глагол остаётся в начальной форме. Помощник <b>не переводится</b> — это просто «знак вопроса».</p>
<div class="formula"><span>(Вопр. слово)</span> + <span>do / does / did</span> + <span>кто</span> + <span>глагол</span> + …?</div>
<ul>
<li><i>You speak English. → <b>Do</b> you speak English?</i></li>
<li><i>The bus goes to the airport. → <b>Does</b> the bus <b>go</b> to the airport?</i> (s ушла к does!)</li>
<li><i>You booked a room. → <b>Did</b> you <b>book</b> a room?</i></li>
</ul>
<p><b>does</b> — для he / she / it, <b>do</b> — для остальных, <b>did</b> — для прошлого (для всех).</p>

<h4>Вопросительные слова — в самое начало</h4>
<table class="gtable">
<tr><td><b>Where</b> — где, куда</td><td><b>What</b> — что, какой</td></tr>
<tr><td><b>When / What time</b> — когда, во сколько</td><td><b>How much</b> — сколько стоит</td></tr>
<tr><td><b>How</b> — как</td><td><b>How long</b> — как долго</td></tr>
<tr><td><b>Which</b> — какой (из)</td><td><b>Why</b> — почему</td></tr>
<tr><td><b>Who</b> — кто</td><td><b>How many</b> — сколько (штук)</td></tr>
</table>
<p><i><b>Where is</b> the hotel?</i> (схема 1) &nbsp;·&nbsp; <i><b>What time does</b> the shop <b>open</b>?</i> (схема 2)</p>`,
    mistakes: [
      ['You speak English?', 'Do you speak English?', 'Нужен помощник do.'],
      ['Where the station is?', 'Where is the station?', 'Is — перед подлежащим.'],
      ['Does the bus goes…?', 'Does the bus go…?', '-s уходит к does.'],
      ['What time the shop opens?', 'What time does the shop open?', 'Нужен does.'],
    ],
    examples: [
      ['Do you speak English?', 'Вы говорите по-английски?'],
      ['Does this bus go to the center?', 'Этот автобус идёт в центр?'],
      ['What time does the shop open?', 'Во сколько открывается магазин?'],
      ['Where is the exit?', 'Где выход?'],
    ],
    quiz: [
      { q: '___ you have a map?', o: ['Does', 'Do', 'Are'], a: 1, e: 'Обычный глагол have + you → do.' },
      { q: '___ this train stop in Oxford?', o: ['Do', 'Is', 'Does'], a: 2, e: 'Train = it → does.' },
      { b: 'Где выход?', a: 'Where is the exit?', x: ['does', 'are'], e: 'Схема 1: Where + is + the exit.' },
      { b: 'Во сколько закрывается магазин?', a: 'What time does the shop close?', x: ['closes', 'is'], e: 'Схема 2: What time + does + the shop + close.' },
      { q: 'Выбери правильный вопрос:', o: ['Where the station is?', 'Where is the station?', 'Where does the station?'], a: 1, e: 'С to be — is вперёд.' },
      { b: 'Вы говорите по-русски?', a: 'Do you speak Russian?', x: ['are', 'does'], e: 'Do + you + speak.' },
      { q: 'Did you ___ a room?', o: ['booked', 'book', 'books'], a: 1, e: 'После did — начальная форма.' },
    ],
  },
  {
    id: 'polite', group: 'ask', icon: '🙏', title: 'Вежливые просьбы',
    sub: 'Can I…? Could you…? I’d like…',
    body: `
<p>По-русски «Дайте воды» в кафе звучит нормально. По-английски <i>Give me water</i> — почти грубость. Просьбу всегда «заворачивают» в вежливую конструкцию. Выучи эти пять — их хватит на всю поездку.</p>
<table class="gtable">
<tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>Can I have…?</b></td><td>Можно мне…?</td><td>Can I have a coffee?</td></tr>
<tr><td><b>Could I…?</b></td><td>То же, вежливее</td><td>Could I pay by card?</td></tr>
<tr><td><b>Could you…?</b></td><td>Не могли бы вы…? (просим человека)</td><td>Could you help me?</td></tr>
<tr><td><b>I'd like…</b></td><td>Я бы хотел(а)…</td><td>I'd like a window seat.</td></tr>
<tr><td><b>Would you like…?</b></td><td>Не хотите ли…? (предлагают вам)</td><td>Would you like some tea?</td></tr>
</table>

<h4>Как строится</h4>
<ul>
<li>После <b>can / could / would</b> глагол идёт <b>без to</b>: <i>Could you <b>help</b> me?</i> (не «to help»)</li>
<li>После <b>I'd like</b> — либо вещь: <i>I'd like <b>a coffee</b></i>, либо <b>to</b> + действие: <i>I'd like <b>to order</b></i></li>
<li><b>I'd</b> = I would. Это сокращение произносится «айд».</li>
<li>Добавляй <b>please</b> в конце — это всегда к месту.</li>
</ul>
<h4>Как отвечать</h4>
<p><i>Would you like some water?</i> → <b>Yes, please.</b> / <b>No, thank you.</b><br>
<i>Thank you!</i> → <b>You're welcome.</b> (это «пожалуйста» в ответ на спасибо)</p>`,
    mistakes: [
      ['Give me the bill.', 'Could I have the bill, please?', 'Прямой приказ звучит грубо.'],
      ['Could you to help me?', 'Could you help me?', 'После could — без to.'],
      ["I'd like order.", "I'd like to order.", 'Действие после I’d like — с to.'],
      ['Yes, you are welcome.', 'Yes, please.', "You're welcome — только в ответ на спасибо."],
    ],
    examples: [
      ['Could you help me, please?', 'Не могли бы вы мне помочь?'],
      ["I'd like to order.", 'Я бы хотел(а) сделать заказ.'],
      ['Can I have the menu, please?', 'Можно меню, пожалуйста?'],
      ['Would you like a bag?', 'Вам нужен пакет?'],
    ],
    quiz: [
      { q: 'Самая вежливая просьба к официанту:', o: ['Give me the bill.', 'Could I have the bill, please?', 'I want bill.'], a: 1, e: 'Could I have…, please? — вежливо и естественно.' },
      { q: 'Could you ___ me?', o: ['to help', 'helping', 'help'], a: 2, e: 'После could — глагол без to.' },
      { b: 'Не могли бы вы мне помочь?', a: 'Could you help me?', x: ['to', 'I'], e: 'Could you + глагол + me.' },
      { b: 'Я бы хотел(а) кофе, пожалуйста.', a: ["I'd like a coffee, please.", 'I would like a coffee, please.'], x: ['to', 'want'], e: "I'd like + вещь." },
      { q: "I'd like ___ a table for tonight.", o: ['book', 'to book', 'booking'], a: 1, e: "После I'd like действие — с to." },
      { q: 'Вам предлагают: «Would you like some tea?» Хочешь — отвечаешь:', o: ["Yes, you're welcome.", 'Yes, please.', 'Yes, sorry.'], a: 1, e: 'Yes, please — «да, пожалуйста».' },
    ],
  },
  {
    id: 'there-is', group: 'ask', icon: '📍', title: 'There is / There are',
    sub: '«Здесь есть…?», «Тут нет…»',
    body: `
<p>Когда хотим сказать, что что-то <b>где-то есть</b> (или нет), используем особую конструкцию. Дословно «там есть».</p>
<div class="formula"><span>There is</span> + <span>одно</span> + <span>где</span></div>
<div class="formula"><span>There are</span> + <span>много</span> + <span>где</span></div>
<ul>
<li><i><b>There is</b> a pharmacy on the corner.</i> — На углу есть аптека.</li>
<li><i><b>There are</b> two restaurants in the hotel.</i> — В отеле два ресторана.</li>
</ul>
<p><b>Вопрос</b> — меняем местами: <i><b>Is there</b> a bank near here? <b>Are there</b> any free seats?</i><br>
<b>Отрицание</b> — добавляем not (и обычно any): <i>There <b>isn't</b> any hot water. There <b>aren't</b> any towels.</i></p>
<div class="tip">💡 Русское «Здесь есть Wi-Fi?» — это <b>Is there Wi-Fi here?</b>, а не «Here is Wi-Fi?» и не «Have Wi-Fi?». А «В номере нет полотенец» — <b>There are no towels in the room.</b></div>
<p>Заметь: место (<i>here, in the room, near the hotel</i>) обычно стоит <b>в конце</b>.</p>`,
    mistakes: [
      ['Here is Wi-Fi?', 'Is there Wi-Fi here?', 'Вопрос о наличии — Is there.'],
      ['In the room is no towels.', 'There are no towels in the room.', 'Начинаем с There.'],
      ['There is two beds.', 'There are two beds.', 'Две кровати → are.'],
    ],
    examples: [
      ['Is there an ATM near here?', 'Здесь рядом есть банкомат?'],
      ['There is a problem with my room.', 'С моим номером проблема.'],
      ["There aren't any towels.", 'Тут нет полотенец.'],
    ],
    quiz: [
      { q: '___ a supermarket near the hotel?', o: ['Is there', 'There is', 'Are there'], a: 0, e: 'Вопрос про одно → Is there.' },
      { q: 'There ___ three bags.', o: ['is', 'are', 'be'], a: 1, e: 'Много → are.' },
      { b: 'Здесь есть Wi-Fi?', a: 'Is there Wi-Fi here?', x: ['have', 'are'], e: 'Is there … here?' },
      { b: 'С моим номером проблема.', a: 'There is a problem with my room.', x: ['are', 'have'], e: 'There is + a problem + with my room.' },
      { q: '___ any free tables?', o: ['Is there', 'Are there', 'There are'], a: 1, e: 'Tables — много, вопрос → Are there.' },
    ],
  },

  /* ---------------- ВРЕМЕНА ---------------- */
  {
    id: 'tenses-map', group: 'tenses', icon: '🗺️', title: 'Карта времён: без паники',
    sub: 'Почему их так много и какие реально нужны',
    body: `
<p>Говорят, в английском 12 времён. На деле это <b>3 времени</b> (прошлое, настоящее, будущее) × <b>несколько «видов»</b>. Для поездки хватит <b>пяти</b> форм. Вот они на одной карте:</p>
<table class="gtable">
<tr><th>Форма</th><th>Когда</th><th>Пример</th></tr>
<tr><td><b>Present Simple</b><br><small>настоящее простое</small></td><td>факты, привычки, расписание</td><td>The shop <b>opens</b> at 9.</td></tr>
<tr><td><b>Present Continuous</b><br><small>настоящее длительное</small></td><td>прямо сейчас, в процессе</td><td>I'<b>m looking</b> for my bag.</td></tr>
<tr><td><b>Past Simple</b><br><small>прошедшее простое</small></td><td>что случилось в прошлом</td><td>I <b>lost</b> my ticket yesterday.</td></tr>
<tr><td><b>Future: will / going to</b></td><td>решения и планы</td><td>I'<b>ll take</b> it. We'<b>re going to</b> visit Rome.</td></tr>
<tr><td><b>Present Perfect</b><br><small>настоящее совершённое</small></td><td>результат «уже / только что / когда-нибудь»</td><td>I'<b>ve lost</b> my passport!</td></tr>
</table>

<h4>Как понять «вид»</h4>
<ul>
<li><b>Simple</b> (простое) — <b>факт</b>: бывает, случилось, случится. Без подробностей.</li>
<li><b>Continuous</b> (длительное) — <b>процесс</b>: «в данный момент идёт». Формула: <b>be + глагол-ing</b>.</li>
<li><b>Perfect</b> (совершённое) — <b>результат к этому моменту</b>. Формула: <b>have + 3-я форма</b>.</li>
</ul>

<h4>Подсказка: как выбрать</h4>
<table class="gtable">
<tr><th>Если по-русски…</th><th>Скорее всего</th></tr>
<tr><td>обычно, каждый день, по расписанию</td><td>Present Simple</td></tr>
<tr><td>сейчас, в данный момент</td><td>Present Continuous</td></tr>
<tr><td>вчера, в 2020, неделю назад</td><td>Past Simple</td></tr>
<tr><td>завтра, потом, «я возьму»</td><td>will / going to</td></tr>
<tr><td>уже, только что, когда-нибудь, «я потерял — и сейчас его нет»</td><td>Present Perfect</td></tr>
</table>
<div class="tip">💡 Если сомневаешься — говори <b>Simple</b>. Тебя поймут в 99% случаев. Правильное время — это «вежливость», а не условие понимания.</div>
<p>Дальше — по отдельной теме на каждую форму, в том же порядке.</p>`,
    mistakes: [
      ['I am work every day.', 'I work every day.', 'Регулярно → Simple, без am.'],
      ['I lose my passport yesterday.', 'I lost my passport yesterday.', 'Вчера → прошедшее.'],
      ['I have lost it yesterday.', 'I lost it yesterday.', 'С «вчера» Perfect не используют.'],
    ],
    examples: [
      ['The museum opens at ten.', 'Музей открывается в десять.'],
      ["I'm waiting for a taxi.", 'Я жду такси.'],
      ['We arrived yesterday.', 'Мы прилетели вчера.'],
      ["I'll have the soup.", 'Мне суп (я возьму суп).'],
      ["I've lost my key.", 'Я потерял(а) ключ.'],
    ],
    quiz: [
      { q: '«Я жду автобус (прямо сейчас)» — какое время?', o: ['Present Simple', 'Present Continuous', 'Past Simple'], a: 1, e: 'Сейчас, в процессе → Continuous.' },
      { q: '«Поезд отправляется в 8:00 (по расписанию)»', o: ['Present Simple', 'Present Continuous', 'Future'], a: 0, e: 'Расписание → Present Simple.' },
      { q: '«Мы приехали вчера»', o: ['Present Perfect', 'Past Simple', 'Present Simple'], a: 1, e: 'Вчера → Past Simple.' },
      { q: '«Я потерял паспорт! (и сейчас его нет)»', o: ["I've lost my passport!", 'I lose my passport!', "I'm losing my passport!"], a: 0, e: 'Результат сейчас → Present Perfect.' },
      { q: 'Формула Continuous:', o: ['have + 3-я форма', 'be + -ing', 'did + глагол'], a: 1, e: 'am / is / are + глагол-ing.' },
      { q: 'В кафе решила прямо сейчас: «Я возьму салат»', o: ["I take the salad.", "I'll have the salad.", 'I had the salad.'], a: 1, e: 'Решение в момент речи → will.' },
    ],
  },
  {
    id: 'present-simple', group: 'tenses', icon: '🔁', title: 'Present Simple',
    sub: 'Факты, привычки, расписание + правило -s',
    body: `
<p>Самое частое время. Им говорят о том, что <b>бывает вообще</b>: факты, привычки, расписание.</p>
<ul>
<li>факт: <i>I <b>live</b> in Moscow.</i></li>
<li>привычка: <i>I <b>drink</b> coffee every morning.</i></li>
<li>расписание: <i>The train <b>leaves</b> at 7.</i></li>
</ul>
<h4>Как строится</h4>
<p>Просто глагол в начальной форме. Но <b>с he / she / it добавляем -s</b>:</p>
<table class="gtable">
<tr><th>I / you / we / they</th><th>he / she / it</th></tr>
<tr><td>I work</td><td>she work<b>s</b></td></tr>
<tr><td>they open</td><td>the shop open<b>s</b></td></tr>
<tr><td>we go</td><td>the bus go<b>es</b></td></tr>
<tr><td>I have</td><td>he <b>has</b> (особая форма!)</td></tr>
</table>
<p>Правописание: после s, sh, ch, x, o → <b>-es</b> (goes, watches, fixes); согласная + y → <b>-ies</b> (fly → flies).</p>

<h4>Отрицание</h4>
<p><b>don't</b> (I, you, we, they) / <b>doesn't</b> (he, she, it) + глагол <b>без -s</b>:<br>
<i>I <b>don't</b> eat meat. The TV <b>doesn't</b> work.</i> (не «doesn't works»: -s уже «съел» doesn't)</p>

<h4>Вопрос</h4>
<p><b>Do / Does</b> в начало + глагол без -s:<br>
<i><b>Do</b> you take cards? <b>Does</b> the bus stop here?</i></p>
<h4>Слова-подсказки</h4>
<p>always (всегда), usually (обычно), often (часто), sometimes (иногда), never (никогда), every day (каждый день), on Mondays (по понедельникам).</p>`,
    mistakes: [
      ['He work in a hotel.', 'He works in a hotel.', 'He → +s.'],
      ["It don't work.", "It doesn't work.", 'It → doesn’t.'],
      ["She doesn't speaks English.", "She doesn't speak English.", 'После doesn’t — без -s.'],
      ['Does she speaks?', 'Does she speak?', '-s уже у does.'],
    ],
    examples: [
      ['The museum opens at ten.', 'Музей открывается в десять.'],
      ["The shower doesn't work.", 'Душ не работает.'],
      ['Do you accept cards?', 'Вы принимаете карты?'],
      ['She usually takes the metro.', 'Она обычно ездит на метро.'],
    ],
    quiz: [
      { q: 'The museum ___ at 10 am.', o: ['open', 'opens', 'opening'], a: 1, e: 'Museum = it → +s.' },
      { q: 'The TV ___ work.', o: ["don't", "isn't", "doesn't"], a: 2, e: 'It → doesn’t.' },
      { q: 'He ___ a car.', o: ['have', 'haves', 'has'], a: 2, e: 'have → has для he/she/it.' },
      { b: 'Душ не работает.', a: ["The shower doesn't work.", 'The shower does not work.'], x: ['works', "don't"], e: 'Shower = it → doesn’t + work.' },
      { b: 'Этот автобус останавливается здесь?', a: 'Does this bus stop here?', x: ['stops', 'is'], e: 'Does + this bus + stop.' },
      { q: 'I ___ meat, I\'m vegetarian.', o: ["don't eat", "doesn't eat", 'not eat'], a: 0, e: "I → don't." },
      { b: 'Поезд отправляется в семь.', a: 'The train leaves at seven.', x: ['leave', 'is'], e: 'Расписание, train = it → leaves.' },
    ],
  },
  {
    id: 'present-continuous', group: 'tenses', icon: '▶️', title: 'Present Continuous',
    sub: 'То, что происходит прямо сейчас',
    body: `
<p>Когда действие <b>идёт прямо сейчас</b>, в процессе. По-русски это то же настоящее время, но англичане выделяют его особой формой.</p>
<div class="formula"><span>am / is / are</span> + <span>глагол-ing</span></div>
<ul>
<li><i>I<b>'m looking</b> for the station.</i> — Я ищу вокзал (сейчас).</li>
<li><i>We<b>'re waiting</b> for a taxi.</i> — Мы ждём такси.</li>
<li><i>It<b>'s raining</b>.</i> — Идёт дождь.</li>
</ul>
<h4>Сравни</h4>
<table class="gtable">
<tr><th>Present Simple (вообще)</th><th>Present Continuous (сейчас)</th></tr>
<tr><td>I work in a bank.<br><small>я работаю в банке</small></td><td>I'm working now.<br><small>я сейчас работаю</small></td></tr>
<tr><td>It rains a lot here.<br><small>здесь часто дожди</small></td><td>It's raining.<br><small>сейчас идёт дождь</small></td></tr>
</table>
<h4>Ещё два применения</h4>
<ul>
<li><b>Временное:</b> <i>I'm staying at the Hilton.</i> — Я живу (сейчас, временно) в Хилтоне.</li>
<li><b>Договорённости на ближайшее будущее:</b> <i>I'm leaving tomorrow.</i> — Я уезжаю завтра.</li>
</ul>
<p><b>Вопрос:</b> <i><b>Are</b> you wait<b>ing</b> for someone?</i> &nbsp; <b>Отрицание:</b> <i>I'm <b>not</b> buying, I'm just looking.</i></p>
<div class="tip">⚠️ Глаголы «состояния» почти никогда не ставят в -ing: <b>want, need, like, know, understand, have</b> (владеть). ✅ <i>I need help.</i> ❌ <i>I'm needing help.</i></div>
<p>Правописание: make → mak<b>ing</b> (e выпадает), stop → sto<b>pp</b>ing (короткий слог — удваиваем).</p>`,
    mistakes: [
      ['I looking for the exit.', "I'm looking for the exit.", 'Нужен am.'],
      ['I am want a coffee.', 'I want a coffee.', 'want — не ставится в -ing и без am.'],
      ['It rains now.', "It's raining now.", 'Сейчас → Continuous.'],
    ],
    examples: [
      ["I'm looking for the train station.", 'Я ищу железнодорожный вокзал.'],
      ["I'm just looking, thanks.", 'Я просто смотрю, спасибо.'],
      ["We're staying for a week.", 'Мы остаёмся на неделю.'],
      ['Is anyone sitting here?', 'Здесь кто-нибудь сидит?'],
    ],
    quiz: [
      { q: 'Sorry, I ___ for the exit.', o: ['look', "'m looking", 'looks'], a: 1, e: 'Прямо сейчас → am + -ing.' },
      { q: 'We ___ for our friends.', o: ['are waiting', 'is waiting', 'waiting'], a: 0, e: 'We → are + -ing.' },
      { b: 'Я просто смотрю.', a: ["I'm just looking.", 'I am just looking.'], x: ['look', 'do'], e: 'Сейчас, в процессе → am looking.' },
      { q: 'Какое предложение правильное?', o: ["I'm needing a doctor.", 'I need a doctor.', 'I am need a doctor.'], a: 1, e: 'need — глагол состояния, без -ing.' },
      { b: 'Идёт дождь.', a: ["It's raining.", 'It is raining.'], x: ['rains', 'are'], e: 'It + is + raining.' },
      { q: 'I ___ tomorrow morning. (договорились: уезжаю завтра)', o: ["'m leaving", 'leave', 'left'], a: 0, e: 'Договорённость → Continuous.' },
    ],
  },
  {
    id: 'past-simple', group: 'tenses', icon: '⏪', title: 'Past Simple',
    sub: 'Что случилось: потерял(а), купил(а), приехал(а)',
    body: `
<p>Чтобы рассказать, что произошло в прошлом — используем Past Simple. Хорошая новость: <b>форма одна для всех</b> (I, he, they — неважно).</p>
<h4>Правильные глаголы: + ed</h4>
<p>book → book<b>ed</b>, arrive → arriv<b>ed</b>, call → call<b>ed</b>, stop → stop<b>ped</b>, try → tr<b>ied</b></p>
<h4>Неправильные — запомнить</h4>
<p>Самые нужные в поездке:</p>
<table class="gtable">
<tr><td>be → <b>was / were</b></td><td>go → <b>went</b></td></tr>
<tr><td>have → <b>had</b></td><td>lose → <b>lost</b></td></tr>
<tr><td>buy → <b>bought</b></td><td>leave → <b>left</b></td></tr>
<tr><td>pay → <b>paid</b></td><td>forget → <b>forgot</b></td></tr>
<tr><td>take → <b>took</b></td><td>get → <b>got</b></td></tr>
<tr><td>see → <b>saw</b></td><td>eat → <b>ate</b></td></tr>
<tr><td>find → <b>found</b></td><td>tell → <b>told</b></td></tr>
</table>
<h4>Отрицание и вопрос — через did</h4>
<p><b>did</b> берёт прошедшее время на себя, а глагол возвращается в начальную форму:</p>
<ul>
<li><i>I <b>didn't order</b> this.</i> — Я это не заказывал(а). (не «didn't ordered»)</li>
<li><i><b>Did</b> you <b>see</b> my bag?</i> — Вы не видели мою сумку?</li>
</ul>
<p>С to be did не нужен: <i>It <b>wasn't</b> me. <b>Were</b> you at the hotel?</i></p>
<div class="tip">💡 «Меня обокрали» — <b>My wallet was stolen</b> (дословно «мой кошелёк был украден»). Англичане говорят о том, что случилось с вещью.</div>
<p>Слова-подсказки: yesterday, last night, last week, two days ago (два дня назад), in 2023.</p>`,
    mistakes: [
      ['I lose my bag yesterday.', 'I lost my bag yesterday.', 'Вчера → прошедшее.'],
      ["I didn't ordered this.", "I didn't order this.", 'После didn’t — начальная форма.'],
      ['Did you saw it?', 'Did you see it?', 'После did — начальная форма.'],
      ['I was buy a ticket.', 'I bought a ticket.', 'Was не нужен с обычным глаголом.'],
    ],
    examples: [
      ['I lost my passport.', 'Я потерял(а) паспорт.'],
      ['I booked a room online.', 'Я забронировал(а) номер онлайн.'],
      ['I left my bag in the taxi.', 'Я оставил(а) сумку в такси.'],
      ["I didn't order this.", 'Я это не заказывал(а).'],
    ],
    quiz: [
      { q: 'I ___ my phone yesterday.', o: ['lose', 'lost', 'losed'], a: 1, e: 'Lose → lost.' },
      { q: 'We ___ a room for two nights.', o: ['booked', 'book', 'bookt'], a: 0, e: 'Правильный глагол + ed.' },
      { b: 'Я оставил(а) сумку в такси.', a: 'I left my bag in the taxi.', x: ['leave', 'was'], e: 'Leave → left.' },
      { q: "I didn't ___ this dish.", o: ['ordered', 'order', 'orders'], a: 1, e: "После didn't — начальная форма." },
      { b: 'Вы видели мою сумку?', a: 'Did you see my bag?', x: ['saw', 'do'], e: 'Did + you + see.' },
      { q: 'The hotel ___ very nice.', o: ['were', 'was', 'did'], a: 1, e: 'Hotel = it → was.' },
      { b: 'Мой кошелёк украли.', a: 'My wallet was stolen.', x: ['were', 'stole'], e: 'Дословно «был украден».' },
    ],
  },
  {
    id: 'future', group: 'tenses', icon: '🔮', title: 'Будущее: will и going to',
    sub: 'Решения, обещания и планы',
    body: `
<p>В английском нет одной «будущей формы». Выбор зависит от того, <b>когда ты решила</b>.</p>
<h4>will — решаю прямо сейчас / обещаю / предполагаю</h4>
<div class="formula"><span>кто</span> + <span>will ('ll)</span> + <span>глагол</span></div>
<ul>
<li>в кафе / магазине: <i>I<b>'ll have</b> the soup. I<b>'ll take</b> it.</i></li>
<li>обещание: <i>I<b>'ll call</b> you tomorrow.</i></li>
<li>прогноз: <i>It <b>will</b> be cold tomorrow.</i></li>
</ul>
<h4>going to — уже решила заранее, это план</h4>
<div class="formula"><span>кто</span> + <span>am/is/are going to</span> + <span>глагол</span></div>
<ul>
<li><i>We<b>'re going to</b> visit the museum tomorrow.</i></li>
<li><i>I<b>'m going to</b> rent a car.</i></li>
</ul>
<h4>Present Continuous — договорённость (билеты куплены, время назначено)</h4>
<p><i>We<b>'re flying</b> to Rome on Friday.</i></p>
<table class="gtable">
<tr><th>Ситуация</th><th>Форма</th></tr>
<tr><td>Официант спросил — решаю на месте</td><td>I'll have…</td></tr>
<tr><td>Рассказываю план на завтра</td><td>I'm going to…</td></tr>
<tr><td>Уже есть билет / бронь</td><td>I'm leaving…</td></tr>
</table>
<p><b>Отрицание:</b> <i>won't</i> (= will not), <i>I'm not going to…</i><br><b>Вопрос:</b> <i>Will it be ready? Are you going to stay?</i></p>
<div class="tip">💡 После will — глагол без to: I'll <b>call</b>. После going — с to: going <b>to call</b>.</div>`,
    mistakes: [
      ['I will to call you.', "I'll call you.", 'После will — без to.'],
      ['I going to visit Rome.', "I'm going to visit Rome.", 'Нужен am.'],
      ["I willn't come.", "I won't come.", 'will not = won’t.'],
    ],
    examples: [
      ["I'll take it.", 'Я возьму это.'],
      ["I'll have a coffee, please.", 'Мне кофе, пожалуйста.'],
      ["We're going to stay for a week.", 'Мы собираемся остаться на неделю.'],
      ['Will it be ready tomorrow?', 'Это будет готово завтра?'],
    ],
    quiz: [
      { q: 'Официант: What would you like? — «I ___ the pasta.»', o: ["'ll have", 'am going to have', 'have'], a: 0, e: 'Решение прямо сейчас → will.' },
      { q: 'We ___ visit London next month. (давно запланировали)', o: ['will to', 'are going to', 'going to'], a: 1, e: 'План → be going to.' },
      { b: 'Я возьму это.', a: ["I'll take it.", 'I will take it.'], x: ['to', 'am'], e: 'Решение в момент речи → will.' },
      { b: 'Мы собираемся арендовать машину.', a: ["We're going to rent a car.", 'We are going to rent a car.'], x: ['will', 'is'], e: 'План → are going to.' },
      { q: 'Отрицание от will:', o: ["willn't", "won't", "don't will"], a: 1, e: 'will not = won’t.' },
    ],
  },
  {
    id: 'present-perfect', group: 'tenses', icon: '✅', title: 'Present Perfect',
    sub: '«Уже», «только что», «когда-нибудь» — и результат сейчас',
    body: `
<p>Это время пугает больше всех, но идея простая: <b>что-то случилось, и это важно сейчас</b>. Когда именно — неважно или не говорим.</p>
<div class="formula"><span>have / has</span> + <span>3-я форма глагола</span></div>
<ul>
<li><i>I<b>'ve lost</b> my passport!</i> — Я потеряла паспорт! (и сейчас его нет — это и важно)</li>
<li><i>The taxi <b>has arrived</b>.</i> — Такси приехало (оно здесь).</li>
<li><i><b>Have</b> you ever <b>been</b> to Italy?</i> — Ты когда-нибудь была в Италии?</li>
</ul>
<p><b>has</b> — для he / she / it, <b>have</b> — для остальных.</p>
<h4>3-я форма</h4>
<p>У правильных глаголов — как в прошедшем (+ed): booked, arrived, ordered. У неправильных — своя:</p>
<table class="gtable">
<tr><td>be → <b>been</b></td><td>lose → <b>lost</b></td></tr>
<tr><td>see → <b>seen</b></td><td>eat → <b>eaten</b></td></tr>
<tr><td>do → <b>done</b></td><td>take → <b>taken</b></td></tr>
<tr><td>go → <b>gone / been</b></td><td>have → <b>had</b></td></tr>
</table>
<h4>Слова-маркеры</h4>
<p><b>already</b> (уже), <b>just</b> (только что), <b>yet</b> (ещё / уже — в вопросах и отрицаниях), <b>ever</b> (когда-нибудь), <b>never</b> (никогда).<br>
<i>We've <b>already</b> paid. I've <b>just</b> arrived. Have you ordered <b>yet</b>?</i></p>
<div class="tip">⚠️ Если называешь <b>когда</b> (yesterday, last year, two hours ago) — это уже <b>Past Simple</b>: ✅ <i>I lost my passport yesterday.</i> ❌ <i>I have lost it yesterday.</i></div>`,
    mistakes: [
      ['I have lost it yesterday.', 'I lost it yesterday.', 'Есть «вчера» → Past Simple.'],
      ['She have arrived.', 'She has arrived.', 'She → has.'],
      ['Have you ever be to Paris?', 'Have you ever been to Paris?', '3-я форма be → been.'],
    ],
    examples: [
      ["I've lost my passport.", 'Я потерял(а) паспорт.'],
      ["We've already paid.", 'Мы уже заплатили.'],
      ['Have you ever been to London?', 'Ты когда-нибудь был(а) в Лондоне?'],
      ["I've just arrived.", 'Я только что приехал(а).'],
    ],
    quiz: [
      { q: 'I ___ my key! (и сейчас его нет)', o: ['have lost', 'lose', 'am losing'], a: 0, e: 'Результат важен сейчас → Present Perfect.' },
      { q: 'She ___ just arrived.', o: ['have', 'has', 'is'], a: 1, e: 'She → has.' },
      { q: 'I ___ my bag two hours ago.', o: ['have lost', 'lost', 'has lost'], a: 1, e: '«Два часа назад» — точное время → Past Simple.' },
      { b: 'Мы уже заплатили.', a: ["We've already paid.", 'We have already paid.'], x: ['paid already', 'did'], e: 'have + already + paid.' },
      { b: 'Ты когда-нибудь был(а) в Лондоне?', a: 'Have you ever been to London?', x: ['did', 'was'], e: 'Have + you + ever + been.' },
    ],
  },

  /* ---------------- ДЕТАЛИ ---------------- */
  {
    id: 'prepositions', group: 'extra', icon: '🧭', title: 'Предлоги места и времени',
    sub: 'in / on / at и как объяснить, где что',
    body: `
<table class="gtable">
<tr><th></th><th>Место</th><th>Время</th></tr>
<tr><td><b>in</b><br><small>внутри</small></td><td>в здании, городе, стране: in the room, in Paris</td><td>месяцы, годы, части дня: in May, in the morning</td></tr>
<tr><td><b>on</b><br><small>на</small></td><td>на поверхности, улице, этаже: on the table, on Main Street, on the 3rd floor</td><td>дни, даты: on Monday, on 5 June</td></tr>
<tr><td><b>at</b><br><small>в точке</small></td><td>в точке/пункте: at the airport, at the gate, at the hotel</td><td>точное время: at 7 pm, at night</td></tr>
</table>
<div class="tip">💡 Логика: <b>in</b> — внутри чего-то большого, <b>on</b> — на поверхности, <b>at</b> — точка на карте. «Я в аэропорту» (как пункт) — <i>I'm <b>at</b> the airport</i>.</div>
<h4>Объяснить, где что</h4>
<table class="gtable">
<tr><td><b>next to</b> — рядом с</td><td><b>opposite</b> — напротив</td></tr>
<tr><td><b>between</b> — между</td><td><b>behind</b> — за, позади</td></tr>
<tr><td><b>in front of</b> — перед</td><td><b>near</b> — недалеко от</td></tr>
<tr><td><b>on the left / right</b> — слева / справа</td><td><b>on the corner</b> — на углу</td></tr>
</table>
<h4>Движение</h4>
<p><b>to</b> — куда: <i>go <b>to</b> the station</i>. <b>from</b> — откуда: <i>I'm <b>from</b> Russia</i>. <b>by</b> — на чём: <i><b>by</b> bus, <b>by</b> taxi</i> (без артикля). <b>on foot</b> — пешком.</p>`,
    mistakes: [
      ['I am in the airport.', "I'm at the airport.", 'Аэропорт как пункт — at.'],
      ['in Monday', 'on Monday', 'Дни — on.'],
      ['by the bus', 'by bus', 'После by — без артикля.'],
    ],
    examples: [
      ["I'll meet you at the gate.", 'Встретимся у выхода на посадку.'],
      ['The pharmacy is next to the bank.', 'Аптека рядом с банком.'],
      ['Breakfast is at 8 am.', 'Завтрак в 8 утра.'],
      ['Our room is on the fifth floor.', 'Наш номер на пятом этаже.'],
    ],
    quiz: [
      { q: 'My flight is ___ 6 pm.', o: ['in', 'on', 'at'], a: 2, e: 'Точное время → at.' },
      { q: 'We arrive ___ Monday.', o: ['on', 'in', 'at'], a: 0, e: 'Дни недели → on.' },
      { b: 'Аптека рядом с банком.', a: 'The pharmacy is next to the bank.', x: ['near to', 'at'], e: 'next to = рядом с.' },
      { q: 'Our room is ___ the second floor.', o: ['in', 'at', 'on'], a: 2, e: 'Этаж → on.' },
      { b: 'Мы поедем на автобусе.', a: ["We'll go by bus.", 'We will go by bus.'], x: ['the', 'on'], e: 'by + транспорт, без артикля.' },
    ],
  },
  {
    id: 'much-many', group: 'extra', icon: '🔢', title: 'Much, many, some, any',
    sub: 'Количество и «немного»',
    body: `
<p>В английском важно, можно ли предмет <b>посчитать</b> (один чемодан, два чемодана) или нет (вода, деньги, время).</p>
<table class="gtable">
<tr><th></th><th>Считаемые (bags, tickets)</th><th>Несчитаемые (water, money, time)</th></tr>
<tr><td>Сколько?</td><td><b>How many</b> bags?</td><td><b>How much</b> money?</td></tr>
<tr><td>Много</td><td><b>many</b> / a lot of</td><td><b>much</b> / a lot of</td></tr>
<tr><td>Немного</td><td><b>a few</b> minutes</td><td><b>a little</b> water</td></tr>
</table>
<div class="tip">💡 Про цену — всегда <b>How much</b>: <i>How much is it? How much does it cost?</i></div>
<h4>Some и any — «немного, какие-нибудь»</h4>
<ul>
<li><b>some</b> — в утверждениях и <b>просьбах</b>: <i>I'd like <b>some</b> water. Could I have <b>some</b> bread?</i></li>
<li><b>any</b> — в вопросах и отрицаниях: <i>Do you have <b>any</b> free rooms? We don't have <b>any</b> cash.</i></li>
</ul>
<p>В разговоре вместо many/much часто говорят <b>a lot of</b>: <i>There are a lot of tourists.</i></p>`,
    mistakes: [
      ['How many is it?', 'How much is it?', 'Цена — how much.'],
      ['How much bags?', 'How many bags?', 'Сумки считаются → many.'],
      ['Do you have some rooms?', 'Do you have any rooms?', 'В вопросе — any.'],
    ],
    examples: [
      ['How many nights?', 'Сколько ночей?'],
      ['How much is the ticket?', 'Сколько стоит билет?'],
      ['Do you have any rooms for tonight?', 'У вас есть номера на сегодня?'],
      ["I'd like some tea, please.", 'Я бы хотел(а) чаю, пожалуйста.'],
    ],
    quiz: [
      { q: 'How ___ suitcases do you have?', o: ['much', 'many', 'any'], a: 1, e: 'Чемоданы считаются → many.' },
      { q: 'How ___ is a ticket to Rome?', o: ['many', 'much', 'some'], a: 1, e: 'Цена → how much.' },
      { q: 'Do you have ___ vegetarian dishes?', o: ['some', 'any', 'much'], a: 1, e: 'Вопрос → any.' },
      { b: 'Сколько стоит билет?', a: 'How much is the ticket?', x: ['many', 'are'], e: 'How much + is + the ticket.' },
      { b: 'У вас есть свободные номера?', a: 'Do you have any free rooms?', x: ['some', 'is'], e: 'Вопрос → any.' },
    ],
  },
  {
    id: 'modals', group: 'extra', icon: '🔑', title: 'Can, must, have to, should',
    sub: 'Могу, должен, надо, стоит',
    body: `
<p>Эти слова добавляют к глаголу «оттенок»: могу, должен, стоит. Все они (кроме have to) работают одинаково: <b>не меняются</b> и не требуют do.</p>
<table class="gtable">
<tr><th>Слово</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>can</b></td><td>могу, умею, можно</td><td>Can I pay by card? I can't find my bag.</td></tr>
<tr><td><b>must</b></td><td>обязан (строго, правило)</td><td>You must show your passport.</td></tr>
<tr><td><b>have to</b></td><td>надо, приходится (обстоятельства)</td><td>I have to change trains.</td></tr>
<tr><td><b>should</b></td><td>стоит, следует (совет)</td><td>You should visit the old town.</td></tr>
</table>
<h4>Правила</h4>
<ul>
<li>После can / must / should — глагол <b>без to</b> и <b>без -s</b>: <i>She <b>can speak</b> English.</i> (не «cans», не «can to speak»)</li>
<li>Вопрос — переставляем вперёд: <i><b>Can</b> I sit here? <b>Should</b> I take a taxi?</i></li>
<li>Отрицание — not: <i>can't, mustn't, shouldn't</i></li>
<li><b>have to</b> ведёт себя как обычный глагол: <i>She <b>has to</b> go. <b>Do</b> I <b>have to</b> pay? You <b>don't have to</b> pay.</i></li>
</ul>
<div class="tip">⚠️ <b>mustn't</b> = «нельзя», а <b>don't have to</b> = «не обязательно». <i>You mustn't smoke here</i> — курить нельзя. <i>You don't have to tip</i> — чаевые оставлять не обязательно.</div>`,
    mistakes: [
      ['Can I to pay by card?', 'Can I pay by card?', 'После can — без to.'],
      ['She cans swim.', 'She can swim.', 'Can не меняется.'],
      ['Must I to show it?', 'Do I have to show it? / Must I show it?', 'После must — без to.'],
    ],
    examples: [
      ['Can I sit here?', 'Можно здесь сесть?'],
      ['I have to change trains in Paris.', 'Мне надо сделать пересадку в Париже.'],
      ['You should try the local food.', 'Тебе стоит попробовать местную еду.'],
      ["You don't have to pay for children.", 'За детей платить не надо.'],
    ],
    quiz: [
      { q: 'Can I ___ by card?', o: ['to pay', 'pay', 'pays'], a: 1, e: 'После can — глагол без to.' },
      { q: '«Тебе стоит посетить музей»:', o: ['You must visit', 'You should visit', 'You can visit'], a: 1, e: 'Совет → should.' },
      { b: 'Мне надо сделать пересадку.', a: 'I have to change trains.', x: ['must to', 'has'], e: 'Обстоятельства → have to.' },
      { q: '«За это не обязательно платить»:', o: ["You mustn't pay.", "You don't have to pay.", "You can't pay."], a: 1, e: "Не обязательно → don't have to." },
      { b: 'Можно здесь сесть?', a: 'Can I sit here?', x: ['to', 'do'], e: 'Can + I + sit.' },
    ],
  },
];
