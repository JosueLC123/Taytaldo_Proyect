import { faqs } from '../const/const.js'

export class NosotrosController {
  static async show (req, res) {
    return res.render('pages/nosotros', { faqs })
  }
}
