import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { and, backslash, queryCode, questionMark, rating, rootUrl, spaceCode } from '../appCostants';

@Injectable()
export class HttpClientService {

    constructor(private http: HttpClient) { }

    getAllMovies(): Observable<any> {
        return this.http.get(rootUrl);
    }

    getById(id: number) {
        let finalUrl: string;
        finalUrl = rootUrl + backslash + id.toString(2);
        return this.http.get(finalUrl);
    }

    getQuery(query?: string, selectedRating?: string): Observable<any> {
        let finalUrl: string;
        let adjustedQuery: string;
        if (selectedRating && query) {
            adjustedQuery = this.adjustQueryString(query);
            finalUrl = rootUrl + queryCode + adjustedQuery + and + rating + selectedRating;
        } else if (selectedRating) {
            finalUrl = rootUrl + questionMark + rating + selectedRating
        } else if (query) {
            adjustedQuery = this.adjustQueryString(query);
            finalUrl = rootUrl + queryCode + adjustedQuery
        }

        return this.http.get(finalUrl);
    }

    patch(movieId: string, movieRating: string): Observable<any> {
        const requestUrl = rootUrl + backslash + movieId
        return this.http.patch(requestUrl, { rating: movieRating });
    }

    private adjustQueryString(query: string) {
        return query.replace(/\s/g, spaceCode);
    }
}