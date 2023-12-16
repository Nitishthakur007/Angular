import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId : string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;


  allPatients: Patient[] = [];
  appointments: Appointment[] = [];
  users: Users[] = [];
  authUsers: {
    id: number;
    username: string;
    password: string;
  }[] = [];



  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_name: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated


    return this.api.checkLogin(user_name, password)
      .pipe(map(data => {
        if (data && data.userId) {
          // store 'userId' from response as key name 'userId' to the localstorage
          localStorage.setItem('userId', data.userId + '');
          // return true if user authenticated
          this.isLogIn.next(true);
          return true;
        } else {
          // return false if user not authenticated
          return false;
        }
      }));
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status
    this.isLogIn.next(this.getUserId() > 0 ? true : false);
    return this.isLogIn.asObservable(); // passed
  }

  regNewUser(regNewUser): Observable<any> {
    // should return response retrieved from ApiService

    // handle error

    return;
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists

    // remove the key 'userId' if exists

    this.isLoggedIn = false;

    if (localStorage.getItem('userId')) {

      localStorage.removeItem('userId');

    }

    this.isLogIn.next(false);

    return this.isLoggedIn;
  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service
    // should return user details retrieved from api service
    return this.api.getUserDetails(this.userId);
  }

  updateProfile(userId:string, userDetails): Observable<boolean> {
    // should return response retrieved from ApiService
    // handle error
    // should return the updated status according to the response from api service

    return this.api.updateDetails(userId,userDetails)
      .pipe(map(data => data ? true : false), catchError(this.handleError));
  }

  registerPatient(patientDetails): Observable<any> {
    // should return response retrieved from ApiService
    // handle error
    return this.api.registerPatient(patientDetails);

  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server
    // handle error
     // should return all patients list retrieved from ApiService
    // handle error
    return this.api.getAllPatientsList();
  }

  getParticularPatient(id): Observable<any> {
    // should return particular patient details from server

    // handle error

    // should return particular patient details retrieved from ApiService

    // handle error

    return this.api.getParticularPatient(id);
  }

  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error

    // should return response retrieved from ApiService

    // handle error

    return this.api.diseasesList();
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
    // should return response from server if appointment booked successfully

    // handle error

    return this.api.scheduleAppointment(appointmentDetails);
  }

  getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

    // handle error

    return this.api.getSinglePatientAppointments(patientId);
  }

  deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment

    // handle error

    // should return response retrieved from ApiService

    // handle error

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error
    // should return response retrieved from ApiService

    // handle error

    return this.api.requestedAppointments();
  }


  private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error);
  }



  getUserId(): number {

    // retrieve 'userId' from localstorage
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (!this.isLogIn.value)
      return -1;
    return userId ? userId : -1;
  }

}

