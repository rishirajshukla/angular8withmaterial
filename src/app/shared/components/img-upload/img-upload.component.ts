import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "img-upload",
  templateUrl: "./img-upload.component.html",
  styleUrls: ["./img-upload.component.css"]
})
export class ImageUploadComponent implements OnInit {
  @Output() image: any = new EventEmitter();
  @Output() base64: any = new EventEmitter();
  @Input() clearImg: number;
  @Input() allowedFileType: string;
  @Input() imgUploadText: string = "Click to Upload Image";
  error: string;
  buffer: string | ArrayBuffer;
  size: string;
  showImg = false;
  fileTypesObj = {
    image: ["image/jpeg", "image/png"],
    pdf: ["application/pdf"]
  };
  constructor() {}

  ngOnInit(): void {
    this.allowedFileType = this.allowedFileType
      ? this.allowedFileType
      : "image";
  }

  addImg(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const files: FileList = event.target.files;
      const file: File = files[0];
      const name = file.name;
      const size = file.size;
      this.size = (size / 1024).toFixed(2);
      const isFileTypeOk = this.fileTypesObj[this.allowedFileType].some(
        x => x === file.type
      );
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (size > 3 * 1024 * 1024) {
          this.error = "File size greater than 3MB";
          setTimeout(_ => {
            this.error = null;
          }, 3600);
          return;
        }
        if (!isFileTypeOk) {
          this.error =
            "Wrong File Type! " + `Please upload an ${this.allowedFileType}`;
          setTimeout(_ => {
            this.error = null;
          }, 3600);
          return;
        }
        this.buffer = reader.result;
        this.base64.emit(this.buffer);
        this.image.emit({
          name,
          file
        });
        this.showImg = true;
      };
    }
  }

  removeImg() {
    this.buffer = null;
    this.size = null;
    this.showImg = false;
    this.image.emit(null);
    this.base64.emit(null);
  }

  ngOnChanges() {
    this.removeImg();
  }
}
