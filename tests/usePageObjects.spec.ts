import{expect, test} from '@playwright/test'
import{NavigationPage} from '../page-objects/navigationPage' 
import { FormLayoutsPage } from '../page-objects/formlayoutsPage'
import { on } from 'cluster'
import { DatePickerPage } from '../page-objects/datePickerPage'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'





test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test('naviagtion to form page', async({page})=>{
    const pm= new PageManager(page)
    
    await pm.navigateTo().formLayutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toasterPage()
    await pm.navigateTo().toolTipPage()
})

test('paramerizedMethods', async({page})=>{
    const pm= new PageManager(page)
    const randomFullName= faker.person.fullName()
    const randomEmail= `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    
    await pm.navigateTo().formLayutsPage()
    await pm.onFormslayoutspage().submitUsingTheGridFormWithCredentialsAndSelectOptions('test@test.com','Welcome1','Option 2')
    await pm.onFormslayoutspage().submitInlineFormWithNameEmailandCheckBOx(randomFullName,randomEmail, false)
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromtoday(3,10)
    
})