const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem');


// POST route to add a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get method to get the MenuItem
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:taste', async(req, res)=> {
    try{
        const taste = req.params.taste; // Extract the taste from the URL parameter
        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour' ){
            const response = await MenuItem.find({taste: taste});
            console.log('respose fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res) => {
  try{
    const MenuItemId = req.params.id; // Extract the id from the URL parameter
    const updatedMenuItemData = req.body; // Updated data for the MenuItem

    const response = await MenuItem.findByIdAndUpdate( MenuItemId, updatedMenuItemData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    })

    if(!response){
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data updated');
    res.status(200).json(response);

  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const MenuItemId = req.params.id; // Extract the MenuItem's ID from the URL parameter

    // Assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndDelete(MenuItemId);
    if(!response){
      return res.status(404).json({error: 'MenuItem not found'});
    }
    console.log('data delete');
    res.status(200).json({message: 'MenuItem Deleted Succesfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;