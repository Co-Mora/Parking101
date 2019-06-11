const processImg1 = () => {
    let formData = new FormData();
    formData.append("imgUploader", this.file);
    ProcessFile.process("images/upload", formData).then(response => {
      this.image = response.data['path'];
      console.log("SUCCESS!!", this.image);
    }).catch(function(ex) {
        console.log(ex);
    });
  }


  const handleFileUpload = () => {
    this.file = this.$refs.file.files[0];
    console.log("File:", this.file);
    this.processImg1();
  }