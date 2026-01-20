import Conversation from "../models/Conversation.js";

const newConvoPostController=async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
};


//get all conversation for a perticular user
const getConvoForUserController=async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },//inside object of array
        //check in each array where ever the user id is present fetch those
        //convo
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
};

//get user chat 

const getUserChatWithOtherUser_Controller=async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
};


export {newConvoPostController,getConvoForUserController,getUserChatWithOtherUser_Controller};