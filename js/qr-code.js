// class Person {
//     constructor(firstName, lastName, dob) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.dob = new Date(dob);
//     }
//     getBirthYear() {
//         return this.dob.getFullYear();
//     }
// }

// const person = new Person("John", "Doe", "8-9-1982");

// console.log(person.getBirthYear());

const form = document.querySelector("#generate-form");
const qr = document.querySelector("#qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  const url = document.querySelector("#url").value;
  const size = document.querySelector("#size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.querySelector("#save-link");
  if (saveLink) saveLink.remove();
};

const showSpinner = () => {
  document.querySelector("#spinner").style.display = "block";
};

const hideSpinner = () => {
  document.querySelector("#spinner").style.display = "none";
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.querySelector("#generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);


