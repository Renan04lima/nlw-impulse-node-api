import { env } from '@/main/config/env'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/login/github', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${env.github.clientId}`)
  })

  router.get('/signin/callback', async (req, res) => {
    const { code } = req.query
    res.json(code)
  })
}
