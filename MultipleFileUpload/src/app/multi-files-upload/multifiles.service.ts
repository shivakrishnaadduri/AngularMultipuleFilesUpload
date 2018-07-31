import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MultifilesService {

  constructor(  private http: HttpClient) { }

  

  saveFiles(total_form)
  {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
     
  });
  
  let options = {
      headers: httpHeaders
  };

    return this.http.post("http://localhost:8181/uploadFiles",total_form);

  }
  
}
