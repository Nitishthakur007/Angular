import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable , of, throwError} from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;
  AUTH_API_URL = '/auth/server/';
  allPatients: Patient[] = [];
  appointments: Appointment[] = [];
  users: Users[] = [];
  authUsers: {
    id: number;
    username: string;
    password: string;
  }[] = [];

  constructor(private http: HttpClient) {

    this.API_URL = 'api';

  }

  public checkLogin(user_name: string, password: string): Observable<any> {
    // should return response from server
    // handle error
    return this.http.post<Credentials>(this.API_URL + this.AUTH_API_URL, { user_name, password });
  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server

    // handle error

    return;
  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error
    return this.http.get<Users>(this.API_URL + '/users/' + userId)
    .pipe(catchError(this.handleError));
  }

  public updateDetails(userId:string, userDetails: any): Observable<any> {
    // should return response from server

    // handle error

    return this.http.put<Users>(this.API_URL + '/users/' + userDetails.userId, userDetails);
  }

  public registerPatient(patient: any): Observable<any> {
    // should return response from server if patientDetails added successfully

    // handle error
    return this.http.post<Patient>(this.API_URL + '/allpatients', patient)
    .pipe(catchError(this.handleError));
  }

  public getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error
    return this.http.get<any>(this.API_URL + '/allpatients');

  }

  public getParticularPatient(patientId): Observable<any> {
    // should return particular patient details from server

    // handle error
    return this.http.get<any>(this.API_URL + '/allpatients/' + patientId);

  }

  public diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error
    return this.http.get<any[]>(this.API_URL + '/diseases');
  }

  public scheduleAppointment(appointmentDetails: any) : Observable<any>{
    // should return response from server if appointment booked successfully

    // handle error

    // should return response from server if appointment booked successfully
    // handle error
    return this.http.post<Appointment>(this.API_URL + '/reqappointments', appointmentDetails);

  }

  public getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server
    // handle error
    // should return appointments of particular patient from server
    // handle error
    return this.http.get<Appointment[]>(this.API_URL + '/reqappointments?patientId=' + patientId)
    .pipe(catchError(this.handleError));
  }

  public deleteAppointment(appointmentId): Observable<any>  {
    // should delete the appointment

    // handle error
    return this.http.delete<void>('/appointment/delete/' + appointmentId)
    .pipe(catchError(this.handleError));
    return;
  }

  public requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error
    return this.http.get<Appointment[]>(this.API_URL + '/reqappointments');
    return;
  }


  private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error);
  }


}
