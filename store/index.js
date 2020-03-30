import AppGlobalModel from '../models/Global.js';
import Index from '../models/Index.model.js';
import Get_start from '../models/Get_start.model.js';
import Test from '../models/Test.model.js';


export default {
  appGlobalModel: new AppGlobalModel(),
  modelIndex: new Index(),
  modelGet_start: new Get_start(),
  modelTest: new Test(),

};
