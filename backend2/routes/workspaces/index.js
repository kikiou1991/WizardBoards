const {v4: uuidv4} = require('uuid');
module.exports = async (app, db, io) => {
  let namespace = io.of('/api/v2/workspaces');
  app.get('/api/v2/workspaces', async (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user._id) {
        return res.status(400).json({message: 'Invalid user information', success: false, data: null});
      }
      const workspaces = await db.collection('workspaces').find({users: user._id}).toArray();

      return res.status(200).json({
        success: true,
        message: 'Workspaces fetched successfully',
        data: workspaces,
      });
    } catch (error) {
      console.error(error, 'Failed to get boards');
      next(error);
    }
  });

  app.post('/api/v2/workspaces', async (req, res, next) => {
    try {
      const {data} = req.body;

      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({message: 'Invalid user information', success: false, data: null});
      }
      if (data?.uuid) {
        const workspace = await db.collection('workspaces').findOneAndUpdate({uuid: data.uuid}, {$set: {...data}}, {returnDocument: 'after', returnNewDocument: true});
        let updatedWorkspace = await db.collection('workspaces').findOne({uuid: data.uuid});
        namespace.emit('workspace', {type: 'update', data: workspace});
        return res.status(200).json({success: true, message: 'Workspace updated successfully', data: workspace});
      } else {
        const uuid = uuidv4();
        const workspace = await db.collection('workspaces').insertOne({...data, users: [user.uuid], uuid, _id: uuid}, {returnDocument: 'after', returnNewDocument: true});
        let created = await db.collection('workspaces').findOne({uuid: workspace.insertedId});
        namespace.emit('workspace', {type: 'create', data: created});
        return res.status(201).json({success: true, message: 'Workspace created successfully', data: created});
      }
    } catch (error) {
      console.error(error, 'Failed to create board');
      next(error);
    }
  });
  app.post('/api/v2/workspaces/archive', async (req, res, next) => {
    try {
      const {workspaceUUID} = req.body;
      const user = req.user;
      if (!user || !user._id) {
        return res.status(400).json({message: 'Invalid user information', success: false, data: null});
      }
      if (!workspaceUUID) {
        return res.status(400).json({message: 'Invalid workspace information', success: false, data: null});
      }
      const workspace = await db.collection('workspaces').findOne({uuid: workspaceUUID});
      if (!workspace) {
        return res.status(400).json({message: 'Invalid workspace information', success: false, data: null});
      }
      const deletedWorkspace = await db.collection('workspaces').findOneAndDelete({uuid: workspaceUUID}, {returnDocument: 'after', returnNewDocument: true});
      namespace.emit('workspace', {type: 'delete', data: deletedWorkspace});
      return res.status(200).json({success: true, message: 'Workspace deleted successfully', data: deletedWorkspace});
    } catch (error) {
      console.error(error, 'Failed to archive board');
      next(error);
    }
  });
};
