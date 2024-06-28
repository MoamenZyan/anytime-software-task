// routes for users
import { NextResponse } from 'next/server';
import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import UserService from '@/backend/services/userService';
import UserDto from '@/backend/models/userModel/userDtoModel';

const userService = new UserService();

// Check user credentials
export async function POST(request: Request) {
    const {email, password} = await request.json();
    const result = await userService.UserLogin(email, password);
    if (result != null) {
        const user = new UserDto(result[0]);
        // const info = await scrape(user.linkedin); // paused
        return NextResponse.json({status: true, user: user, token: result[1]}, {headers: { 'Authorization': `Bearer ${result[1]}` }});
    } else {
        return NextResponse.json({status: false, message: "there is no user with that email"});
    }
}


// paused until see what need to do about focus page ****
process.env.CHROMEDRIVER_PATH = '/usr/bin/chromedriver';
async function scrape(linkedin: string) {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--headless');
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH))
    .build();

  try {
    await driver.get(linkedin);
    let userTitle = await driver.wait(until.elementLocated(By.css('h1')), 10000);
    let text = await userTitle.getText();
    return text;
  } finally {
    await driver.quit();
  }
}