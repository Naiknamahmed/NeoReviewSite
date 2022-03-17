import { token } from 'config/config';

export function localStorageData(value) {
  let fialValue = null;
  let localData = JSON.parse(localStorage.getItem(token));

  if (localData && localData.hasOwnProperty('id')) {
    Object.keys(localData).forEach(function (key) {
      if (key === value) {
        fialValue = localData[key];
      }
    });
  }

  return fialValue;
}

export function getLocalUserdata(value) {
  // let fialValue = null;
  let localData = JSON.parse(localStorage.getItem(token));

  // if (localData && localData.hasOwnProperty('token')) {
  //   Object.keys(localData).forEach(function (key) {
  //     if (key == value) {
  //       fialValue = localData[key];
  //     }
  //   });
  // }
  return localData;
}

export function saveLocalData(value) {
  localStorage.setItem('neoestudio', JSON.stringify(value));
}

export function updatelocalData(value) {
  // let fialValue = null;

  let localData = JSON.parse(localStorage.getItem(token));

  localData.fname = value.fname;

  localData.lname = value.lname;

  localData.address = value.address;

  localData.contactNo = value.contactNo;

  localStorage.setItem(token, JSON.stringify(localData));

  // if (localData && localData.hasOwnProperty('token')) {
  //   Object.keys(localData).forEach(function (key) {
  //     if (key == value) {
  //       fialValue = localData[key];
  //     }
  //   });
  // }

  return localData;
}

export function updateLocalstoragepic(value) {
  let localData = JSON.parse(localStorage.getItem(token));

  localData.pic = value;


  localStorage.setItem(token, JSON.stringify(localData));
}

export function updateLocalstorageToken(value) {
  let localData = JSON.parse(localStorage.getItem(token));

  localData.token = value;

  console.log(localData);

  localStorage.setItem(token, JSON.stringify(localData));
}

export function Logout(value) {
  localStorage.removeItem(token);
  // history.push(value);
  return true;
}
