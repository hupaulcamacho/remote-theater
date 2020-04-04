var express = require ('express')
var router = express.Router()
const viewers = require('../database/queries/viewer')


router.get('/', async (req, res) => {
    try {
        let allViewers = await viewers.getAllViewer()
        res.json({
            payload: allViewers,
            msg: 'success',
            err: false
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            payload: null,
            msg: error,
            err: true
        })
    }
})

router.get('/:video_id', async (req, res) => {
    const {video_id} = req.params
    try {
       const viewersByVideoID = await viewers.getAllViewerByVideoID(video_id)
        res.json({
            payload: viewersByVideoID,
            message:"got all viewers by video id",
            err: false
        })
    }catch (err){
        // console.log(error)
        res.status(500).json({
            payload: null,
            msg: error,
            err: true
        })
    }
});

module.exports = router;