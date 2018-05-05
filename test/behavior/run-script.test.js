'use strict'

const expect = require('chai').expect
const Browser = require('../../src')

describe('Run scritpts in loaded HTML', () => {

  it('Run a script code in SCRIPT tag after BODY tag.', done => {
    const browser = new Browser()
    browser.addContent('http://test/script', `
<!DOCTYPE html>
<html>
<head>
<title>Test</title>
<meta charset="utf-8"/>
</head>
<body>
</body>
<script>
document.body.innerHTML = '<p>Hello</p>';
</script>
</html>
`)
    const window = browser.openWindow('http://test/script')
    window.addEventListener('load', () => {
      expect(window.document.querySelector('p').textContent).to.equal('Hello')
      done()
    })
  })

})
