import express from 'express'; import Job from '../models/Job.js'; import auth from '../middleware/auth.js'
const router=express.Router();
router.get('/',async(req,res)=>{try{res.json(await Job.find({status:'open'}).populate('employerId','name').sort({createdAt:-1}))}catch(e){res.status(500).json({message:e.message})}})
router.post('/',auth,async(req,res)=>{try{if(req.user.role!=='employer')return res.status(403).json({message:'Only employers can post jobs'});const job=await Job.create({...req.body,employerId:req.user.id});res.status(201).json(job)}catch(e){res.status(400).json({message:e.message})}})
router.post('/:id/apply',auth,async(req,res)=>{try{if(req.user.role!=='worker')return res.status(403).json({message:'Only workers can apply'});const job=await Job.findById(req.params.id);if(!job)return res.status(404).json({message:'Job not found'});if(!job.applicants.some(x=>x.toString()===req.user.id))job.applicants.push(req.user.id);await job.save();res.json({message:'Application sent',job})}catch(e){res.status(400).json({message:e.message})}})
export default router
