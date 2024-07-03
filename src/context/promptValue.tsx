import { CustomRadioImgData } from 'src/views/components/custom-radio/types'
import { ColorCheckboxItemData, ImgCheckboxItemData, RoomType } from './types'

export const designStyle: CustomRadioImgData[] = [
  {
    img: '/images/styles/design/1neoclassic5403.jpg',
    isSelected: true,
    value: '((scandinavian)) style',
    title: 'Scandinavia',
    styleId: 0
  },
  {
    img: '/images/styles/design/2modern07a7.jpg',
    value: '((modern)) style',
    title: 'modern',
    styleId: 1
  },
  {
    img: '/images/styles/design/3minimalist07a7.jpg',
    value: 'mid ((century)) style',
    title: 'Midcentury',
    styleId: 2
  },
  {
    img: '/images/styles/design/4medievalbeff.jpg',
    value: '((oriental)) style',
    title: 'Oriental',
    styleId: 3
  },
  {
    img: '/images/styles/design/5maximalistd690.jpg',
    value: '((ethnic)) style',
    title: 'ethnic',
    styleId: 4
  },
  {
    img: '/images/styles/design/6art-deco07a7.jpg',
    value: '((industrial)) style',
    title: 'industrial',
    styleId: 5
  },
  {
    img: '/images/styles/design/7coastald86b.jpg',
    value: '((natural)) style',
    title: 'natural',
    styleId: 6
  },
  {
    img: '/images/styles/design/8rustic7922.jpg',
    value: '((art deco)) style',
    title: 'Art Deco',
    styleId: 7
  },
  {
    img: '/images/styles/design/9ski-chalet6e0a.jpg',
    value: '((country)) style',
    title: 'Country',
    styleId: 8
  },
  {
    img: '/images/styles/design/10tribal07a7.jpg',
    value: '((Japanese)) style',
    title: 'Japanese modern',
    styleId: 9
  },
  {
    img: '/images/styles/design/11tropical07a7.jpg',
    value: '((bohemian)) style',
    title: 'Bohemian',
    styleId: 10
  },
  {
    img: '/images/styles/design/12vintage40f5.jpg',
    value: '((simple)) style',
    title: 'simple',
    styleId: 11
  },
  {
    img: '/images/styles/design/13zen5403.jpg',
    value: '((vintage)) style',
    title: 'Vintage',
    styleId: 12
  }
]

export const roomNameList: RoomType[] = [
  { title: 'living', value: '(((living))) room', nameId: 0 },
  {
    title: 'Bathroom',
    value: '(((bathroom))) without toilet',
    nameId: 1
  },
  {
    title: 'kitchen',
    value: '(((kitchen)))',
    nameId: 2
  },
  {
    title: 'bedroom',
    value: '(((bedroom)))',
    nameId: 3
  },
  {
    title: 'dining',
    value: '(((diningroom)))',
    nameId: 4
  },
  {
    title: 'toilet coming soon',
    value: 'washroom with toilet only',
    nameId: 5
  },
  {
    title: 'Home Office',
    value: '(((computer office)))',
    nameId: 6
  }
]

export const floorStyle: ImgCheckboxItemData[] = [
  {
    id: 0,
    value: 'Teak',
    title: 'cheek',
    img: '/images/styles/floor/teak.jpg'
  },
  {
    id: 1,
    value: 'Owk Wood',
    title: 'Oak',
    img: '/images/styles/floor/oak.jpg'
  },
  {
    id: 2,
    value: 'Pine',
    title: 'Pine',
    img: '/images/styles/floor/pine.jpg'
  },
  {
    id: 3,
    value: 'walnut',
    title: 'Walnut',
    img: '/images/styles/floor/walnut.jpg'
  },
  {
    id: 4,
    value: 'birch',
    title: 'Birch',
    img: '/images/styles/floor/birch.jpg'
  },
  {
    id: 5,
    value: 'mahogany',
    title: 'Mahogany',
    img: '/images/styles/floor/mahogany.jpg'
  },
  {
    id: 6,
    value: 'Saberi',
    title: 'Saberi',
    img: '/images/styles/floor/Saberi.jpg'
  },
  {
    id: 7,
    value: 'Karin',
    title: 'Karin',
    img: '/images/styles/floor/karin.jpg'
  },
  {
    id: 8,
    value: 'Pinkad',
    title: 'Pincad',
    img: '/images/styles/floor/pinkad.jpg'
  },
  {
    id: 9,
    value: 'maple',
    title: 'Maple',
    img: '/images/styles/floor/maple.jpg'
  },
  {
    id: 10,
    value: 'Merbau',
    title: 'Merbau',
    img: '/images/styles/floor/Merbau.jpg'
  },
  {
    id: 11,
    value: 'Bamboo',
    title: 'bamboo',
    img: '/images/styles/floor/bamboowood.jpg'
  },
  {
    id: 12,
    value: 'Paulownia',
    title: 'Paulownia',
    img: '/images/styles/floor/Paulownia.jpg'
  },
  {
    id: 13,
    value: 'Red Cedar',
    title: 'Red Cedar',
    img: '/images/styles/floor/redcedar.jpg'
  },
  {
    id: 14,
    value: 'Redwood',
    title: 'Redwood',
    img: '/images/styles/floor/redwood.jpg'
  },
  {
    id: 15,
    value: 'Cedar',
    title: 'Domestic fir',
    img: '/images/styles/floor/cedarwood.jpg'
  },
  {
    id: 16,
    value: 'Willow cedor',
    title: 'Cryptomeria fortunei',
    img: '/images/styles/floor/willowcedar.jpg'
  },
  {
    id: 17,
    value: 'Old Wood',
    title: 'Antique wood',
    img: '/images/styles/floor/furuzai.jpg'
  },
  {
    id: 18,
    value: 'Other',
    title: 'others',
    img: '/images/styles/floor/otherwood.jpg'
  }
]

export const materialStyle: ImgCheckboxItemData[] = [
  {
    id: 0,
    value: 'Brick',
    title: 'Brick ',
    img: '/images/styles/material/brick.jpg'
  },
  {
    id: 1,
    value: 'Stone',
    title: 'Stone',
    img: '/images/styles/material/stone.jpg'
  },
  {
    id: 2,
    value: 'Wood',
    title: 'wood',
    img: '/images/styles/material/wood2.jpg'
  },
  {
    id: 3,
    value: 'Vinyle sidding',
    title: 'Vinyl chloride',
    img: '/images/styles/material/vinylesidding.jpg'
  },
  {
    id: 4,
    value: 'Stucco',
    title: 'cement',
    img: '/images/styles/material/stucco.jpg'
  },
  {
    id: 5,
    value: 'Concrete',
    title: 'concrete',
    img: '/images/styles/material/concreate.jpg'
  },
  {
    id: 6,
    value: 'Aluminium',
    title: 'aluminum',
    img: '/images/styles/material/aluminium.jpg'
  },
  {
    id: 7,
    value: 'Bamboo',
    title: 'Bamboo',
    img: '/images/styles/material/bamboo.jpg'
  },
  {
    id: 8,
    value: 'Marble',
    title: 'marble',
    img: '/images/styles/material/marble.jpg'
  },
  {
    id: 9,
    value: 'Granite',
    title: 'granite',
    img: '/images/styles/material/granite.jpg'
  },
  {
    id: 10,
    value: 'Terracotta',
    title: 'clay',
    img: '/images/styles/material/terraccotta.jpg'
  },
  {
    id: 11,
    value: 'Cedar',
    title: 'Cedar',
    img: '/images/styles/material/cedar.jpg'
  },
  {
    id: 12,
    value: 'Iron',
    title: 'iron',
    img: '/images/styles/material/iron.jpg'
  },
  {
    id: 13,
    value: 'PVC',
    title: 'PVC',
    img: '/images/styles/material/pvc.jpg'
  },
  {
    id: 14,
    value: 'Composite wood',
    title: 'Composite Wood',
    img: '/images/styles/material/composite_wood.jpg'
  }
]

export const colorStyle: ColorCheckboxItemData[] = [
  {
    id: 0,
    value: 'White',
    title: 'white',
    colorPrompt: '#FFFFFF'
  },
  {
    id: 1,
    value: 'Black',
    title: 'black',
    colorPrompt: '#000000'
  },
  {
    id: 2,
    value: 'Red',
    title: 'red',
    colorPrompt: '#FF0000'
  },
  {
    id: 3,
    value: 'Orange',
    title: 'orange',
    colorPrompt: '#FAA82D'
  },
  {
    id: 4,
    value: 'Green',
    title: 'green',
    colorPrompt: '#28EF00'
  },
  {
    id: 5,
    value: 'Yellow',
    title: 'yellow',
    colorPrompt: '#F3F319'
  },
  {
    id: 6,
    value: 'Bronze',
    title: 'bronze',
    colorPrompt: '#BB823B'
  },
  {
    id: 7,
    value: 'Silver',
    title: 'silver',
    colorPrompt: '#ACA9A5'
  },
  {
    id: 8,
    value: 'Navy',
    title: 'navy',
    colorPrompt: '#0909FA'
  },
  {
    id: 9,
    value: 'Pink',
    title: 'pink',
    colorPrompt: '#FA71D1'
  },
  {
    id: 10,
    value: 'Turquoise',
    title: 'turquoise',
    colorPrompt: '#78F8E3'
  },
  {
    id: 11,
    value: 'Moss green',
    title: 'moss green',
    colorPrompt: '#2E6823'
  },
  {
    id: 12,
    value: 'Gray',
    title: 'gray',
    colorPrompt: '#7E807E'
  },
  {
    id: 13,
    value: 'Beige',
    title: 'beige',
    colorPrompt: '#ECD7AD'
  },
  {
    id: 14,
    value: 'DarkBrown',
    title: 'darkbrown',
    colorPrompt: '#402700'
  },
  {
    id: 15,
    value: 'Brown',
    title: 'brown',
    colorPrompt: '#8D5400'
  },
  {
    id: 16,
    value: 'Purple',
    title: 'purple',
    colorPrompt: '#7035F8'
  }
]
