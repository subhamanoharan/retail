import * as ItemsRepo from '../repositories/itemsRepo';

const post = async (req, res) => {
  const {name, mrp, sp} = req.body;
  const id = await ItemsRepo.insert({name, mrp, sp});
  res.json({id});
};

const all = async (req, res) => {
  const items = await ItemsRepo.all();
  res.json(items);
};

export default {post, all};
