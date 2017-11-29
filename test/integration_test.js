
Feature('Index')

Scenario('test page load', (I) => {
  I.amOnPage('/')
  I.see('Tocbot')
  I.seeElement('.is-active-link')
  I.saveScreenshot('tocbot.png', true)
})
