<template>
  <div>
      <el-card class="box-card">
          <div class="tables">
              <el-form label-width="80px">
                  <el-form-item label="sku名称">
                      <el-input />
                  </el-form-item>
                  <el-form-item label="价格(元)">
                      <el-input />
                  </el-form-item>
                  <el-form-item label="重量(g)">
                      <el-input />
                  </el-form-item>
                  <el-form-item label="平台属性">
                      <el-select placeholder="please select your zone">
                          <el-option label="Zone one" value="shanghai" />
                      </el-select>
                  </el-form-item>
                  <el-form-item label="sku描述">
                      <el-input type="textarea" />
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit">保存</el-button>
                      <el-button>取消</el-button>
                  </el-form-item>
              </el-form>
          </div>
      </el-card>
  </div>
</template>

<script lang="ts" setup>
//保存按钮的回调
const onSubmit = () => {

}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .box-card {
    margin-top: 20px;
  }

</style>