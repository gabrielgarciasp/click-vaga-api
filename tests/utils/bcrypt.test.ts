import { encrypt, compare } from '../../src/utils/bcrypt'

const STRING = '123'
const HASH = '$2b$10$CU099K.eHD9x62/ApNLEH.ibjoncBXJ.lwXO5JmUcJLrmH2A0IhRi'

describe('Should encrypt', () => {
    it('Should hash', async () => {
        const hash = await encrypt(STRING)
        expect(hash).not.toBe(STRING)
    })
})

describe('Should compare', () => {
    it('Should return true', async () => {
        const equals = await compare(STRING, HASH)
        expect(equals).toBe(true)
    })

    it('Shold return false', async () => {
        const equals = await compare(STRING + 'ABC', HASH)
        expect(equals).toBe(false)
    })
})
