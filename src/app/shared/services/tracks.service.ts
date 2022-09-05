import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../base-url";
import {ITrack} from "../interfaces/i-track";

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private path: string = BASE_URL.baseUrl + '/tracks.json'

  constructor(private http: HttpClient) { }

  getTracks(): Observable<ITrack[]>{
    return this.http.get<ITrack[]>(this.path)
  }

}
