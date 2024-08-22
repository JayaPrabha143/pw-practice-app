import{expect, test} from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form layouts').click()

})

test('Locators syntaxtest',async ({page})=>{
    //by tag name
    //await page.locator('input').click()

    // by id
    await page.locator('#inputEmail1').fill("jaya")
    //by class
    page.locator('.shape-rectangle')
    //by attributes
    page.locator('[placeholder="Email"]')

    //by class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine diiferent selectors
    page.locator('input[placeholder="Email"]')

    // by xpath

    page.locator('//*[@id="inputEmail1"]')

    //by partial match
    page.locator(':text("using")')

    //by exact match
    page.locator(':text-is("Using the grid")')

})

test('user facing locators', async({page}) =>{

    await page.getByRole('textbox',{name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId("SignIn").click()
    await page.getByTitle('IoT Dashboard').click()
})

test('using child elements', async({page})=>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name:"sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()


        })

        test('using parent elements', async({page})=>{

            await page.locator('nb-card', { has:page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()
            await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('button',{name: "sign in"}).click()
            await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button',{name: "submit"}).click()
            await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()
            await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "sign in"}).getByRole('textbox',{name:"Email"}).click()
        })    
        
        test('Reusing the locator', async ({page})=>{
            const basicForm=page.locator('nb-card').filter({hasText: "Basic form"})
            const emailField=basicForm.getByRole('textbox',{name:"Email"})
            const submitBasicForm=basicForm.getByRole('button',{name: "submit"})

            // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name:"Email"}).fill('test@test.com')
            // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name:"Password"}).fill('Welcome123')
            // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button',{name: "submit"}).click()

            await emailField.fill('test@test.com')
            await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name:"Password"}).fill('Welcome123')
            await basicForm.locator('nb-checkbox').click()
            await submitBasicForm.click()
            await expect(emailField).toHaveValue('test@test.com')

        })

        test('extracting values',async({page})=>{
            const basicForm=page.locator('nb-card').filter({hasText: "Basic form"})
            const emailField=basicForm.getByRole('textbox',{name:"Email"})
            const submitBasicForm=await basicForm.getByRole('button',{name: "submit"}).textContent()

            expect (submitBasicForm).toEqual('Submit')

            //all text values

            const allradiobuttonvalues= await page.locator('nb-radio').allTextContents()

            expect(allradiobuttonvalues).toContain('Option 1')

            //input values
            await emailField.fill('test@test.com')
            const emailValue= await emailField.inputValue()

            expect(emailValue).toEqual('test@test.com')

        })

        test('assertion', async({page})=>{
            //General assertions

            const value=6
            expect(value).toEqual(6)

            const basicForm=page.locator('nb-card').filter({hasText: "Basic form"})
            const emailField=basicForm.getByRole('textbox',{name:"Email"})
            const basicFormSubmit=await basicForm.getByRole('button',{name: "submit"})
            const text=await basicFormSubmit.textContent()
            expect(text).toEqual('Submit') 

            //locator assertion
            await  expect(basicFormSubmit).toHaveText('Submit')

            //soft
            await  expect.soft(basicFormSubmit).toHaveText('Submit33')
           await basicFormSubmit.click()
        })

        




