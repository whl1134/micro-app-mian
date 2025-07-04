import Base64 from 'crypto-js/enc-base64'
import UTF8 from 'crypto-js/enc-utf8'
import { JSEncrypt } from 'jsencrypt'
import md5 from 'crypto-js/md5'
import CryptoJS from 'crypto-js'

export const encodeByBase64 = (txt) => {
  return UTF8.parse(txt).toString(Base64)
}

export const decodeByBase64 = (txt) => {
  return Base64.parse(txt).toString(UTF8)
}

export const encryptByMd5 = text => {
  return md5(txt).toString()
}

const publicKey
  = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM51dgYtMyF+tTQt80sfFOpSV27a7t9u'
  + 'aUVeFrdGiVxscuizE7H8SMntYqfn9lp8a5GH5P1/GGehVjUD2gF/4kcCAwEAAQ=='

export const encryptByRsa = (txt) => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

const defaultKeyWork = 'XwKsGlMcdPMEhR1B'

export const encryptByAes = (word, keyWord = defaultKeyWork) => {
  const key = CryptoJS.enc.Utf8.parse(keyWord)
  const arcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(arcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}
