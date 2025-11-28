//Data Types

//Primitive types (number, string, boolean)
let age: number = 6;
let message: string = "hello";
let isDone: boolean = false;

//Object types (objects, arrays, tuples)
let person: object = { name: "Daniil", age: 18 };
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["Daniil", 18];


//СПЕЦИАЛЬНЫЕ ТИПЫ (any , unknown, never, void)
//unknown - безопасный any. Он вынуждает делать проверки
const log = (data: unknown) => {
    let value: string;
    if (typeof (data) === 'string') {
        value = data;
    }
}

//never - пустое множество (несуществующее значение)
enum Values {
    FIRST,
    SECOND,
}

function fn(value: Values) {
    switch (value) {
        case Values.FIRST:
            return 1;
        case Values.SECOND:
            return 2;
        default:
            const exhaustiveCheck: never = value; // проверка на необработанные кейсы
            return value;
    }
}

//void - просто пустое значение когда функция ничего не возвращает
function voidFunction(): void {
    console.log('Void function')
}

//Сужение типов (Narrowing)

//typeof type guards
function f1(arg: number | string | null) {
    if (typeof arg === 'number') {
        arg
        return
    } else if (typeof arg === 'string') {
        arg
        return;
    }
    return arg;
}

//Truthiness narrowing
function f2(value: string | null) {
    if (value) {
      return value.toUpperCase();
    }
  }

//Equality narrowing
function f3(arg: number | null, arg2: number) {
    if (arg === null) {
        console.log(typeof arg);
    }
    if (arg === arg2) {
        console.log(typeof arg)
    }

    return arg;
}

//in operator narrowing
interface User {
    username: string;
    age: number
}

interface Person {
    lastname: string;
    firstname: string;
    age: number;
}

function fn3(arg: User | Person) {
    if ('username' in arg) {
        console.log(typeof arg);
    }
    if ('lastname' in arg) {
        console.log(typeof arg);
    }
}

//instanceof narrowing
class BMW {
    bmwDrive() {}
}

class Audi {
    audiDrive() {}
}

function f5(arg: BMW | Audi) {
    if (arg instanceof BMW) {
        arg.bmwDrive();
    } else {
        arg.audiDrive();
    }
}

//Type predicates
function isUser(value: User | Person): value is User {
    return 'maxSpeed' in value && 'weight' in value
}

function isPerson(value: User | Person): value is Person {
    return 'age' in value && 'name' in value
}

function f6(arg: User | Person) {
    if (isUser(arg)) {
        console.log(typeof arg);
    } else {
        console.log(typeof arg);
    }
}

//Discriminated union
interface BaseCar {
    maxSpeed: number;
    weight: number;
}

interface Ferrari extends BaseCar {
    type: 'Ferrari';
    FerrariField: string;
}

interface AlfaRomeo extends BaseCar {
    type: 'AlfaRomeo';
    AlfaRomeoField: string;
}


type Car = AlfaRomeo | Ferrari;

function f7(arg: Car) {
    switch (arg.type) {
        case 'AlfaRomeo':
            arg.AlfaRomeoField;
            break;
        case 'Ferrari':
            arg.FerrariField;
            break;
    }
}

//Enums
enum Numbers {
    ONE = 1,
    TWO = 2,
    THREE = 3
}

function setNumber(number: Numbers): number {
    console.log(number);
    return number;
}

setNumber(Numbers.THREE);

//Type Aliases and Interfaces
type Size = {
    width: number;
    height: number;
}

const screenSize: Size = { width: 1920, height: 1080 };

interface Vehicle {
    brand: string;
    model: string;
    maxSpeed: number;
    weight: number;
    start(): void;
    stop(): void;
}

interface SportCar extends Vehicle {
    horsepower: number;
    switchDriveMode(mode: 'eco' | 'comfort' | 'sport' | 'race'): void;
    launchControl(): void;
}

class Ferrari implements SportCar {
    brand = "Ferrari";
    model = "488 Pista";
    maxSpeed = 340;
    weight = 1280;
    horsepower = 720;

    start() {
        console.log("Машина завелась");
    }

    stop() {
        console.log("Машина остановилась");
    }

    switchDriveMode(mode: 'eco' | 'comfort' | 'sport' | 'race') {
        console.log(`Режим вождения: ${mode}`);
    }

    launchControl() {
        console.log("Запуск с места!");
    }
}


//Union and Intersection Types
type MainInfo = {
    firstname: string;
    lastname: string;
}

type AdditionalInfo = {
    age: number;
}

type FullInfo = MainInfo & AdditionalInfo // & - и

const info: FullInfo = {firstname: 'Daniil', lastname: 'Zhulayeu', age: 18};

type Color = 'green' | 'red' | 'blue'; // | - или

const color: Color = 'red'; 

//Functions
function greet(name: string): string {
    return `Привет, ${name}!`;
}

//Необязательный параметр
function createUser(name: string, age?: number): string {
    return age ? `${name}, ${age} лет` : name;
}

//Тип для функции
type MathOperation = (x: number, y: number) => number;
let divide: MathOperation = (a, b) => a / b;

//Casting
let value: any = 'строка';

let strLength: number = (value as string).length;
console.log(strLength);

//Classes
class BankAccount {
    static numberOfBankAccounts: number = 0;
    //private - доступно только внутри класса
    private balance: number;

    //public - доступно везде (по умолчанию)
    public accountNumber: string;

    //protected - доступно в классе и наследниках
    protected owner: string;

    constructor(accountNumber: string, owner: string) {
        BankAccount.numberOfBankAccounts++;
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = 0;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public getBalance(): number {
        return this.balance;
    }

    static getTotalBankAccountsCount (): number {
        return this.numberOfBankAccounts;
    }
}


//Basic Generics
interface MetaData {}

interface ApiResponse<T> {
    status?: 'error' | 'success';
    meta?: MetaData;
    requestId?: string;
    data: T;
}

const responseFromUserApi: ApiResponse<User> = {
    status:'success',
    data: {
        username: 'SomeUsername1',
        age: 18
    }
}

//Functions generics
function handleApiResponse<T>(response: ApiResponse<T>): void {
    if (response.status === 'success') {
        console.log('Успешный ответ:');
        console.log('Данные:', response.data);
    } else {
        console.log('Ошибка в ответе');
        console.log('ID запроса:', response.requestId);
    }
}

handleApiResponse(responseFromUserApi);

//Classes
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(newValue: T): void {
        this.value = newValue;
    }
}

//Basic utility types (Partial, Required, Readonly)
interface Human {
    name: string;
    age: number;
    sex: 'male' | 'female';
}

//Теперь можно создавать объекты без всех свойств
let firstHuman: Partial<Human> = {
    name: "Ben"
    // можно указать только name, остальные свойства опциональны
};

//Все поля обязательные
let secondHuman: Required<Human> = {
    name: 'Bob',
    age: 24,
    sex: 'male'
}

//Все поля только для чтения, изменить мы их не можем
let thirdHuman: Readonly<Human> = {
    name: 'Amen',
    age: 33,
    sex: 'male'
}