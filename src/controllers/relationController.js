const Relation = require('../models/Relation');
const mongoose = require('mongoose');

// 新增关系节点
exports.create = async (req, res) => {
  const { person, relationType, level, parent } = req.body;
  const owner = req.user.userId;
  if (!person || !relationType) {
    return res.status(400).json({ message: '关系人姓名和类型必填' });
  }
  const relation = new Relation({ owner, person, relationType, level, parent });
  await relation.save();
  res.json({ message: '添加成功', relation });
};

// 获取当前用户的全部关系网（树状结构）
exports.list = async (req, res) => {
  const owner = req.user.userId;
  const relations = await Relation.find({ owner });
  res.json({ relations });
};

// 更新关系节点
exports.update = async (req, res) => {
  const { id } = req.params;
  const { person, relationType, level, parent } = req.body;
  const owner = req.user.userId;
  const relation = await Relation.findOneAndUpdate(
    { _id: id, owner },
    { person, relationType, level, parent },
    { new: true }
  );
  if (!relation) return res.status(404).json({ message: '未找到关系节点' });
  res.json({ message: '更新成功', relation });
};

// 删除关系节点（及其所有子节点）
exports.remove = async (req, res) => {
  const { id } = req.params;
  const owner = req.user.userId;
  // 递归删除所有子节点
  const deleteRecursive = async (nodeId) => {
    const children = await Relation.find({ parent: nodeId, owner });
    for (const child of children) {
      await deleteRecursive(child._id);
    }
    await Relation.deleteOne({ _id: nodeId, owner });
  };
  await deleteRecursive(id);
  res.json({ message: '删除成功' });
}; 