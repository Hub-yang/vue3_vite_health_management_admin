<template>
  <div class="footer-main">
    <el-row :gutter="20">
      <el-col :span="4"><el-link class="link-title">With Underline</el-link></el-col>
      <el-col :span="4"><el-link class="link-title">With Underline</el-link></el-col>
      <el-col :span="4"><el-link class="link-title">With Underline</el-link></el-col>
      <el-col :span="4"><el-link class="link-title">With Underline</el-link></el-col>
      <el-col :span="4"><el-link class="link-title">With Underline</el-link></el-col>
      <el-col :span="4"><el-link class="link-title">With Underline</el-link></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><svg-icon name="test" class="svg-icon"></svg-icon></el-col>
      <el-col :span="6"><svg-icon name="test" class="svg-icon"></svg-icon></el-col>
      <el-col :span="6"><svg-icon name="test" class="svg-icon"></svg-icon></el-col>
      <el-col :span="6"><svg-icon name="test" class="svg-icon"></svg-icon></el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="copyright-text">Copyright © 2022 Soft by Creative Tim.</el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.footer-main {
  width: 100%;
  height: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.svg-icon,
.link-title,
.copyright-text {
  color: $title-color;
  cursor: pointer;
}

.link-title :hover {
  color: #5a9cf8;
}
</style>
