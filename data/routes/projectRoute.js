const express = require('express')
const router = express.Router()
const projectModel = require('../data/helpers/projectModel')

router.get('/', (req, res) => {
  projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: "Could not get project information."}))
})

router.get('/:id', async(req, res) => {
  try {
    const project = await projectModel.get(req.params.id)
    project
      ? res.status(200).json(project)
      : res.status(404).json({ message: "Could not find a project with that ID."})
  }
  catch (err) {
    res.status(500).json({ error: "Could not get project information."})
  }
})

router.post('/', async (req, res) => {
  if (req.body.name && req.body.name.length <129 && req.body.description) {
    try {
      const newProject = await projectModel.insert(req.body)
      const project = await projectModel.get(newProject.id)
      res.status(201).json(project)
    }
    catch (err) {
      res.status(500).json({ error: "Unable to add project."})
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const count = await projectModel.remove(req.params.id)
    count
      ? res.status(200).json({ message: "Project deleted.", id: `${req.params.id}`})
      : res.status(404).json({ message: "Could not find user with that id."})
  } 
  catch (err) {
    res.status(500).json({ error: "Unable to complete request."})
  }
})

router.put('/:id', async (req, res) => {
  if (req.body.name && req.body.name.length < 129 && req.body.description) {
    try {
      const count = await projectModel.update(req.params.id, req.body)
      if (count) {
        const project = await projectModel.get(req.params.id)
        res.status(200).json(project)
      } else {
        res.status(404).json({ message: "Could not find user with that id."})
      }
    } 
    catch (err) {
      res.status(500).json({ error: "Could not update project."})
    }
  }
})


module.exports = router
