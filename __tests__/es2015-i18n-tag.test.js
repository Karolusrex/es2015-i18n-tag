import Intl from 'intl'
import i18n, { i18nConfig }  from '../lib'
import groupedClass, { groupedClass2 } from './data/groupedClass'

const decorated = new groupedClass('1', '2')
const decorated2 = new groupedClass2()

Intl.__applyLocaleSensitivePrototypes()
global.Intl = Intl

describe('es2015-i18n-tag', () => {
    it('should fallback to default config', () => {
        const name = 'Steffen'
        const amount = 1250.33

        const actual = i18n('unknown', 'unknown')`Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual).toMatchSnapshot()
    })

    it('should not translate', () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locales: 'en-US',
            number: {
                currency: 'USD'
            }
        })

        const actual = i18n`Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual).toMatchSnapshot()
    })

    it('should fail on unknown types', () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locales: 'en-US',
            number: {
                currency: 'USD'
            }
        })

        try {
            i18n`Hello ${name}, you have ${amount}:q in your bank account.`
        } catch(err) {
            expect(err).toMatchSnapshot()
        }
    })

    it('should translate to german', () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locales: 'de-DE',
            translations: {
                'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.'
            },
            number: {
                currency: 'EUR'
            }
        })

        const actual = i18n`Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual).toMatchSnapshot()
    })

    it('should format fractionals', () => {
        const name = 'Steffen'
        const number = 0.1365

        i18nConfig({
            locales: 'en-US'
        })

        const actual = i18n`Hello ${name}, the number is ${number}:n(2).`
        expect(actual).toMatchSnapshot()
    })

    it('should ignore unknown custom number formatters', () => {
        const name = 'Steffen'
        const number = 0.1365

        i18nConfig({
            locales: 'en-US'
        })

        const actual = i18n`Hello ${name}, the number is ${number}:n(x).`
        expect(actual).toMatchSnapshot()
    })

    it('should format decimals', () => {
        const name = 'Steffen'
        const number = 0.1365

        i18nConfig({
            locales: 'de-DE'
        })

        const actual = i18n`Hello ${name}, the number is ${number}:n.`
        expect(actual).toMatchSnapshot()
    })

    it('should format percentage', () => {
        const name = 'Steffen'
        const percentage = 0.1

        i18nConfig({
            locales: 'en-US'
        })

        const actual = i18n`Hello ${name}, the percentage is ${percentage}:p.`
        expect(actual).toMatchSnapshot()
    })

    it('should format currency', () => {
        const name = 'Steffen'
        const amount = 0.1

        i18nConfig({
            locales: 'en-US'
        })

        const actual = i18n`Hello ${name}, the amount is ${amount}:c(EUR).`
        expect(actual).toMatchSnapshot()
    })

    it('should support nested templates', () => {
        i18nConfig({
            locales: 'en-US'
        })

        const hello = [
            { name: 'Steffen', percentage: 0.2 },
            { name: 'Jack', percentage: 0.8 }
        ]

        const actual = i18n`
        <users>
        ${hello.map((item) => i18n`
            <user name="${item.name}">${item.percentage}:p</user>
        `).join('')}
        </users>`

        expect(actual).toMatchSnapshot()
    })

    it('should support date format', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'de-DE',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t.`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "d"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(d).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "D"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(D).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "f"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(f).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "F"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(F).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "g"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(g).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "G"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(G).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "M", "m"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(m).`
        expect(actual).toMatchSnapshot()
    })

    it('should support standard date format string "O", "o"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(o).`
        expect(actual).toMatchSnapshot()
    })

    it('should support standard date format string "R", "r"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(r).`
        expect(actual).toMatchSnapshot()
    })

    it('should support standard date format string "t"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(t).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "T"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(T).`
        expect(actual).toMatchSnapshot()

    })

    it('should support standard date format string "Y", "y"', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'en-US',
            date: {
                timeZone: 'UTC'
            }
        })

        const actual = i18n`The date is ${date}:t(y).`
        expect(actual).toMatchSnapshot()
    })

    it('should ignore missing standard formatters', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'de-DE',
            standardFormatters: {
                date: {
                    y: () => 'test'
                }
            }
        })

        const actual = i18n`The date is ${date}:t(w) ${'test123'}:s(z).`
        expect(actual).toMatchSnapshot()
    })

    it('should support custom standard formatters', () => {
        const date = new Date('Thu, 20 Dec 2012 18:00:00 UTC')

        i18nConfig({
            locales: 'de-DE',
            standardFormatters: {
                number: {
                    x: (locales, numberOptions, value) => value.toLocaleString(locales, Object.assign({}, numberOptions, { style: 'percent' }))
                },
                date: {
                    x: () => 'test'
                },
                string: {
                    z: () => 'test321'
                }
            }
        })

        const actual = i18n`${0.77}:n(x) ${date}:t(x) ${'test123'}:s(z)`
        expect(actual).toMatchSnapshot()
    })

    it('should support translation groups', () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            translations: {
                testgroup: {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.'
                }
            },
            number: {
                currency: 'EUR'
            }
        })

        const actual = i18n('testgroup') `Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual).toMatchSnapshot()
    })

    it('should support translation group config', () => {
        const name = 'Steffen'
        const amount = 1250.33

        i18nConfig({
            locales: 'de-DE',
            group: 'my-lib',
            translations: {
                testgroup: {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.'
                },
                'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}'
            },
            number: {
                currency: 'EUR'
            }
        })

        i18nConfig({
            translations: {
                'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.',
                testgroup: {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}'
                }
            },
            number: {
                currency: 'EUR'
            }
        })

        const actual = i18n('testgroup', 'my-lib') `Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual).toMatchSnapshot()

        const actualDefault = i18n('', 'my-lib')`Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actualDefault).toMatchSnapshot()

        const actual2 = i18n('testgroup') `Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual2).toMatchSnapshot()

        const actual2Default = i18n`Hello ${name}, you have ${amount}:c in your bank account.`
        expect(actual2Default).toMatchSnapshot()
    })

    it('should support ES2016 style group class decorator', () => {
        i18nConfig({
            locales: 'de-DE',
            translations: {
                'custom group': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.'
                },
                'common': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hey ${0}'
                }
            },
            number: {
                currency: 'EUR'
            }
        })
        const actual = decorated.getText()
        expect(actual).toMatchSnapshot()
    })

    it('should support inline override of ES2016 decorator', () => {
        i18nConfig({
            locales: 'de-DE',
            translations: {
                'custom group': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}, Sie haben ${1} auf Ihrem Bankkonto.'
                },
                'common': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hey ${0}'
                }
            },
            number: {
                currency: 'EUR'
            }
        })
        const actual = decorated.getCommonText()
        expect(actual).toMatchSnapshot()
    })

    it('should support ES2015 style group class decorator', () => {
        i18nConfig({
            locales: 'de-DE',
            translations: {
                'custom group 2': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}'
                },
                'common 2': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hey Ho ${0}'
                }
            },
            number: {
                currency: 'EUR'
            }
        })
        const actual = decorated2.getText()
        expect(actual).toMatchSnapshot()
    })

    it('should support inline override of ES2015 decorator', () => {
        i18nConfig({
            locales: 'de-DE',
            translations: {
                'custom group 2': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hallo ${0}'
                },
                'common 2': {
                    'Hello ${0}, you have ${1} in your bank account.': 'Hey Ho ${0}'
                }
            },
            number: {
                currency: 'EUR'
            }
        })
        const actual = decorated2.getCommonText()
        expect(actual).toMatchSnapshot()
    })
})


