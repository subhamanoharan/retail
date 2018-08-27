import * as ItemsRepo from '../repositories/itemsRepo';

const post = async (req, res) => {
  const id = await ItemsRepo.insert({name: 'Subha'});
  res.json({id});
};

export default {post};
