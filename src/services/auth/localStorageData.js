// import history from '../../history';
export function localStorageData(value) {
  let fialValue = null;

  let localData = JSON.parse(localStorage.getItem('localdealtoken'));

  if (localData && localData.hasOwnProperty('token')) {
    Object.keys(localData).forEach(function (key) {
      if (key == value) {
        fialValue = localData[key];
      }
    });
  }

  return fialValue;
}

export function getLocalUserdata(value) {
  let fialValue = null;

  let localData = JSON.parse(localStorage.getItem('localdealtoken'));

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
  let fialValue = null;

  let localData = JSON.parse(localStorage.getItem('localdealtoken'));

  localData.fname = value.fname;

  localData.lname = value.lname;

  localData.address = value.address;

  localData.contactNo = value.contactNo;

  localStorage.setItem('localdealtoken', JSON.stringify(localData));

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
  let localData = JSON.parse(localStorage.getItem('localdealtoken'));

  localData.pic = value;

  console.log(localData);

  localStorage.setItem('localdealtoken', JSON.stringify(localData));
}

export function updateLocalstorageToken(value) {
  let localData = JSON.parse(localStorage.getItem('localdealtoken'));

  localData.token = value;

  console.log(localData);

  localStorage.setItem('localdealtoken', JSON.stringify(localData));
}

export function Logout(value) {
  localStorage.removeItem('localdealtoken');

  // history.push(value);

  return true;
}
