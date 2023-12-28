<template>
    <div>
        <el-card class="box-card">
            <div class="tables">
                <el-form label-width="100px">
                    <el-form-item label="spu名称">
                        <el-input />
                    </el-form-item>
                    <el-form-item label="spu品牌">
                        <el-select placeholder="please select your zone">
                            <el-option label="Zone one" value="shanghai" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="spu描述">
                        <el-input type="textarea" />
                    </el-form-item>
                    <el-form-item label="spu照片">
                        <el-upload v-model:file-list="fileList"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>

                        <el-dialog v-model="dialogVisible">
                            <img w-full :src="dialogImageUrl" alt="Preview Image" />
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="spu销售属性">
                        <el-select placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-button type="primary" :icon="Plus" style="margin-left: 10px;">添加销售属性</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-table border>
                            <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                            <el-table-column prop="name" label="属性名" width="120" align="center"></el-table-column>
                            <el-table-column prop="address" label="属性值" align="center"></el-table-column>
                            <el-table-column prop="address" label="操作" width="120" align="center">
                                <template #="row, $index">
                                    <el-button type="danger" :icon="Delete"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { reqSpuListAll, reqSpuImage, reqSpuSale, reqSpuLists } from "@/api/product/index";
import type { SPUData, ALLTradeMarkSPU, ALLSpuImage, ALLSpuSaLes, ALLSpuSaLess, TradeMarkSPU, SpuImg,SpuSaLes, SpuSaLess } from "@/api/product/type";
import { Plus, Delete } from '@element-plus/icons-vue'

let $emit = defineEmits(['change']);

// spu名称
let spuName = ref<string>()

//spu描述
let spuDescription = ref<string>()

//spu品牌数据存储
let spuAttr = ref<TradeMarkSPU[]>([])

//spu图片数据存储
let spuImage = ref<SpuImg[]>([])

//spu全部销售属性数据存储
let spuSaless = ref<SpuSaLess[]>([])

//spu销售属性数据存储
let spuSales = ref<SpuSaLes[]>([])

// 获取数据
const getData = async (data: SPUData) => {
    //获取全部品牌的数据
    let result: ALLTradeMarkSPU = await reqSpuListAll();
    // 获取spu照片
    let result1: ALLSpuImage = await reqSpuImage(data.id as number);
    //获取销售属性下拉框数据
    let result2: ALLSpuSaLess = await reqSpuLists();
    //获取销售属性
    let result3: ALLSpuSaLes = await reqSpuSale(data.id as number);
    //存储全部品牌的数据
    spuAttr.value = result.data;
    //存储全部品牌图片的数据
    spuImage.value = result1.data;
    //存储全部销售属性的数据
    spuSaless.value = result2.data;
    //存储销售属性的数据
    spuSales.value = result3.data;
    //存储spu名字
    spuName.value = data.spuName;
    //存储spu描述
    spuDescription.value = data.description;
    
}

//保存按钮的回调
const onSubmit = () => {
    $emit('change', 1);
}

//取消按钮的回调
const cancel = () => {
    $emit('change', 1);
}

//对外暴漏
defineExpose({ getData })
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
}
</style>