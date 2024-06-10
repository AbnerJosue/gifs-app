import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchReponse } from '../interfaces/gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifsList: Gif[] = [];

    private _tagHistory: string[] = [];
    private apiKey = 'AYBQI1wLTJdpifOIW7kH8WZ5RquzL9nG';
    private serviceUrl = "https://api.giphy.com/v1/gifs";
    constructor( private http: HttpClient ) { 
        this.loadLocalStorage();
    }

    get tagHistory(){
        return [...this._tagHistory]
    }
    private organizeHistory(tag: string) {
        
        tag = tag.toLocaleLowerCase();  

        if(this.tagHistory.includes(tag)){
            this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
        }
 
        this._tagHistory.unshift(tag);
        this._tagHistory = this.tagHistory.splice( 0,10 );

        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage():void {
        
        if( !localStorage.getItem('history')) return;
        this._tagHistory =  JSON.parse(localStorage.getItem('history')!);

        if( this._tagHistory.length === 0 ) return;
        this.searchTag(this._tagHistory[0]);
    }

    searchTag( tag: string ):void {
        
        if( tag.length === 0 ) return;

        this.organizeHistory( tag );

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', tag);

        this.http.get<SearchReponse>( `${this.serviceUrl}/search`, { params })
            .subscribe( resp => {
                this.gifsList = resp.data;
            })
    }
    
}