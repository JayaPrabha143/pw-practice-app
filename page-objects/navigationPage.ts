import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
export class NavigationPage extends HelperBase{
    //readonly page: Page



    // readonly formsLayoutMenuItem: Locator
    // readonly datePickerMenuItem: Locator
    // readonly smartTableMenuItem: Locator
    // readonly toastermenuitem: Locator
    // readonly toolTipmenuItem: Locator

    constructor(page: Page){
        //this.page=page

        super(page)




        // this.formsLayoutMenuItem= page.getByText('Form Layouts')
        // this.datePickerMenuItem=page.getByText('Datepicker')
        // this.smartTableMenuItem=page.getByText('Smart Table')
        // this.toastermenuitem=page.getByText('Toastr')
        // this.toolTipmenuItem=page.getByText('Tooltip')
    }
    async formLayutsPage(){
        //await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        //await this.page.waitForTimeout(1000)
        await this.page.getByText('Form Layouts').click() 
        //await this.formsLayoutMenuItem.click()
        await this.waitForNumberOfSeconds(2)
        
    }
    async datePickerPage(){
        //await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
        //await this.datePickerMenuItem.click()


    }
    async smartTablePage(){
        //await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
        //await this.smartTableMenuItem.click()
        
        
    }
    async toasterPage(){
        //await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
       // await this.toastermenuitem.click()
        
    }
    async toolTipPage(){
        //await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
        //await this.toolTipmenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem= this.page.getByTitle(groupItemTitle)
        const expandedstate= await groupMenuItem.getAttribute('aria-expanded')
        if(expandedstate == "false")
        {
            await groupMenuItem.click()
        }
        
    }
}