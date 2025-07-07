# 六度后端（backend）

基于Node.js + Express + MongoDB的API服务。

## 主要功能
- 用户注册/登录（手机号+验证码模拟）
- 关系网数据增删改查
- 权限校验

## 依赖安装

```bash
cd backend
npm install
```

## 环境变量（.env）

```
PORT=4000
MONGODB_URI=你的MongoDB连接字符串
ADMIN_PHONE=18310546510
JWT_SECRET=自定义一串复杂密钥
```

## 本地启动

```bash
npm run dev
```

## Render 部署流程
1. 注册并登录 [Render](https://render.com/)
2. 新建 Web Service，连接你的GitHub仓库
3. 选择 Node 版本，Root Directory 设为 backend
4. 配置环境变量（同上）
5. 部署，获取API地址

## API接口文档

### 1. 发送验证码（测试环境）
POST /api/auth/send-code
- body: { phone: '手机号' }
- 返回: { code: '123456', message: '验证码已发送（测试环境）' }

### 2. 用户注册
POST /api/auth/register
- body: { phone: '手机号', password: '密码', code: '123456', nickname: '昵称' }
- 返回: { message: '注册成功' }

### 3. 用户登录
POST /api/auth/login
- body: { phone: '手机号', password: '密码' }
- 返回: { token, user: { phone, nickname, isAdmin } }

### 4. 新增关系节点
POST /api/relations
- headers: { Authorization: 'Bearer <token>' }
- body: { person: '姓名', relationType: '类型', level: 1, parent: '父节点id(可选)' }
- 返回: { message, relation }

### 5. 获取全部关系网
GET /api/relations
- headers: { Authorization: 'Bearer <token>' }
- 返回: { relations: [ ... ] }

### 6. 更新关系节点
PUT /api/relations/:id
- headers: { Authorization: 'Bearer <token>' }
- body: { person, relationType, level, parent }
- 返回: { message, relation }

### 7. 删除关系节点（及其所有子节点）
DELETE /api/relations/:id
- headers: { Authorization: 'Bearer <token>' }
- 返回: { message }

详细API接口文档见后续说明。 