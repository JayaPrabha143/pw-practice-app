import{expect, test} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach(async({page})=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

})

test('autoWaiting test', async({page})=>{

    const successButton= page.locator('.bg-success')
    // await successButton.click()

    // //const text=await successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text=await successButton.allTextContents()

    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
    


})

test.skip('alternativeWaits test', async({page})=>{

    const successButton= page.locator('.bg-success')

    //____await for the  element

          //await page.waitForSelector('.bg-success')

    //-___Await for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

     // wait for network calls to be completed

     await page.waitForLoadState('networkidle')
    

    const text=await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')


})

test.skip('timeOuts test', async({page})=>{

    const successButton= page.locator('.bg-success')
    await successButton.click({timeout: 16000})


})



