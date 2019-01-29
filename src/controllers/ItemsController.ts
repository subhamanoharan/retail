import * as ItemsRepo from '../repositories/itemsRepo';

const post = async (req, res) => {
  const {name, barcode, sp} = req.body;
  try{
    const id = await ItemsRepo.insert({name, barcode, sp});
    res.json({id});
  } catch(error){
    console.error('Error when creating item', error);
    res.status(400).json({error});
  }
};

const all = async (req, res) => {
  const items = await ItemsRepo.all();
  res.json(items);
};

export default {post, all};
