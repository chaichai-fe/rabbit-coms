// define types
export interface ValueItem {
  name: string
  picture: string
  desc: string
  selected?: boolean
  disabled?: boolean
}

export interface SpecItem {
  name: string
  id: string
  values: ValueItem[]
}

interface SkuSpecItem {
  name: string
  valueName: string
}

export interface SkuItem {
  id: string
  skuCode: string
  price: string
  inventory: number
  picture: string
  specs: SkuSpecItem[]
}

export interface SkuGoods {
  specs: SpecItem[]
  skus: SkuItem[]
}
