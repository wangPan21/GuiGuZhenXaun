//定义商品管理数据的ts类型
//定义全部接口返回的参数的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有品牌的ts数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

//定义品牌管理列表接口 返回 数据的ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: [
      {
        id?: number
        createTime: string
        updateTime: string
        tmName: string
        logoUrl: string
      },
    ]
    total: number
    size: string
    current: string
    orders: []
    optimizeCountSql: boolean
    hitCount: string
    countId: null
    maxLimit: null
    searchCount: string
    pages: string
  }
}

//定义属性管理接口 返回 数据的ts类型
export interface CategoryAll extends ResponseData {
  data: [
    {
      id: number | string
      createTime: string
      updateTime: string
      name: string
      category1Id?: number
      category2Id?: number
    },
  ]
}

//定义属性与属性值的ts类型
export interface Attrvalue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

//存储每一个属性值的数组ts类型
export type AttrValueList = Attrvalue[]

//属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

//存储每一个属性对象的数组ts类型
export type AttrList = Attr[]

//属性接口返回数据的ts类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}

//SPU数据的ts类型
export interface SPUData {
  category3Id: number | string
  id?: number | string
  spuName: string
  description: string
  tmId: number
  spuSaleAttrList: null | SpuSaLes[]
  spuImageList: null | SpuImg[]
}

//数组：元素都是已有的spu数据类型
export type Records = SPUData[]

//获取SPU接口 返回 数据的ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//所有品牌数据的ts类型
export interface TradeMarkSPU {
  id: number
  tmName: string
  logoUrl: string
}

//品牌接口返回的数据ts类型
export interface ALLTradeMarkSPU extends ResponseData {
  data: TradeMarkSPU[]
}

//品牌图片的ts类型
export interface SpuImg {
  id?: number
  spuId?: number
  imgName: string
  imgUrl: string
  createTime?: string
  updateTime?: string
  name?: string
  url?: string
}

//品牌图片返回数据的ts类型
export interface ALLSpuImage extends ResponseData {
  data: SpuImg[]
}

//已有的销售属性ts类型
export interface SpuSaLe {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: string
}

export type SpuSaLeValueList = SpuSaLe[]

export interface SpuSaLes {
  baseSaleAttrId: number | string
  saleAttrName: string
  createTime?: string
  id?: number
  spuId?: number
  spuSaleAttrValueList: SpuSaLeValueList
  flag?: boolean
  saleAttrValue?: string
}

export interface ALLSpuSaLes extends ResponseData {
  data: SpuSaLes[]
}

//某个品牌的销售属性
export interface SpuSaLess {
  id?: number
  createTime?: string
  updateTime?: string
  name: string
}

export interface ALLSpuSaLess extends ResponseData {
  data: SpuSaLess[]
}

//sku数据ts类型
export interface SkuData {
  category3Id: number | string
  spuId: number | string //已有的spu ID
  tmId: number | string //spu品牌的ID
  skuName: string
  price: number | string
  weight: string
  skuDesc: string
  skuAttrValueList: [
    //平台属性
    {
      attrId?: number
      valueId?: number
    },
  ]
  skuSaleAttrValueList: [
    //销售属性
    {
      saleAttrId?: number
      saleAttrValueId?: number
    },
  ]
  skuDefaultImg: string //sku图片地址
}

//获取sku数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}

//定义Sku对象的ts类型
export interface SkuDatas {
  category3Id: number | string
  spuId: number | string //已有的spu ID
  tmId: number | string //spu品牌的ID
  skuName: string
  price: number | string
  weight: string
  skuDesc: string
  skuAttrValueList: [
    //平台属性
    {
      attrId?: number
      valueId?: number
    },
  ]
  skuSaleAttrValueList: [
    //销售属性
    {
      saleAttrId?: number
      saleAttrValueId?: number
    },
  ]
  skuDefaultImg: string //sku图片地址
  isSale?:number,
  id?:number
}

//获取Sku接口返回数据的ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuDatas[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
