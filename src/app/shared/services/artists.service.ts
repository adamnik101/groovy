import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../base-url";
import {Observable} from "rxjs";
import {IArtist} from "../interfaces/i-artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private path: string = BASE_URL.baseUrl + '/artists.json'
  constructor(private http: HttpClient) { }

  getArtists(): Observable<IArtist[]>{
    return this.http.get<IArtist[]>(this.path)
  }
}
