import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ArtistsComponent} from "./pages/artists/artists.component";
import {AlbumsComponent} from "./pages/albums/albums.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {AuthorComponent} from "./pages/author/author.component";
import { ArtistComponent } from './pages/artists/artist/artist.component';
import {AlbumComponent} from "./pages/albums/album/album.component";
import {ContactComponent} from "./pages/contact/contact.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'artists/:id', component: ArtistComponent},
  {path: 'albums', component: AlbumsComponent},
  {path: 'albums/:id', component: AlbumComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'author', component: AuthorComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
