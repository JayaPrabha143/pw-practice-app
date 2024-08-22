import { expect, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class DatePickerPage extends HelperBase{
    //private readonly page: Page

    constructor(page: Page){
        //this.page= page
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const datePickerField= await this.page.getByPlaceholder('Form Picker')
        await datePickerField.click()
        const datetoAssert=await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(datePickerField).toHaveValue(datetoAssert)
        
        
    }
    async selectDatePickerWithRangeFromtoday(startDayFromToday: number, endDayFromToday: number){
        const datePickerField= await this.page.getByPlaceholder('Range Picker')
        await datePickerField.click()
        const datetoAssertStart=await this.selectDateInTheCalendar(startDayFromToday)
        const datetoAssertEnd= await this.selectDateInTheCalendar(endDayFromToday)
        const datetoAssert= `${datetoAssertStart} - ${datetoAssertEnd}`
        await expect(datePickerField).toHaveValue(datetoAssert)

    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date= new Date()
  
  
        date.setDate(date.getDate()+ numberOfDaysFromToday)
  
        const expectedDate= date.getDate().toString()
        const expectedMonthShort= date.toLocaleString('En-US',{month: 'short'})
        const expectedMonthLong= date.toLocaleString('En-US',{month: 'long'})
        const expectedyear= date.getFullYear()
        const datetoAssert= `${expectedMonthShort} ${expectedDate}, ${expectedyear}`

        let calenderMonthAndYear= await this.page.locator('nb-calendar-view-mode').textContent()

        const expectedMonthAndyear = `${expectedMonthLong} ${expectedyear}`

        while(!calenderMonthAndYear.includes(expectedMonthAndyear)){
          await this.page.locator('nb-calendar-pageable-navigation button [data-name="chevron-right"]').click()
          //await this.page.locator('nb-calendar-pageable-navigation button').nth(1).click()
          calenderMonthAndYear= await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate,{exact: true}).first().click()
      return datetoAssert

    }

}
