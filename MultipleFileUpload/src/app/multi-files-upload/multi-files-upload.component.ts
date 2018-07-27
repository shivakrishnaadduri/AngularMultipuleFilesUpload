import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,NgForm } from '@angular/forms';
import { MultifilesService } from './multifiles.service'
@Component({
  selector: 'app-multi-files-upload',
  templateUrl: './multi-files-upload.component.html',
  styleUrls: ['./multi-files-upload.component.css']
})
export class MultiFilesUploadComponent implements OnInit {

  constructor( private renderer : Renderer,
              private formBuilder: FormBuilder,
              private multifilesService : MultifilesService
            ) { }
  public documentGrp: FormGroup;
  
  ngOnInit() {

    this.documentGrp = this.formBuilder.group({
      doc_name: '',
      doc_description: '',
      documentFile: File,
      
      items: this.formBuilder.array([ this.createUploadDocuments()])
    });

  }


  public doc_name = "";
  public doc_description = "";
  public student_photo: File;
  public documentFile: File;



  createUploadDocuments(): FormGroup {
    return this.formBuilder.group({
      doc_name: '',
      doc_description: '',
      documentFile: File,
    });
  }

  get items(): FormArray {
    return this.documentGrp.get('items') as FormArray;
  };

  addItem(): void {
  
    //console.log("the data is "+ this.academic_examination);
    //this.items.push(this.createAcademics());
    this.items.insert(0,this.createUploadDocuments())
  }

  removeItem(index : number)
  {
    this.items.removeAt(index);
  }

  

  

  public fileSelectionEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
       }
      
      this.documentFile=(fileInput.target.files[0]);
     
      
      
  console.log("the document  is"+JSON.stringify(fileInput.target.files[0].name));
      reader.readAsDataURL(fileInput.target.files[0]);
      
     // 
  }
  }

  public OnSubmit(formValue: any) {
  

    //this.uploadDocumentsService.uploadDocumentFrom = form;

   
    let total_form : FormData[] = [];

    console.log(formValue.items)

    formValue.items.forEach(element => {
      let upl_fom : FormData =new FormData();
      console.log("each element is", element);
       upl_fom.append('document_category',element.doc_name);
     upl_fom.append('document_details',element.doc_description);
    upl_fom.append('document_file',element.documentFile);
    total_form.push(upl_fom);
    });
    
    let temp_frm = new FormData();

    temp_frm.append('document_category',formValue.items[0].doc_name);
    temp_frm.append('document_details',formValue.items[0].doc_description);
    this.documentFile=formValue.items[0].documentFile as File;
    if(formValue.items[0].documentFile instanceof Object)
    {
      console.log("i am type of Object");
      
    }
    else
    {
      console.log("i am not type of Object");
    }

    if(this.documentFile instanceof File)
    {
      console.log("this.documentFile type of file");
      
    }
    else
    {
      console.log("this.documentFile not  type of file");
    }
    temp_frm.append('document_file',this.documentFile);
   // temp_frm.append("listData",total_form.toString())
    
    

    //total_form.push(temp_form);
   // total_form.push(upl_fom);




    //let temp_form : FormData =  new FormData();

     //temp_form.append("photo",this.student_photo);
     
    

     //var formData: FormData = new FormData();

    

     //temp_form.append('documents',formData);
     




   

    //upl_fom.append('file3',uploadDoucments_Obj)

  this.multifilesService.saveFiles(temp_frm).subscribe(data =>{
    console.log("result is ", data)
  })
   // this.admissionService.createNewAdmission(this.student_photo,this.documentFile).subscribe(data => {
     // console.log("the result from backend is "+ data);
   // })
  }



}
