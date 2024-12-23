
export enum Color {}
export enum Icon {}

export type Requirement = {
    id:string,
    name:string,
    description:string,
    tags:Tag[],
    uuid?:string,
    created?:string
}

export type Tag = {
    tag:string,
    uuid?:string,
    color:string,
    icon?:Icon
}

export type Test = {
    id?:string,
    priority:{viewValue:string,value:string}
    req_id:string,
    steps:Step[],
    stepCount?:number
    name:string,
    tags:Tag[] | string[],
    uuid?:string,
    created:string
}

export type Step = {
    uuid:string,
    testId:string,
    text?:string,
    tags?:Tag[]
}