import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    //private readonly page: Page

    constructor(page: Page){
        //this.page=page
        super(page)
    }
    async submitUsingTheGridFormWithCredentialsAndSelectOptions(email: string, password: string, optionText: string){
        const usingTheGridForm=this.page.locator('nb-card',{hasText: "using the grid"})
        await usingTheGridForm.getByRole('textbox',{name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox',{name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio',{name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
    

    /**
     * This method will fill out the Inline form user detail
     * @param name 
     * @param email 
     * @param rememberMe 
     */
    async submitInlineFormWithNameEmailandCheckBOx(name: string, email:string, rememberMe: boolean){
        const usingTheInlineForm=this.page.locator('nb-card',{hasText: "Inline form"})
        await usingTheInlineForm.getByRole('textbox',{name: "Jane Doe"}).fill(name)
        await usingTheInlineForm.getByRole('textbox',{name: "Email"}).fill(email)
        if(rememberMe)
        {
            await usingTheInlineForm.getByRole('checkbox').check({force: true}) 
        }
        await usingTheInlineForm.getByRole('button').click()
    }


}