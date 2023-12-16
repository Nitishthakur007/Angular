import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  listOfDiseases;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  scheduledAppointments: Appointment[] = [];

  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    // add necessary validators

    this.appointmentForm = fb.group({
      'selectDisease' : [null],
      'tentativeDate' : [null],
      'priority' : [null]
    })
   }

  ngOnInit() {

    // get selected patient id

    this.activatedRoute.params.subscribe((params: { id: string }) => {

      // get Particular Patient from service using patient id and assign response to patient property

      this.dataService.getParticularPatient(parseInt(params.id, 10))

        .subscribe(data => {

          this.patient = data;

        });

    });

  }

  bookAppointment() {
    // get diseases list from service

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    // get diseases list from service

    this.dataService.diseasesList().subscribe(data => {
      this.listOfDiseases = data;
    });

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    this.isBookAppointment = false;

    this.isFormEnabled = true;

    this.isScheduledAppointment = true;

    this.isTableEnabled = false;
  }

  scheduleAppointment() {

    const appointment = {

      patientFirstName: this.patient.firstName,

      patientLastName: this.patient.lastName,

      disease: this.appointmentForm.get('selectDisease').value,

      priority: this.appointmentForm.get('priority').value,

      tentativedate: this.appointmentForm.get('tentativeDate').value

    };



    // if booked successfully should redirect to 'requested_appointments' page

    this.dataService.scheduleAppointment(appointment)

      .subscribe(data => {

        if (data) {

          this.route.navigate(['/requested_appointments']);

        }

      }, err => {

        console.log(err);

      });

  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    // get particular patient appointments using getSinglePatientAppointments method of DataService


    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    this.isBookAppointment = true;

    this.isScheduledAppointment = false;

    this.isTableEnabled = true;

    this.isFormEnabled = false;



    // get particular patient appointments using getAppointments method of DataService

    this.dataService.getSinglePatientAppointments(this.patient.id).subscribe(data => {

      this.scheduledAppointments = data;

    });


  }

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments



    // delete selected appointment uing service

    this.dataService.deleteAppointment(appointmentId)
      .subscribe(data => {
      });

    // After deleting the appointment, get particular patient appointments

  }

}
