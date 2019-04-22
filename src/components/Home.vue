<template >
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="../assets/images/heima.png" alt="黑马">
        <span>电商后台管理系统</span>
      </div>
      <el-row>
        <el-button type="info">退出</el-button>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="asideFlag?'65px':'200px'">
        <div class="toggle-bar" @click="asideFlag=!asideFlag">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="asideFlag"
          :collapse-transition="false"
          :unique-opened="true"
        >
          <el-submenu
            :index="item.id.toString()"
            :style="{width:asideFlag?'65px':'200px'}"
            v-for="(item,k) in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="['iconfont','icon-'+iconList[k]]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="k+'-'+item2.id"
                v-for="item2 in item.children"
                :key="item2.id"
              ><i class="el-icon-menu"></i>{{ item2.authName }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenu()
  },
  data() {
    return {
      asideFlag: false,
      menuList: [],
      iconList: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getMenu() {
      const { data: dt } = await this.$http.get('/menus')
      console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      this.menuList = dt.data
    }
  }
}
</script>

<style lang = 'less'>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    padding: 0 20px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-box {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      span {
        font-size: 22px;
        color: #fff;
        user-select: none;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle-bar {
      height: 25px;
      line-height: 25px;
      background-color: #4a5064;
      color: #fff;
      text-align: center;
      font-size: 12px;
      letter-spacing: 0.1em;
      user-select: none;
      cursor: pointer;
    }
    .iconfont {
      margin-right: 10px;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
