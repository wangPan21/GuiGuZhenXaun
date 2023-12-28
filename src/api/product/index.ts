import request from '@/utils/request'
import type {
  TradeMarkResponseData,
  TradeMark,
  CategoryAll,
  AttrResponseData,
  Attr,
  HasSpuResponseData,
  ALLTradeMarkSPU,
  ALLSpuImage,
  ALLSpuSaLes,
  ALLSpuSaLess
} from './type'

enum API {
  TRADERMARKLIST_URL = '/admin/product/baseTrademark/',
  ADDTRADERMARK_URL = '/admin/product/baseTrademark/save',
  EDITTRADERMARK_URL = '/admin/product/baseTrademark/update',
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
  GETCATEGORY1_URL = '/admin/product/getCategory1',
  GETCATEGORY2_URL = '/admin/product/getCategory2/',
  GETCATEGORY3_URL = '/admin/product/getCategory3/',
  GETATTRINFO_URL = '/admin/product/attrInfoList/',
  ADDOREDITATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
  GETSPU_URL = '/admin/product/',
  GETSPUALL_URL = '/admin/product/baseTrademark/getTrademarkList',
  GETSPUIMAGE_URL = '/admin/product/spuImageList/',
  GETSPUSALE_URL = '/admin/product/spuSaleAttrList/',
  GETSPUSALELIST_URL ='/admin/product/baseSaleAttrList'
}

//获取品牌分类数据的接口 /admin/product/baseTrademark/{page}/{limit}
export const reqTrademarkList = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADERMARKLIST_URL + `${page}/${limit}`,
  )

//添加/修改 品牌的接口 /admin/product/baseTrademark/save
export const reqAddOrEditTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.EDITTRADERMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADERMARK_URL, data)
  }
}

//删除品牌接口 /admin/product/baseTrademark/remove/{id}
export const reqRemoveTrademark = (id: number) =>
  request.delete<any, any>(API.REMOVETRADEMARK_URL + `${id}`)

//获取1级分类接口的数据 /admin/product/getCategory1
export const reqGetCategoryone = () =>
  request.get<CategoryAll, any>(API.GETCATEGORY1_URL)

//获取2级分类接口的数据 /admin/product/getCategory2/{category1Id}
export const reqGetCategorytwo = (category1Id: number) =>
  request.get<CategoryAll, any>(API.GETCATEGORY2_URL + `${category1Id}`)

//获取3级分类接口的数据 /admin/product/getCategory3/{category2Id}
export const reqGetCategorythree = (category2Id: number) =>
  request.get<CategoryAll, any>(API.GETCATEGORY3_URL + `${category2Id}`)

//获取对应分类下的属性  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) =>
  request.get<AttrResponseData, any>(
    API.GETATTRINFO_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )

//添加｜修改 商品属性 /admin/product/saveAttrInfo
export const reqAddOrEditAttr = (data: Attr) =>
  request.post<any, any>(API.ADDOREDITATTR_URL, data)

//删除 商品属性 /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + `${attrId}`)

//获取对应分类下的spu /admin/product/{page}/{limit}
export const reqSpuList = (page: number, limit: number, category3Id: number) =>
  request.get<any, HasSpuResponseData>(
    API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

//获取全部SPU的数据 /admin/product/baseTrademark/getTrademarkList
export const reqSpuListAll = () =>
  request.get<any, ALLTradeMarkSPU>(API.GETSPUALL_URL)

//获取某一个spu售卖商品的图片  /admin/product/spuImageList/{spuId}
export const reqSpuImage = (spuId: number) =>
  request.get<any, ALLSpuImage>(API.GETSPUIMAGE_URL + `${spuId}`)

//获取某一个spu销售属性接口  /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSale = (spuId: number) =>
  request.get<any, ALLSpuSaLes>(API.GETSPUSALE_URL + `${spuId}`)

//获取整个项目全部的销售属性 /admin/product/baseSaleAttrList
export const reqSpuLists = () =>request.get<any,ALLSpuSaLess>(API.GETSPUSALELIST_URL)

//添加一个spu /admin/product/saveSpuInfo

//修改一个spu /admin/product/updateSpuInfo
