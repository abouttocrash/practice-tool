import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Requirement, Tag, Test } from '../../../types/Types';
export type EXResponse<T> = {
  status:string,
  data:T
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly hh = "http://localhost:3000"
  private readonly endpoints = {
    REQS:'/requirement',
    TEST:'/test',
    TAGS:'/tag'
  }
  httpClient = inject(HttpClient)
  constructor() { }
  
  async createTest(test:Test){
    const response = await firstValueFrom(
      this.httpClient.post<EXResponse<Test>>(`${this.hh}${this.endpoints.TEST}`,test)
    )
  }

  async createRequirement(req:Requirement){
    const response = await firstValueFrom(
      this.httpClient.post<EXResponse<Requirement>>(`${this.hh}${this.endpoints.REQS}`,req))
  }
  async createTag(tag:Tag){
    const response = await firstValueFrom(
      this.httpClient.post<EXResponse<Tag>>(`${this.hh}${this.endpoints.TAGS}`,tag))
  }


  async getAllRequirements(){
    return await firstValueFrom(
      this.httpClient.get<EXResponse<Requirement[]>>(`${this.hh}${this.endpoints.REQS}`)
    )
  }

  async getAllTests(){
    return await firstValueFrom(
       this.httpClient.get<EXResponse<Test[]>>(`${this.hh}${this.endpoints.TEST}`)
    )
  }

  async getTags(){
    return await firstValueFrom(
      this.httpClient.get<EXResponse<Tag[]>>(`${this.hh}${this.endpoints.TAGS}`)
    )
  }
}


