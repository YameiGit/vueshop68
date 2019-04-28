<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区-->
    <el-card class="box-card">
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
        <el-form :rules="editUserRules" ref="editUserRef" :model="editUser" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUser.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="editUser.mobile"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="xiugai()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="50%"
        @close="$refs.addUserRef.resetFields()"
      >
        <el-form :rules="addUserRules" ref="addUserRef" :model="addUser" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUser.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="addUser.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addUser.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="tianjia()">确 定</el-button>
        </span>
      </el-dialog>
      <!--搜索框 和 添加按钮-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="querycdt.query"
            class="input-with-select"
            clearable
            @click="getUserList()"
            @keyup.enter.native="getUserList()"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格展示数据-->
      <!-- <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>-->
      <!--表格展示数据-->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <el-switch v-model="info.row.mg_state" slot-scope="info"></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="270">
          <template slot-scope="info">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(info.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(info.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              constent="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querycdt.pagenum"
        :page-sizes="[2,5,10,15]"
        :page-size="5"
        layout="total,sizes,prev,pager,next,jumper"
        :total="80"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 生命周期
  created() {
    this.getUserList()
  },
  methods: {
    xiugai() {
      this.$refs.editUserRef.validate(async valid => {
        if (valid === true) {
          // 校验成功处理， 收集数据存储入库
          const { data: dt } = await this.$http.put(
            'users/' + this.editUser.id,
            this.editUser
          )
          // 修改失败提示
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          } // 修改成功：关闭对话框、成功提示、页面数据更新
          this.editDialogVisible = false
          this.$message.success(dt.meta.msg)
          this.getUserList()
        }
      })
    },
    async showEditDialog(id) {
      // 根据id获取被修改用户的信息
      const { data: dt } = await this.$http.get('users/' + id)
      // console.log(dt)
      // 把获得好的修改用户信息赋予给editUser成员
      this.editUser = dt.data
      // 显示对话框
      this.editDialogVisible = true
    },
    // 删除用户
    // param id: 被删除用户的id
    delUser(id) {
      // 确认
      this.$confirm('确定要删除该用户么?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // axios调用api删除数据
          const { data: dt } = await this.$http.delete('users/' + id)
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          // 删除成功：消息提示、刷新数据
          this.$message.success(dt.meta.msg)
          if (this.userList.length === 1 && this.querycdt.pagenum > 1) {
            this.querycdt.pagenum--
          }
          this.getUserList()
        })
        .catch(() => {})
    },
    tianjia() {
      // 先校验form表单，validate
      this.$refs.addUserRef.validate(async valid => {
        if (valid === true) {
          // 表单校验成功
          const { data: dt } = await this.$http.post('users', this.addUser)
          // 添加失败
          if (dt.meta.status !== 201) {
            return this.$message.error(dt.meta.msg)
          }
          // 添加成功:关闭对话框、成功提示、刷新用户列表
          this.dialogVisible = false
          this.$message.success(dt.meta.msg)
          this.getUserList()
        }
      })
    },
    handleSizeChange(val) {
      this.querycdt.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.querycdt.pagenum = val
      this.getUserList()
    },
    // 获取用于显示的用户列表数据
    async getUserList() {
      // axios获得用于使用的数据列表
      const { data: dt } = await this.$http.get('users', {
        params: this.querycdt
      })
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      this.tot = dt.data.total
      this.userList = dt.data.users // 把获取好的用户列表数据存储给userList成员
    }
    // editDialogClose(){}
  },
  data() {
    var checkMobile = (rule, value, callback) => {
      var reg = /^1[35789]\d{9}$/
      if (!reg.test(value)) {
        // 校验失败(请给页面提示错误信息)
        return callback(new Error('手机号码格式不正确'))
      }
      // 校验成功，继续执行
      callback()
    }
    return {
      editDialogVisible: false,
      // 校验表单项目
      editUserRules: {
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 表单数据对象
      editUser: {
        username: '',
        mobile: '',
        email: ''
      },
      addUserRules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          // 自定义校验手机号码规则
          // { validator: 校验函数, trigger: 'blur' }
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      addUser: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      dialogVisible: false, // 对话框是否显示
      tot: 0,
      userList: [],
      querycdt: {
        query: '', // 搜索关键字
        pagenum: 1, // 当前页码
        pagesize: 3 // 每页显示数据条数
      }
    }
  }
}
</script>

<style lang = 'less'>
</style>
