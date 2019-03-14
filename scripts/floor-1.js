import {
  categoryFilter,
  forWhoFilter,
  discountFilter
} from './filter-options.js';

export default {
  settings: {
    dimensions: {
      width: 944,
      height: 337
    },
    boundaryShape: `M2.3 312.2h37.4l.3.4c10.7 14 27.1 22.1 45 22.2h.2c18.1 0 34.8-8.1 45.6-22.2l.3-.4h.4l810.9.4V2.3L9 2.5v249.2H2.4l-.1 60.5z`
  },
  areas: [{
      id: 1,
      title: `KARI`,
      synonyms: [`кари`, `kari`],
      description: `Обувной магазин`,
      path: `M-284.7,179.1h-72.7v28 h-91.1l-0.2-95.2l163.7,0L-284.7,179.1z`,
      category: new Set([categoryFilter[`Обувь`]])
    },
    {
      id: 2,
      title: `ZARA`,
      logoSrc: `zara.svg`,
      synonyms: [`zara`, `зара`],
      description: `Одежда для современных людей`,
      category: new Set([categoryFilter[`Одежда`]]),
      'for-who': new Set([forWhoFilter[`Мужская одежда`], forWhoFilter[`Женская одежда`]]),
      path: `M312.6,25.4l0.6,240.6 c-3,4.8-5.4,10.1-6.9,15.7H125.1V25.4H312.6z`,
    },
    {
      id: 3,
      title: `Bershka`,
      logoSrc: `bershka.svg`,
      synonyms: [`bershka`, `бершка`],
      description: `Трендовая одежда, обувь и аксессуары`,
      path: `M486.6,256.3v25.1 h-62.4c-5.7-20.9-22.2-37.2-43.2-42.6l36.4-18v-33.7v-33.6v-0.1v-128h69.1V256.3z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: 4,
      title: `H&M`,
      logoSrc: `h&m.svg`,
      synonyms: [`h&m`, `hm`, `ейч эм`],
      description: `Модная одежда для женщин, мужчин, подростков и детей`,
      path: `M-284.5,179.6v28.9v173 h-163.4l-0.5-173.8h91.7l0-28.1H-284.5z`,
      category: new Set([categoryFilter[`Одежда`]])
    },
    {
      id: 5,
      title: `Лента`,
      logoSrc: `lenta.svg`,
      synonyms: [`Лента`, `lenta`],
      description: `Гипермаркет`,
      path: `M782.7,25.4h317.1 v510.1H782.7v-25.6v-24.9V25.4z`,
      category: new Set([categoryFilter[`Продукты питания`]])
    },
    {
      id: 6,
      title: `TELE2`,
      logoSrc: `tele2.svg`,
      synonyms: [`tele2`, `теле2`],
      description: `Оператор сотовой связи`,
      path: `M690.5,431.4 712.9,431.4 712.9,453.7 690.5,453.7z`,
      category: new Set([categoryFilter[`Сотовая связь`], categoryFilter[`Бытовая техника и электроника`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 7,
      title: `Снежная королева`,
      logoSrc: `snowqueen.svg`,
      synonyms: [`снежная королева`, `снежная`],
      description: `Верхняя одежда`,
      link: {
        url: `http://www.trc-aeropark.ru/shop/snezhnaya-koroleva`,
        text: `1 действующая акция`
      },
      path: `M125.1,281.8 l-67.5,0v-52l-57.5,0V25.4h125V281.8z`,
      category: new Set([categoryFilter[`Одежда`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 8,
      title: `Pull&Bear`,
      logoSrc: `pullandbear.svg`,
      synonyms: [`pull&bear`, `pull & bear`, `пулл и биар`, `пулл и бир`],
      description: `Одежда для энергичных, творческих и амбициозных молодых людей`,
      path: `M140.7,312.5 140.7,359.5   140.7,383.9 140.7,383.9 140.7,420 141.4,420 141.4,420.5 177.1,420.5 177.1,420.5 211.1,420.5 211.2,420.5 245.1,420.5 245.1,420   245.1,408.3 245.1,312.5 z`,
      category: new Set([categoryFilter[`Одежда`]]),
      discount: new Set([discountFilter[`До 30%`]])
    },
    {
      id: 9,
      title: `Помещение для магазина`,
      logoSrc: ``,
      synonyms: [],
      description: `Свободно`,
      rent: true,
      link: {
        text: ``,
        url: ``
      },
      button: {
        text: `Отправить заявку`,
        action: ``
      },
      path: `M-181.5,454.1h-21.8l-14.3-23.1v-24.6 h36.1V454.1z`,
      category: new Set(),
      discount: new Set()
    }
  ],
  helpMarkers: [{
      symbolId: `foodcourt`,
      points: [{
        title: `Фудкорт`,
        position: [145.5, 300]
      }]
    },
    {
      symbolId: `parking`,
      points: [{
        title: `Парковка`,
        position: [187.5, 300]
      }]
    },
    {
      symbolId: `elevator`,
      points: [{
        title: `Лифт`,
        position: [229.5, 300]
      }]
    },
    {
      symbolId: `escalator`,
      points: [{
        title: `Эскалатор`,
        position: [271.5, 300]
      }]
    },
    {
      symbolId: `wardrobe`,
      points: [{
        title: `Гардероб`,
        position: [313.5, 300]
      }]
    },
    {
      symbolId: `wc`,
      points: [{
        title: `Туалет`,
        position: [355.5, 300]
      }]
    },
    {
      symbolId: `entrance-vertical`,
      points: [{
        title: `Вход`,
        position: [397.5, 300]
      }]
    },
    {
      symbolId: `entrance-horizontal`,
      points: [{
        title: `Вход`,
        position: [439.5, 300]
      }]
    },
    {
      symbolId: `entrance-diagonal`,
      points: [{
        title: `Вход`,
        position: [481.5, 300]
      }]
    },
    {
      symbolId: `entrance-diagonal-back`,
      points: [{
        title: `Вход`,
        position: [523.5, 300]
      }]
    },
    {
      symbolId: `cafe`,
      points: [{
        title: `Кафе`,
        position: [565.5, 300]
      }]
    },
    {
      symbolId: `atm`,
      points: [{
        title: `Банкомат`,
        position: [607.5, 300]
      }]
    },
    {
      symbolId: `fountain`,
      points: [{
        title: `Фонтан`,
        position: [649.5, 300],
        size: 64
      }]
    },
  ]
};
