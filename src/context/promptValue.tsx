import { CustomRadioImgData } from 'src/views/components/custom-radio/types'
import { ColorCheckboxItemData, ImgCheckboxItemData, RoomType } from './types'

export const designStyle: CustomRadioImgData[] = [
  {
    img: '/images/styles/design/1neoclassic5403.jpg',
    isSelected: true,
    value: '((scandinavian)) style',
    title: 'スカンジナビア',
    styleId: 0
  },
  {
    img: '/images/styles/design/2modern07a7.jpg',
    value: '((modern)) style',
    title: 'モダン',
    styleId: 1
  },
  {
    img: '/images/styles/design/3minimalist07a7.jpg',
    value: 'mid ((century)) style',
    title: 'ミッドセンチュリー',
    styleId: 2
  },
  {
    img: '/images/styles/design/4medievalbeff.jpg',
    value: '((oriental)) style',
    title: 'オリエンタル',
    styleId: 3
  },
  {
    img: '/images/styles/design/5maximalistd690.jpg',
    value: '((ethnic)) style',
    title: 'エスニック',
    styleId: 4
  },
  {
    img: '/images/styles/design/6art-deco07a7.jpg',
    value: '((industrial)) style',
    title: 'インダストリアル',
    styleId: 5
  },
  {
    img: '/images/styles/design/7coastald86b.jpg',
    value: '((natural)) style',
    title: 'ナチュラル',
    styleId: 6
  },
  {
    img: '/images/styles/design/8rustic7922.jpg',
    value: '((art deco)) style',
    title: 'アールデコ',
    styleId: 7
  },
  {
    img: '/images/styles/design/9ski-chalet6e0a.jpg',
    value: '((country)) style',
    title: 'カントリー',
    styleId: 8
  },
  {
    img: '/images/styles/design/10tribal07a7.jpg',
    value: '((Japanese)) style',
    title: '和モダン',
    styleId: 9
  },
  {
    img: '/images/styles/design/11tropical07a7.jpg',
    value: '((bohemian)) style',
    title: 'ボヘミアン',
    styleId: 10
  },
  {
    img: '/images/styles/design/12vintage40f5.jpg',
    value: '((simple)) style',
    title: 'シンプル',
    styleId: 11
  },
  {
    img: '/images/styles/design/13zen5403.jpg',
    value: '((vintage)) style',
    title: 'ビンテージ',
    styleId: 12
  }
]

export const roomNameList: RoomType[] = [
  { title: 'リビング', value: '(((living))) room', nameId: 0 },
  {
    title: 'バスルーム',
    value: '(((bathroom))) without toilet',
    nameId: 1
  },
  {
    title: 'キッチン',
    value: '(((kitchen)))',
    nameId: 2
  },
  {
    title: 'ベッドルーム',
    value: '(((bedroom)))',
    nameId: 3
  },
  {
    title: 'ダイニング',
    value: '(((diningroom)))',
    nameId: 4
  },
  { title: 'トイレ coming soon', value: 'washroom with toilet only', nameId: 5 },
  {
    title: 'ホームオフィス',
    value: '(((computer office)))',
    nameId: 6
  }
]

export const floorStyle: ImgCheckboxItemData[] = [
  {
    id: 0,
    value: 'Teak',
    title: 'チーク',
    img: '/images/styles/floor/teak.jpg'
  },
  {
    id: 1,
    value: 'Owk Wood',
    title: 'オーク',
    img: '/images/styles/floor/oak.jpg'
  },
  {
    id: 2,
    value: 'Pine',
    title: 'パイン',
    img: '/images/styles/floor/pine.jpg'
  },
  {
    id: 3,
    value: 'walnut',
    title: 'ウォールナッツ',
    img: '/images/styles/floor/walnut.jpg'
  },
  {
    id: 4,
    value: 'birch',
    title: 'バーチ(カバ)',
    img: '/images/styles/floor/birch.jpg'
  },
  {
    id: 5,
    value: 'mahogany',
    title: 'マホガニー',
    img: '/images/styles/floor/mahogany.jpg'
  },
  {
    id: 6,
    value: 'Saberi',
    title: 'サベリ',
    img: '/images/styles/floor/Saberi.jpg'
  },
  {
    id: 7,
    value: 'Karin',
    title: 'カリン',
    img: '/images/styles/floor/karin.jpg'
  },
  {
    id: 8,
    value: 'Pinkad',
    title: 'ピンカド',
    img: '/images/styles/floor/pinkad.jpg'
  },
  {
    id: 9,
    value: 'maple',
    title: 'メープル',
    img: '/images/styles/floor/maple.jpg'
  },
  {
    id: 10,
    value: 'Merbau',
    title: 'メルバウ',
    img: '/images/styles/floor/Merbau.jpg'
  },
  {
    id: 11,
    value: 'Bamboo',
    title: '竹',
    img: '/images/styles/floor/bamboowood.jpg'
  },
  {
    id: 12,
    value: 'Paulownia',
    title: '桐',
    img: '/images/styles/floor/Paulownia.jpg'
  },
  {
    id: 13,
    value: 'Red Cedar',
    title: 'レッドシダー',
    img: '/images/styles/floor/redcedar.jpg'
  },
  {
    id: 14,
    value: 'Redwood',
    title: 'レッドウッド',
    img: '/images/styles/floor/redwood.jpg'
  },
  {
    id: 15,
    value: 'Cedar',
    title: '国産杉',
    img: '/images/styles/floor/cedarwood.jpg'
  },
  {
    id: 16,
    value: 'Willow cedor',
    title: '柳杉',
    img: '/images/styles/floor/willowcedar.jpg'
  },
  {
    id: 17,
    value: 'Old Wood',
    title: '古材',
    img: '/images/styles/floor/furuzai.jpg'
  },
  {
    id: 18,
    value: 'Other',
    title: 'その他',
    img: '/images/styles/floor/otherwood.jpg'
  }
]

export const materialStyle: ImgCheckboxItemData[] = [
  {
    id: 0,
    value: 'Brick',
    title: 'レンガ ',
    img: '/images/styles/material/brick.jpg'
  },
  {
    id: 1,
    value: 'Stone',
    title: '石材',
    img: '/images/styles/material/stone.jpg'
  },
  {
    id: 2,
    value: 'Wood',
    title: '木材',
    img: '/images/styles/material/wood2.jpg'
  },
  {
    id: 3,
    value: 'Vinyle sidding',
    title: '塩化ビニル',
    img: '/images/styles/material/vinylesidding.jpg'
  },
  {
    id: 4,
    value: 'Stucco',
    title: 'セメント',
    img: '/images/styles/material/stucco.jpg'
  },
  {
    id: 5,
    value: 'Concrete',
    title: 'コンクリート',
    img: '/images/styles/material/concreate.jpg'
  },
  {
    id: 6,
    value: 'Aluminium',
    title: 'アルミニウム',
    img: '/images/styles/material/aluminium.jpg'
  },
  {
    id: 7,
    value: 'Bamboo',
    title: '竹材',
    img: '/images/styles/material/bamboo.jpg'
  },
  {
    id: 8,
    value: 'Marble',
    title: '大理石',
    img: '/images/styles/material/marble.jpg'
  },
  {
    id: 9,
    value: 'Granite',
    title: '花崗岩',
    img: '/images/styles/material/granite.jpg'
  },
  {
    id: 10,
    value: 'Terracotta',
    title: '粘土',
    img: '/images/styles/material/terraccotta.jpg'
  },
  {
    id: 11,
    value: 'Cedar',
    title: '杉',
    img: '/images/styles/material/cedar.jpg'
  },
  {
    id: 12,
    value: 'Iron',
    title: '鉄',
    img: '/images/styles/material/iron.jpg'
  },
  {
    id: 13,
    value: 'PVC',
    title: 'ポリ塩化ビニル',
    img: '/images/styles/material/pvc.jpg'
  },
  {
    id: 14,
    value: 'Composite wood',
    title: 'コンポジットウッド',
    img: '/images/styles/material/composite_wood.jpg'
  }
]

export const colorStyle: ColorCheckboxItemData[] = [
  {
    id: 0,
    value: 'White',
    title: 'ホワイト',
    colorPrompt: '#FFFFFF'
  },
  {
    id: 1,
    value: 'Black',
    title: 'ブラック',
    colorPrompt: '#000000'
  },
  {
    id: 2,
    value: 'Red',
    title: 'レッド',
    colorPrompt: '#FF0000'
  },
  {
    id: 3,
    value: 'Orange',
    title: 'オレンジ',
    colorPrompt: '#FAA82D'
  },
  {
    id: 4,
    value: 'Green',
    title: 'グリーン',
    colorPrompt: '#28EF00'
  },
  {
    id: 5,
    value: 'Yellow',
    title: 'イエロー',
    colorPrompt: '#F3F319'
  },
  {
    id: 6,
    value: 'Bronze',
    title: 'ブロンズ',
    colorPrompt: '#BB823B'
  },
  {
    id: 7,
    value: 'Silver',
    title: 'シルバー',
    colorPrompt: '#ACA9A5'
  },
  {
    id: 8,
    value: 'Navy',
    title: 'ネイビー',
    colorPrompt: '#0909FA'
  },
  {
    id: 9,
    value: 'Pink',
    title: 'ピンク',
    colorPrompt: '#FA71D1'
  },
  {
    id: 10,
    value: 'Turquoise',
    title: 'ターコイズ',
    colorPrompt: '#78F8E3'
  },
  {
    id: 11,
    value: 'Moss green',
    title: 'モスグリーン',
    colorPrompt: '#2E6823'
  },
  {
    id: 12,
    value: 'Gray',
    title: 'グレー',
    colorPrompt: '#7E807E'
  },
  {
    id: 13,
    value: 'Beige',
    title: 'ベージュ',
    colorPrompt: '#ECD7AD'
  },
  {
    id: 14,
    value: 'DarkBrown',
    title: 'ダークブラウン',
    colorPrompt: '#402700'
  },
  {
    id: 15,
    value: 'Brown',
    title: 'ブラウン',
    colorPrompt: '#8D5400'
  },
  {
    id: 16,
    value: 'Purple',
    title: 'パープル',
    colorPrompt: '#7035F8'
  }
]
