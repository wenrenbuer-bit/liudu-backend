const Relation = require('../models/Relation');
const mongoose = require('mongoose');

// 新增关系节点
exports.create = async (req, res) => {
  const { person, relationType, level, parent } = req.body;
  if (!person || !relationType) {
    return res.status(400).json({ message: '关系人姓名和类型必填' });
  }
  const relation = new Relation({ person, relationType, level, parent });
  await relation.save();
  res.json({ message: '添加成功', relation });
};

// 获取全部关系网（树状结构）
exports.list = async (req, res) => {
  const relations = await Relation.find();
  res.json({ relations });
};

// 更新关系节点
exports.update = async (req, res) => {
  const { id } = req.params;
  const { person, relationType, level, parent } = req.body;
  const relation = await Relation.findOneAndUpdate(
    { _id: id },
    { person, relationType, level, parent },
    { new: true }
  );
  if (!relation) return res.status(404).json({ message: '未找到关系节点' });
  res.json({ message: '更新成功', relation });
};

// 删除关系节点（及其所有子节点）
exports.remove = async (req, res) => {
  const { id } = req.params;
  // 递归删除所有子节点
  const deleteRecursive = async (nodeId) => {
    const children = await Relation.find({ parent: nodeId });
    for (const child of children) {
      await deleteRecursive(child._id);
    }
    await Relation.deleteOne({ _id: nodeId });
  };
  await deleteRecursive(id);
  res.json({ message: '删除成功' });
}; 