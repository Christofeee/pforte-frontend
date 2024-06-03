let formDataStore = {};

export const setFormData = (formData) => {
    console.log("SETTING FORM DATA: ", formData)
  formDataStore = formData;
};

export const getFormData = () => {
    console.log("FORMDATA STORE: ",formDataStore)
  return formDataStore;
};
