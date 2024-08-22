import{expect, test} from '@playwright/test'

test.beforeEach(async ({ page }) => {
   
    await page.goto('http://localhost:4200/');
    //await page.getByText('Forms').click()
    //await page.getByText('Form layouts').click()
  });

  test.describe.only('Forms Layouts Page tests', () => {
    test.describe.configure({retries: 2})
    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click() 
    })

   test('input Fields', async({page}, testInfo)=>{
      if(testInfo.retry){
        //do something
      }

        const usingThegridEmailInput=page.locator('nb-card',{hasText: "using the grid"}).getByRole('textbox',{name: "Email"})
        await usingThegridEmailInput.fill('test@test.com')
        await usingThegridEmailInput.clear()
        await usingThegridEmailInput.pressSequentially('test@test.com')
       // await usingThegridEmailInput.pressSequentially('test@test.com',{delay: 500})


        //generic assertiion
        const emailInput= await usingThegridEmailInput.inputValue()

        expect(emailInput).toEqual('test@test.com')

        //Locator assertion

        await expect(usingThegridEmailInput).toHaveValue('test@test.com')


    })

    test('radio Button', async({page})=>{
        const usingTheGridForm=await page.locator('nb-card').filter({hasText: "Using the Grid"})
        

        //await usingTheGridForm.getByLabel('Option 1').check({force: true})

        await usingTheGridForm.getByRole('radio',{name: 'Option 1'}).check({force: true})

        //general Assertion 

        const radioButtonStatus1= await usingTheGridForm.getByRole('radio',{name: 'Option 1'}).isChecked()
        expect(radioButtonStatus1).toBeTruthy()

        //Locator assertion

        //await expect(usingTheGridForm.getByRole('radio',{name: 'Option 1'})).toBeChecked()



        await usingTheGridForm.getByRole('radio',{name: 'Option 2'}).check({force: true})
        const radioButtonStatus2= await usingTheGridForm.getByRole('radio',{name: 'Option 2'}).isChecked()

       expect(await usingTheGridForm.getByRole('radio',{name: 'Option 1'}).isChecked()).toBeFalsy()
       expect(radioButtonStatus2).toBeTruthy()

    
    }) 
  });



    test('check BoxTest',async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const allBoxes= page.getByRole('checkbox')

    // for (const  box of await allBoxes.all()){
    //     await box.check({force: true})
    //     expect(await box.isChecked()).toBeTruthy()

    // }
    for (const  box of await allBoxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy
        
    }

  })


  test('list and dropdown Test',async({page})=>{
    const dropDwonMenu= page.locator('ngx-header nb-select')

    await dropDwonMenu.click()

    page.getByRole('list')//when the list has a UL tag
    page.getByRole('list')//when the list has li tag

    //const optionList= page.getByRole('list').locator('nb-option')

    const optionList=page.locator('nb-option-list nb-option')

    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic","Corporate"])

    await optionList.filter({hasText: "Cosmic"}).click()

    const header=page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')


    const colors={
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",

    }


    await dropDwonMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color',colors[color])
        if(color!="Corporate")
           await dropDwonMenu.click()
    }

  })


  test('tool tip', async({page})=>{

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard= page.locator('nb-card',{hasText: "Tooltip Placements"})
    await tooltipCard.getByRole('button',{name: "top"}).hover()

    const tooltipdisplay= await page.locator('nb-tooltip').textContent()
    expect(tooltipdisplay).toEqual('This is a tooltip')
  })


  test('dialog Box tip', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr',{hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")    
  })


  test('web table', async({page})=>{

    //get the row by ant text in that row
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const rowtarget3= await page.getByRole('row', {name: 'twitter@outlook.com'})
    await rowtarget3.locator('.nb-edit').click()

    const ageedit=await page.locator('input-editor').getByPlaceholder('Age')
    await ageedit.clear()

    await ageedit.fill('45')
    await page.locator('.nb-checkmark').click()

    //get the row by specic value of the column
    const nextpage2=  await page.locator('.ng2-smart-pagination-nav').getByText('2')
    //await page.locator('ng2-smart-table-pager nav').getByText('3').click()
    await nextpage2.click()


    const rowspecific= await page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})

    await rowspecific.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill("test@jaya.com")
    await page.locator('.nb-checkmark').click()
    await expect(rowspecific.locator('td').nth(5)).toHaveText('test@jaya.com')

    //text filter of the table

    const ages=["20", "30", "40", "200"]

    for(let age of ages){
      await page.locator('input-filter').getByPlaceholder('Age').clear()
      await page.locator('input-filter').getByPlaceholder('Age').fill(age)
      await page.waitForTimeout(500)
      const ageRows = page.locator('tbody tr')

      for(let row of await ageRows.all()){
        const cellvalue= await row.locator('td').last().textContent()

        //expect(cellvalue).toEqual(age)     // before if state ment last 200 age error

        if(age=="200"){
          expect(await page.getByRole('table').textContent()).toContain('No data found')
        }else{
          expect(cellvalue).toEqual(age)
        }
      }

    }
  })

  test('date picker tests',async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    
    const datePickerField= await page.getByPlaceholder('Form Picker')
    await datePickerField.click()
    await page.waitForTimeout(5000)

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact: true}).click()
    await expect(datePickerField).toHaveValue('Aug 1, 2024')

    })


    test('date picker automatic',async({page})=>{
      await page.getByText('Forms').click()
      await page.getByText('Datepicker').click()
      
      const datePickerField= await page.getByPlaceholder('Form Picker')
      await datePickerField.click()
      
      let date= new Date()


      date.setDate(date.getDate()+ 7)

      const expectedDate= date.getDate().toString()
      const expectedMonthShort= date.toLocaleString('En-US',{month: 'short'})
      const expectedyear= date.getFullYear()
      const datetoAssert= `${expectedMonthShort} ${expectedDate}, ${expectedyear}`


      await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click()
    await expect(datePickerField).toHaveValue(datetoAssert)

  
      })


test('date picker automatic by certain month',async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()
        
        const datePickerField= await page.getByPlaceholder('Form Picker')
        await datePickerField.click()
        
        let date= new Date()
  
  
        date.setDate(date.getDate()+ 23)
  
        const expectedDate= date.getDate().toString()
        const expectedMonthShort= date.toLocaleString('En-US',{month: 'short'})
        const expectedMonthLong= date.toLocaleString('En-US',{month: 'long'})
        const expectedyear= date.getFullYear()
        const datetoAssert= `${expectedMonthShort} ${expectedDate}, ${expectedyear}`

        let calenderMonthAndYear= await page.locator('nb-calendar-view-mode').textContent()

        const expectedMonthAndyear = `${expectedMonthLong} ${expectedyear}`

        while(!calenderMonthAndYear.includes(expectedMonthAndyear)){
          //await page.locator('nb-calendar-pageable-navigation button [data-name="chevron-right"]').click()
          await page.locator('nb-calendar-pageable-navigation button').nth(1).click()
          calenderMonthAndYear= await page.locator('nb-calendar-view-mode').textContent()
        }

      
  
  
        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact: true}).click()
      await expect(datePickerField).toHaveValue(datetoAssert)
  
    
        })


        test('slides test', async({page})=>{
          // const tempGuage=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
          // await tempGuage.evaluate( node =>{
          //   node.setAttribute('cx','232.420146954767')
          //   node.setAttribute('cy','232.420146954767')
          // })
          // await tempGuage.click()





          //mouse movement 
          const tempBox=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
          await tempBox.scrollIntoViewIfNeeded()
          const box= await tempBox.boundingBox()
          const x= box.x + box.width/2
          const y= box.y + box.height/2

          await page.mouse.move(x,y)
          await page.mouse.down()
          await page.mouse.move(x+100,y)
          await page.mouse.move(x+100, y+100)
          await page.mouse.up()

          await expect(tempBox).toContainText('30')





        })












  