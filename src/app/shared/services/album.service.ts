import { Injectable } from '@angular/core';
import {BASE_URL} from "../base-url";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAlbum} from "../interfaces/i-album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private path: string = BASE_URL.baseUrl + '/albums.json'

  constructor(private http: HttpClient) { }

  getAlbums() : Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(this.path)
  }
}
