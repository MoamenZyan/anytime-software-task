import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/users.schema";
import { IUser } from "./interface/userInterface";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { Builder, By, Key, WebDriver, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';


// service class
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    // create new user
    async create(user: IUser) {
        try {
            const newUser: IUser = {
                username: user.username,
                email: user.email,
                linkedin: user.linkedin,
                password: await bcrypt.hash(user.password, 10)
            }
            const createdUser = await new this.userModel(newUser).save();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // get all users
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    // find one user
    async findOne(id: ObjectId): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    // delete user
    async delete(id: ObjectId): Promise<any> {
        return await this.userModel.findOneAndDelete(id).exec();
    }

    // update user
    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({email: email}).exec();
        if (user == null) return null;
        if (await bcrypt.compare(password, user.password)) {
            const payload = {userId: user._id}
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
            const linkedinInfo = await getUserInfoFromLinkedIn(user.linkedin);
            return [true, user, token, linkedinInfo];
        } else {
            return [false];
        }
    }
}

process.env.CHROMEDRIVER_PATH = '/usr/bin/chromedriver';
async function getUserInfoFromLinkedIn(linkedin: string) {
    try {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--no-sandbox');
        chromeOptions.addArguments('--disable-dev-shm-usage');
        chromeOptions.addArguments('--headless'); 
        chromeOptions.addArguments('--disable-gpu');


        const driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH))
            .build();
        await driver.get('https://www.linkedin.com/login');
        await driver.findElement(By.id('username')).sendKeys(process.env.LINKEDIN_EMAIL);
        await driver.findElement(By.id('password')).sendKeys(process.env.LINKEDIN_PASSWORD);
        await driver.findElement(By.xpath('//*[@id="organic-div"]/form/div[3]/button')).click();

        await driver.sleep(5000);
        await driver.get(linkedin);
        const name = await driver.wait(until.elementLocated(By.css('#ember36 > h1')));
        const nameText = await name.getText();
        const photo = await driver.wait(until.elementLocated(By.css('#ember34')));
        const photoSrc = await photo.getAttribute('src');
        const location = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]')));
        const locationText = await location.getText();
        const headline = await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]')));
        const headlineText = await headline.getText();
        return {username: nameText, photo: photoSrc, location: locationText, headline: headlineText};
    } catch (err) {
        console.log(err);
        return null;
    }
}