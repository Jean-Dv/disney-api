import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, path.join(__dirname, '..', 'public', 'characters', 'images'))
  },
  filename(_req, file, callback) {
    const ext = file.originalname.split('.').pop() as string
    callback(null, `${file.fieldname}-${Date.now()}.${ext}`)
  }
})

const upload = multer({ storage })

export { upload }
