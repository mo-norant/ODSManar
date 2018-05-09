import { Specificatie } from './../../../../../models/models';
import { AuthService } from './../../../../../auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material';
import { OogstkaartService } from '../oogstkaart.service';
import { OogstKaartItem, Weight, LocationOogstKaartItem } from '../../../../../models/models';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { Utils } from '../../../../../models/Util';
import { FileSystemFileEntry, FileSystemDirectoryEntry, UploadFile, UploadEvent } from 'ngx-file-drop';


@Component({
  selector: 'app-oogstkaartform',
  templateUrl: './oogstkaartform.component.html',
  styleUrls: ['./oogstkaartform.component.scss']
})

export class OogstkaartformComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  matHorizontalStepper: MatHorizontalStepper;


  oogstkaartID: number;
  zoom: number = 7
  postsucces: boolean = false;
  err;

  avatarpreviewurl

  selectedlocation = {
    lat: null,
    lng: null,
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  color = 'primary';
  mode = 'determinate';
  value = 50;

  @ViewChild('stepper') stepper: MatStepper;
  
  
  
  location

  buttondisabled : boolean = false;
  buttonuploadzone:boolean = false;
  uploaderror: boolean = false;
  
  public progress: number;
  public message: string;
  public specificaties: Specificatie[] = [];
  public files: UploadFile[] = [];


  constructor(private _formBuilder: FormBuilder, private oogstkaartservice: OogstkaartService, private http : HttpClient, private auth: AuthService) {
  
  }

  ngOnInit() {
   

    this.secondFormGroup = this._formBuilder.group({
      omschrijving: [''],
      jansenserie: ['', Validators.required],
      vraagPrijsPerEenheid: ['', [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
      vraagPrijsTotaal: ['', [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
      artikelnaam:  ['', Validators.required],
      categorie: ['', Validators.required],
      hoeveelheid: ['', [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
      concept: ['', Validators.required],
      datumBeschikbaar: [''],
      transportInbegrepen: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      productimage: null,
    });
  }

  postartikel() {

    let item: OogstKaartItem = new OogstKaartItem;
    item.hoeveelheid = this.secondFormGroup.value.hoeveelheid;
    item.omschrijving = this.secondFormGroup.value.omschrijving;
    item.artikelnaam = this.secondFormGroup.value.artikelnaam;
    item.jansenserie = this.secondFormGroup.value.jansenserie;
    item.category = this.secondFormGroup.value.categorie;
    item.concept = this.secondFormGroup.value.concept;
    item.datumBeschikbaar = this.secondFormGroup.value.beschikbaarvanaf;

    item.vraagPrijsPerEenheid = this.secondFormGroup.value.vraagPrijsPerEenheid;
    item.vraagPrijsTotaal = this.secondFormGroup.value.vraagPrijsTotaal;
    item.specificaties = this.specificaties;
    item.transportInbegrepen = this.secondFormGroup.value.transportinbegrepen;
  
    if(this.buttondisabled == false){
      this.buttondisabled = true;
      this.oogstkaartservice.postOogstkaartItem(item).subscribe(res => {
        this.oogstkaartID = res;
        console.log(this.oogstkaartID)
        this.postsucces = true;
        this.stepper.next();
        
        
      },
        err => {
          this.onPostError(err);
        }, () => {
          this.buttondisabled = false;
        })
    }

    

  }


  onPostError(err){

    this.buttondisabled = false;
    this.err = err;
    this.postsucces = false;
    this.stepper.selectedIndex = 4;
  }

  postLocation() {

    let location: LocationOogstKaartItem = new LocationOogstKaartItem();
    location.latitude = this.selectedlocation.lat;
    location.longtitude = this.selectedlocation.lng;

    this.oogstkaartservice.PostLocation(this.oogstkaartID, location).subscribe(res => {
      this.stepper.next();
    }, err => {
      this.deleteItem(this.oogstkaartID);
      this.onPostError(err);

    })
  }

  getlocation($event) {
    this.selectedlocation.lat = $event.coords.lat;
    this.selectedlocation.lng = $event.coords.lng;
  }

  nextstep() {
    this.stepper.next();
  }

  uploadavatar(event){


    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
       this.oogstkaartservice.PostProductPhoto(file, this.oogstkaartID).subscribe( res => {
         this.stepper.next();
       }, err => {
         this.deleteItem(this.oogstkaartID);
         this.onPostError(err);
       })
      };
    }

  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    

    for (let file of files)
      formData.append(file.name, file);
    const uploadReq = new HttpRequest('POST', Utils.getRoot() + `Oogstkaart/oogstkaartavatar/` +  this.oogstkaartID, formData, {
      reportProgress: true,
      headers : this.auth.getAuthorizationHeaders()
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response){
        console.log(event.type);
        this.buttonuploadzone = true;
      }

    }, err => this.uploaderror = true);
  }

  private deleteItem(id : number){
    console.log("item removed")
    this.oogstkaartservice.DeleteItem(id).subscribe( res => {
      this.postsucces = false;
      this.stepper.selectedIndex = 4;
    }, err => this.onPostError(err));
   
  }

  private complete(){
    this.stepper.selectedIndex = 4;
  }

  private addSpecificatie(){
    
    this.specificaties.push(new Specificatie());
    
  }

  private reset(){
    this.stepper.reset();
    this.specificaties = [];
  }

  private removeItem(index){

    if (index !== -1) {
      this.specificaties.splice(index, 1);
  }   
  }


  
 
  public dropped(event : UploadEvent) {
  

    
    for (const droppedFile of event.files) {
 
      if (droppedFile.fileEntry.isFile && this.isImage(droppedFile.relativePath)) {
        this.files.push(droppedFile);
      }
    }
  }

  private uploadfotos(){
    const formData = new FormData();
  
    this.files.forEach(element => {
      const fileEntry = element.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        formData.append(file.name, file);
      });
    });

    const uploadReq = new HttpRequest('POST', Utils.getRoot() + `Oogstkaart/files/` +  this.oogstkaartID, formData, {
      reportProgress: true,
      headers : this.auth.getAuthorizationHeaders()
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response){
        console.log(event.type);
        
      }

    }, err => this.uploaderror = true);

  }
 
   private getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

   private isImage(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
        
        return true;
    }
    return false;
}


}
