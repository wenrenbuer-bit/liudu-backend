const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 关系网所属用户
  person: { type: String, required: true }, // 关系人姓名
  relationType: { type: String, required: true }, // 关系类型（如老板、同事、下属等）
  level: { type: Number, default: 1 }, // 层级
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Relation', default: null }, // 上级关系节点
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Relation', relationSchema); 