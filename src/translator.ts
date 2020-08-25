import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as Crypto from 'crypto';

/**
 * Translate text to target language from source language.
 * 
 * @param {String} source - Original language code(text)
 * @param {String} target - Target language code(result)
 * @param {String} text - A text to be translated
 * 
 * @returns {String} Translated result
 * 
 * @param {String} source - Original language code(text)
 * @param {String} target - Target language code(result)
 * @param {Array} content - The array includes texts to be translated.
 * 
 * @returns {Array} Translated result array
 * 
 * @example
 * (async () => console.log(await new Translator().translate('en', 'ko', 'Hi.')))();
 * (async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();
 */

export default class Translator {

    constructor() { }

    private async request(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return await Axios.post(url, data, config);
    }

    private genUUID(time: number): string {
        let tower: number = time;
        const base: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        const uuid: string = base.replace(/[xy]/g, e => {
            const chip: number = (time + 16 * Math.random()) % 16 | 0;
            tower = Math.floor(tower / 16);
            return (e === 'x'? chip : 3 & chip | 8).toString();
        });
        return uuid;
    }

    // private setCookie(coockieObj: any) {
    //     let result: string[] = [];
    //     for (let property in coockieObj) result.push(`${property}=${coockieObj[property]}`);
    //     return result.join('; ');
    // }

    private toFormData(formObj: any): string {
        let result: string[] = [];
        for (let property in formObj) result.push(`${property}=${formObj[property]}`);
        return result.join('&');
    }

    public async translate(source: string = 'ko', target: string = 'en', text: string): Promise<string> {
        let result: string = '';
        const time: number = Date.now();
        const uuid: string = this.genUUID(time);

        const data: string = this.toFormData({
            'deviceId': uuid, //'4c9a04d7-cb7f-47a5-a731-093ba2b77535',
            'locale': 'en',
            'dict': true,
            'dictDisplay': 30,
            'honorific': false,
            'instant': true,
            'paging': false,
            'source': source,
            'target': target,
            'text': text
        });
        const hash: Crypto.Hmac = Crypto.createHmac('md5', 'v1.5.1_4dfe1d83c2')
            .update(`${uuid}\nhttps://papago.naver.com/apis/n2mt/translate\n${time}`);
        const headers: any = {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en',
            'Authorization': `PPG ${uuid}:${hash.digest('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Device-Type': 'pc',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4)\
                     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'Origin': 'https://papago.naver.com',
            'Referer': 'https://papago.naver.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'Timestamp': time
        }

        await this.request('https://papago.naver.com/apis/n2mt/translate', data, { headers: headers })
            .then(function (response: AxiosResponse) {
                result += response.data.translatedText;
            }).catch(error => console.log(error));

        return result;
    }

    public async multiTranslate(source: string, target: string, content: string[]): Promise<string[]> {
        let result: string[] = [];

        const promises = content.map(async (element, index) => await this.translate(source, target, element)
            .then(res => result[index] = res)
            .catch(error => console.log(error)));

        await Promise.all(promises).then(res => res).catch(error => console.log(error));

        return result;
    }
}