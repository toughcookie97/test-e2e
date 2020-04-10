describe('add todo', function () {
    let page

    before (async function () {
      page = await browser.newPage()
      await page.goto('http://127.0.0.1:10000/')
    })

    after (async function () {
      await page.close()
    })

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('React App')
    })

    it('should have 2 items at begin', async () => {
      let todoList = await page.waitFor('#todo')
      const expectNumber = await page.evaluate(todoList => todoList.querySelectorAll('.item').length, todoList)
      expect(expectNumber).to.eql(2)
    })

    it('should new todo correct', async function() {
      await page.click('#new-item', {delay: 500})
      await page.type('#new-item', 'new todo item', {delay: 50})
      await page.click('#new-item-btn', {delay: 500})
      let todoList = await page.waitFor('#todo')
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList)
      expect(expectInputContent).to.eql('new todo item')
    })

    it('should delete todo correct', async () => {
      let todoList = await page.waitFor('#todo')
      await page.click('#React_practice', {delay: 300})
//       todoList = await page.waitFor('#todo')
      const expectNumber = await page.evaluate(todoList => todoList.querySelectorAll('.item').length, todoList)
      expect(expectNumber).to.eql(2)
    })
  })
