import { Component, OnInit, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Certificate } from './certificate';
import { CertificateService } from './keycert.service';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { FileWindow, CustomModalContext } from './uploadCert';

@Component({
  selector: 'keycerts',
  templateUrl: './keycerts.component.html'
})
export class KeycertsComponent implements OnInit{
  title = 'Current Certificates';
  identities: Certificate[];
  certificates: Certificate[];

  @Output() changeTitle = new EventEmitter();

  constructor(private titleService: Title, private certificateService: CertificateService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    this.titleService.setTitle('Certificates');

    this.certificateService.getIdentities().subscribe(identities => {
       this.identities = identities;
     });

    this.certificateService.getCertificates().subscribe(certificates => {
       this.certificates = certificates;
     });
  }

  ngOnInit(): void {
    this.changeTitle.emit('Certificates');
    this.file = null;
  }

  file: File;
  onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        if (this.file === null) {
        this.file = files[0];
        console.log(this.file);
      }

    }

  onUploadCertificate(fileName: string) {
    const dialog = this.modal.open(FileWindow,  overlayConfigFactory({ keystoreDestination: fileName }, BSModalContext));


  }
}
