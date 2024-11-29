
export enum Color {}
export enum Icon {}

export type Requirement = {
    id:string,
    name:string,
    description:string,
    tags:Tag[],
    uuid?:string
}

export type Tag = {
    name:string,
    uuid?:string,
    color:Color,
    icon:Icon
}

export type Test = {
    id:string,
    req_id:string,
    steps:Step[],
    name:string,
    tags:Tag[],
    uuid?:string
}

export type Step = {
    uuid?:string,
    text:string,
    tags:Tag[]
}