import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { LogoComponent } from './components/logo/logo.component';
import { AuthorComponent } from './pages/author/author.component';
import { AlbumComponent } from './pages/albums/album/album.component';
import { PlayerComponent } from './components/player/player.component';
import { ArtistComponent } from "./pages/artists/artist/artist.component";
import { ContactComponent } from './pages/contact/contact.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    ArtistsComponent,
    ArtistComponent,
    LayoutComponent,
    NotFoundComponent,
    HeaderComponent,
    CardComponent,
    LogoComponent,
    AuthorComponent,
    AlbumComponent,
    PlayerComponent,
    ContactComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule
    ],
  providers: [FormBuilder, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
