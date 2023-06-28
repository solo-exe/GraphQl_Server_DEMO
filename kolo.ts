const first_name: string = 'Pedro'

const age: number = 24

const increment = (value: number, title: string) => {
    return value + 1
}

let languages: string[] = ['java', "c++", 'python']
languages.push('golang');
console.log(lang);

const counter: number = increment(10, 'Captain')
console.log(counter);

interface IProgrammingLaguage {
    name: string;
    awesome: boolean;
    age?: number
}

const typeScript: IProgrammingLaguage = {
    name: "typescript",
    awesome: true
}
const java: IProgrammingLaguage = {
    name: "Java",
    awesome: true
}

interface IUser {
    name?: string;
    email?: string;
    age?: string;
    isMarried?: boolean
}

const fetchData = async (apiUrl: string): Promise<IUser> => {
    return fetch(apiUrl).then((response) => response.json())
}

const user: Promise<IUser> = fetchData('apiurl.com/api')

enum Cheese {
    cheddar = "cheddar",
    gouda = "gouda",
    goat = "goat",
    blueMould = 'blueMould'
}

const serveCheese = (cheeseType: Cheese, servings: number): void => {
    console.log`You want ${servings} of ${cheeseType}`;
}
serveCheese(Cheese.goat, 4)